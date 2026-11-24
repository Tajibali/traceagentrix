import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";
import "@/models/Device";
import { getAuthUser } from "@/lib/auth";
import { seedUserDataIfEmpty } from "@/lib/seed";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await seedUserDataIfEmpty(authUser.userId);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const riskLevel = searchParams.get("riskLevel");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = { userId: authUser.userId };
    if (status) query.status = status;
    if (riskLevel) query.riskLevel = riskLevel;
    if (type) query.type = type;
    if (search) query.name = { $regex: search, $options: "i" };

    const agents = await Agent.find(query)
      .populate("deviceId", "name hostname os")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ agents }, { status: 200 });
  } catch (error) {
    console.error("GET /api/agents error:", error);
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, type, version, status, riskLevel, riskScore, tokenUsage, deviceId } = body;

    if (!name || !type) {
      return NextResponse.json({ error: "Name and type are required" }, { status: 400 });
    }

    if (deviceId && !mongoose.Types.ObjectId.isValid(deviceId)) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    await connectDB();

    const score = Number(riskScore ?? 0);
    const computedRiskLevel =
      riskLevel || (score >= 70 ? "high" : score >= 40 ? "medium" : "low");

    const agent = await Agent.create({
      name,
      type,
      version: version || "1.0.0",
      status: status || "active",
      riskLevel: computedRiskLevel,
      riskScore: score,
      tokenUsage: Number(tokenUsage ?? 0),
      deviceId: deviceId || null,
      userId: authUser.userId,
    });

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error("POST /api/agents error:", error);
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
  }
}
