import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";
import "@/models/Device";
import { getAuthUser } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 });
    }

    await connectDB();
    const agent = await Agent.findOne({ _id: id, userId: authUser.userId })
      .populate("deviceId")
      .lean();

    if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    return NextResponse.json({ agent }, { status: 200 });
  } catch (error) {
    console.error("GET /api/agents/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch agent" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 });
    }

    const body = await req.json();
    const allowedFields = [
      "name",
      "type",
      "version",
      "status",
      "riskLevel",
      "riskScore",
      "lastActive",
      "tokenUsage",
      "deviceId",
    ];
    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) updates[key] = body[key];
    }

    await connectDB();
    const agent = await Agent.findOneAndUpdate(
      { _id: id, userId: authUser.userId },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    return NextResponse.json({ agent }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/agents/[id] error:", error);
    return NextResponse.json({ error: "Failed to update agent" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Agent.findOneAndDelete({ _id: id, userId: authUser.userId }).lean();
    if (!deleted) return NextResponse.json({ error: "Agent not found" }, { status: 404 });

    return NextResponse.json({ message: "Agent deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/agents/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete agent" }, { status: 500 });
  }
}
