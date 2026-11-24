import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Mcp from "@/models/Mcp";
import { getAuthUser } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid MCP ID" }, { status: 400 });
    }

    const body = await req.json();
    const allowedFields = [
      "name",
      "description",
      "status",
      "riskLevel",
      "riskScore",
      "permissions",
      "source",
      "agentId",
      "deviceId",
    ];
    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) updates[key] = body[key];
    }

    await connectDB();
    const mcp = await Mcp.findOneAndUpdate(
      { _id: id, userId: authUser.userId },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!mcp) return NextResponse.json({ error: "MCP not found" }, { status: 404 });
    return NextResponse.json({ mcp }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/mcps/[id] error:", error);
    return NextResponse.json({ error: "Failed to update MCP" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid MCP ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Mcp.findOneAndDelete({ _id: id, userId: authUser.userId }).lean();
    if (!deleted) return NextResponse.json({ error: "MCP not found" }, { status: 404 });

    return NextResponse.json({ message: "MCP deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/mcps/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete MCP" }, { status: 500 });
  }
}
