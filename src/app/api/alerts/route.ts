import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alert from "@/models/Alert";
import { getAuthUser } from "@/lib/auth";
import { seedUserDataIfEmpty } from "@/lib/seed";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    await seedUserDataIfEmpty(authUser.userId);

    const { searchParams } = new URL(req.url);
    const severity = searchParams.get("severity");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = { userId: authUser.userId };
    if (severity) query.severity = severity;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { source: { $regex: search, $options: "i" } },
      ];
    }

    const alerts = await Alert.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ alerts }, { status: 200 });
  } catch (error) {
    console.error("GET /api/alerts error:", error);
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, severity, status, source } = body;

    if (!title || !severity) {
      return NextResponse.json(
        { error: "Title and severity are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const alert = await Alert.create({
      title,
      description: description || null,
      severity,
      status: status || "open",
      source: source || "System",
      userId: authUser.userId,
    });

    return NextResponse.json({ alert }, { status: 201 });
  } catch (error) {
    console.error("POST /api/alerts error:", error);
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (body.action === "acknowledge-all") {
      await connectDB();
      const result = await Alert.updateMany(
        { userId: authUser.userId, status: "open" },
        { $set: { status: "acknowledged" } }
      );
      return NextResponse.json({ modifiedCount: result.modifiedCount }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid bulk action" }, { status: 400 });
  } catch (error) {
    console.error("PATCH /api/alerts error:", error);
    return NextResponse.json({ error: "Failed to update alerts" }, { status: 500 });
  }
}
