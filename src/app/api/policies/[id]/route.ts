import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Policy from "@/models/Policy";
import { getAuthUser } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid policy ID" }, { status: 400 });
    }

    const body = await req.json();
    const allowedFields = ["name", "description", "action", "target", "condition", "enabled"];
    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) updates[key] = body[key];
    }

    await connectDB();
    const policy = await Policy.findOneAndUpdate(
      { _id: id, userId: authUser.userId },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!policy) return NextResponse.json({ error: "Policy not found" }, { status: 404 });
    return NextResponse.json({ policy }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/policies/[id] error:", error);
    return NextResponse.json({ error: "Failed to update policy" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid policy ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Policy.findOneAndDelete({ _id: id, userId: authUser.userId }).lean();
    if (!deleted) return NextResponse.json({ error: "Policy not found" }, { status: 404 });

    return NextResponse.json({ message: "Policy deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/policies/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete policy" }, { status: 500 });
  }
}
