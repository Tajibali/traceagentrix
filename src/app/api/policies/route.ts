import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Policy from "@/models/Policy";
import { getAuthUser } from "@/lib/auth";
import { seedUserDataIfEmpty } from "@/lib/seed";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    await seedUserDataIfEmpty(authUser.userId);

    const { searchParams } = new URL(req.url);
    const target = searchParams.get("target");
    const action = searchParams.get("action");

    const query: Record<string, unknown> = { userId: authUser.userId };
    if (target) query.target = target;
    if (action) query.action = action;

    const policies = await Policy.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ policies }, { status: 200 });
  } catch (error) {
    console.error("GET /api/policies error:", error);
    return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, description, action, target, condition, enabled } = body;

    if (!name || !action || !target) {
      return NextResponse.json(
        { error: "Name, action, and target are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const policy = await Policy.create({
      name,
      description: description || null,
      action,
      target,
      condition: condition || null,
      enabled: enabled !== undefined ? Boolean(enabled) : true,
      userId: authUser.userId,
    });

    return NextResponse.json({ policy }, { status: 201 });
  } catch (error) {
    console.error("POST /api/policies error:", error);
    return NextResponse.json({ error: "Failed to create policy" }, { status: 500 });
  }
}
