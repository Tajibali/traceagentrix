import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Alert from "@/models/Alert";
import { getAuthUser } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid alert ID" }, { status: 400 });
    }

    const body = await req.json();
    const allowedFields = ["title", "description", "severity", "status", "source"];
    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) updates[key] = body[key];
    }

    await connectDB();
    const alert = await Alert.findOneAndUpdate(
      { _id: id, userId: authUser.userId },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!alert) return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    return NextResponse.json({ alert }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/alerts/[id] error:", error);
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid alert ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Alert.findOneAndDelete({ _id: id, userId: authUser.userId }).lean();
    if (!deleted) return NextResponse.json({ error: "Alert not found" }, { status: 404 });

    return NextResponse.json({ message: "Alert deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/alerts/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete alert" }, { status: 500 });
  }
}
