"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Server,
  Plug,
  AlertTriangle,
  TrendingUp,
  Shield,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type OverviewData = {
  stats: {
    agentsCount: number;
    devicesCount: number;
    onlineDevices: number;
    mcpsCount: number;
    quarantinedMcps: number;
    openAlerts: number;
    highSeverityAlerts: number;
    riskBreakdown: { low: number; medium: number; high: number };
  };
  recentAlerts: Array<{
    _id: string;
    title: string;
    source: string;
    severity: string;
    createdAt: string;
  }>;
  topAgents: Array<{
    _id: string;
    name: string;
    type: string;
    riskLevel: string;
    tokenUsage: number;
  }>;
};

function formatTokens(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function DashboardPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/overview")
      .then((res) => res.json())
      .then((json) => {
        if (json.stats) setData(json);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const s = data?.stats;

  const statsCards = [
    {
      label: "AI Agents",
      value: loading ? "..." : String(s?.agentsCount ?? 0),
      change: "Active inventory",
      icon: Bot,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Devices",
      value: loading ? "..." : String(s?.devicesCount ?? 0),
      change: `${s?.onlineDevices ?? 0} online`,
      icon: Server,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
    },
    {
      label: "MCPs",
      value: loading ? "..." : String(s?.mcpsCount ?? 0),
      change: `${s?.quarantinedMcps ?? 0} quarantined`,
      icon: Plug,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Open Alerts",
      value: loading ? "..." : String(s?.openAlerts ?? 0),
      change: `${s?.highSeverityAlerts ?? 0} high severity`,
      icon: AlertTriangle,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-slate-400">
          AI security posture across your organization
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.change}</p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                Recent Alerts
              </CardTitle>
              <Badge variant="outline">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-sm text-slate-400">Loading alerts...</p>
            ) : (data?.recentAlerts || []).length === 0 ? (
              <p className="text-sm text-slate-400">No alerts recorded.</p>
            ) : (
              data?.recentAlerts.map((a) => (
                <div
                  key={a._id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-elevated/50 px-4 py-3 transition-colors hover:bg-hover"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        a.severity === "critical" || a.severity === "high"
                          ? "bg-red-400"
                          : a.severity === "medium"
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-slate-500">{a.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        a.severity === "critical" || a.severity === "high"
                          ? "danger"
                          : a.severity === "medium"
                          ? "warning"
                          : "success"
                      }
                    >
                      {a.severity}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {timeAgo(a.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              Top Agents by Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-sm text-slate-400">Loading agents...</p>
            ) : (data?.topAgents || []).length === 0 ? (
              <p className="text-sm text-slate-400">No agents found.</p>
            ) : (
              data?.topAgents.map((agent, i) => (
                <div
                  key={agent._id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-elevated/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-cyan-500/10 text-xs font-medium text-cyan-400">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{agent.name}</p>
                      <p className="text-xs uppercase text-slate-500">
                        {agent.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-slate-300">
                      {formatTokens(agent.tokenUsage || 0)}
                    </p>
                    <Badge
                      variant={
                        agent.riskLevel === "high"
                          ? "danger"
                          : agent.riskLevel === "medium"
                          ? "warning"
                          : "success"
                      }
                      className="mt-0.5"
                    >
                      {agent.riskLevel}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-400" />
            Security Posture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="text-sm text-slate-400">Low Risk Agents</p>
              <p className="mt-1 text-2xl font-bold text-emerald-400">
                {s?.riskBreakdown.low ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm text-slate-400">Medium Risk</p>
              <p className="mt-1 text-2xl font-bold text-amber-400">
                {s?.riskBreakdown.medium ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm text-slate-400">High Risk</p>
              <p className="mt-1 text-2xl font-bold text-red-400">
                {s?.riskBreakdown.high ?? 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
