import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Mcp from "@/models/Mcp";
import "@/models/Agent";
import "@/models/Device";
import { getAuthUser } from "@/lib/auth";
import { seedUserDataIfEmpty } from "@/lib/seed";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    await seedUserDataIfEmpty(authUser.userId);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const riskLevel = searchParams.get("riskLevel");
    const source = searchParams.get("source");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = { userId: authUser.userId };
    if (status) query.status = status;
    if (riskLevel) query.riskLevel = riskLevel;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const mcps = await Mcp.find(query)
      .populate("agentId", "name type")
      .populate("deviceId", "name hostname")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ mcps }, { status: 200 });
  } catch (error) {
    console.error("GET /api/mcps error:", error);
    return NextResponse.json({ error: "Failed to fetch MCPs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      name,
      description,
      status,
      riskLevel,
      riskScore,
      permissions,
      source,
      agentId,
      deviceId,
    } = body;

    if (!name) {
      return NextResponse.json({ error: "MCP name is required" }, { status: 400 });
    }

    if (agentId && !mongoose.Types.ObjectId.isValid(agentId)) {
      return NextResponse.json({ error: "Invalid agentId" }, { status: 400 });
    }
    if (deviceId && !mongoose.Types.ObjectId.isValid(deviceId)) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    await connectDB();

    const score = Number(riskScore ?? 0);
    const computedRiskLevel =
      riskLevel || (score >= 70 ? "high" : score >= 40 ? "medium" : "low");

    const mcp = await Mcp.create({
      name,
      description: description || null,
      status: status || "active",
      riskLevel: computedRiskLevel,
      riskScore: score,
      permissions: Array.isArray(permissions) ? permissions : [],
      source: source || "local",
      agentId: agentId || null,
      deviceId: deviceId || null,
      userId: authUser.userId,
    });

    return NextResponse.json({ mcp }, { status: 201 });
  } catch (error) {
    console.error("POST /api/mcps error:", error);
    return NextResponse.json({ error: "Failed to create MCP" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (body.action === "quarantine-high-risk") {
      await connectDB();
      const result = await Mcp.updateMany(
        { userId: authUser.userId, riskLevel: "high", status: "active" },
        { $set: { status: "quarantined" } }
      );
      return NextResponse.json({ modifiedCount: result.modifiedCount }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid bulk action" }, { status: 400 });
  } catch (error) {
    console.error("PATCH /api/mcps error:", error);
    return NextResponse.json({ error: "Failed to update MCPs" }, { status: 500 });
  }
}
