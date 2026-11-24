import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";
import Mcp from "@/models/Mcp";
import Device from "@/models/Device";
import Alert from "@/models/Alert";
import Policy from "@/models/Policy";
import { getAuthUser } from "@/lib/auth";
import { seedUserDataIfEmpty } from "@/lib/seed";

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    await seedUserDataIfEmpty(authUser.userId);

    const userId = authUser.userId;

    const [agents, mcps, devices, alerts, policies] = await Promise.all([
      Agent.find({ userId }).sort({ tokenUsage: -1 }).lean(),
      Mcp.find({ userId }).lean(),
      Device.find({ userId }).lean(),
      Alert.find({ userId }).sort({ createdAt: -1 }).lean(),
      Policy.find({ userId }).lean(),
    ]);

    const totalTokens = agents.reduce((acc, a) => acc + (a.tokenUsage || 0), 0);

    return NextResponse.json(
      {
        stats: {
          agentsCount: agents.length,
          devicesCount: devices.length,
          onlineDevices: devices.filter((d) => d.status === "online").length,
          mcpsCount: mcps.length,
          quarantinedMcps: mcps.filter((m) => m.status === "quarantined").length,
          openAlerts: alerts.filter((a) => a.status === "open").length,
          highSeverityAlerts: alerts.filter(
            (a) =>
              a.status === "open" &&
              (a.severity === "high" || a.severity === "critical")
          ).length,
          policiesCount: policies.length,
          enabledPolicies: policies.filter((p) => p.enabled).length,
          totalTokens,
          riskBreakdown: {
            low: agents.filter((a) => a.riskLevel === "low").length,
            medium: agents.filter((a) => a.riskLevel === "medium").length,
            high: agents.filter((a) => a.riskLevel === "high").length,
          },
        },
        recentAlerts: alerts.slice(0, 5),
        topAgents: agents.slice(0, 5),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/overview error:", error);
    return NextResponse.json({ error: "Failed to load overview" }, { status: 500 });
  }
}
