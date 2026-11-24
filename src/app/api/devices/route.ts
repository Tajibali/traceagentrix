import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Device from "@/models/Device";
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
    const os = searchParams.get("os");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = { userId: authUser.userId };
    if (status) query.status = status;
    if (os) query.os = os;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { hostname: { $regex: search, $options: "i" } },
      ];
    }

    const devices = await Device.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ devices }, { status: 200 });
  } catch (error) {
    console.error("GET /api/devices error:", error);
    return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, hostname, os, status, ipAddress, agentCount, riskScore } = body;

    if (!name || !os) {
      return NextResponse.json({ error: "Device name and OS are required" }, { status: 400 });
    }

    await connectDB();

    const device = await Device.create({
      name,
      hostname: hostname || null,
      os,
      status: status || "online",
      ipAddress: ipAddress || null,
      agentCount: Number(agentCount ?? 0),
      riskScore: Number(riskScore ?? 0),
      lastSeen: new Date(),
      userId: authUser.userId,
    });

    return NextResponse.json({ device }, { status: 201 });
  } catch (error) {
    console.error("POST /api/devices error:", error);
    return NextResponse.json({ error: "Failed to create device" }, { status: 500 });
  }
}
