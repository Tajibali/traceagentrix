import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Device from "@/models/Device";
import { getAuthUser } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid device ID" }, { status: 400 });
    }

    const body = await req.json();
    const allowedFields = [
      "name",
      "hostname",
      "os",
      "status",
      "lastSeen",
      "ipAddress",
      "agentCount",
      "riskScore",
    ];
    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) updates[key] = body[key];
    }

    await connectDB();
    const device = await Device.findOneAndUpdate(
      { _id: id, userId: authUser.userId },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!device) return NextResponse.json({ error: "Device not found" }, { status: 404 });
    return NextResponse.json({ device }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/devices/[id] error:", error);
    return NextResponse.json({ error: "Failed to update device" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid device ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Device.findOneAndDelete({ _id: id, userId: authUser.userId }).lean();
    if (!deleted) return NextResponse.json({ error: "Device not found" }, { status: 404 });

    return NextResponse.json({ message: "Device deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/devices/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete device" }, { status: 500 });
  }
}
