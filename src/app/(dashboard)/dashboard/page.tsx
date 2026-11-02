"use client";

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

const stats = [
  {
    label: "AI Agents",
    value: "38",
    change: "+4 this week",
    icon: Bot,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Devices",
    value: "124",
    change: "118 online",
    icon: Server,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    label: "MCPs",
    value: "67",
    change: "3 quarantined",
    icon: Plug,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Open Alerts",
    value: "12",
    change: "4 high severity",
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

const recentAlerts = [
  {
    title: "High-risk MCP detected",
    source: "supabase-mcp",
    severity: "high",
    time: "2m ago",
  },
  {
    title: "Claude attempted DROP TABLE",
    source: "Claude Code",
    severity: "critical",
    time: "15m ago",
  },
  {
    title: "Personal ChatGPT account used",
    source: "ChatGPT Desktop",
    severity: "medium",
    time: "1h ago",
  },
  {
    title: "Token usage spike detected",
    source: "Cursor",
    severity: "low",
    time: "3h ago",
  },
];

const topAgents = [
  { name: "Claude Code", type: "CLI", risk: "medium", tokens: "2.4M" },
  { name: "Cursor", type: "IDE", risk: "low", tokens: "1.8M" },
  { name: "ChatGPT", type: "Desktop", risk: "low", tokens: "980K" },
  { name: "GitHub Copilot", type: "IDE", risk: "low", tokens: "720K" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-slate-400">
          AI security posture across your organization
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{s.change}</p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}
                >
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Alerts */}
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
            {recentAlerts.map((a) => (
              <div
                key={a.title}
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
                  <span className="text-xs text-slate-500">{a.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Agents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              Top Agents by Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topAgents.map((agent, i) => (
              <div
                key={agent.name}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-elevated/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-cyan-500/10 text-xs font-medium text-cyan-400">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-slate-500">{agent.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-slate-300">
                    {agent.tokens}
                  </p>
                  <Badge
                    variant={
                      agent.risk === "high"
                        ? "danger"
                        : agent.risk === "medium"
                        ? "warning"
                        : "success"
                    }
                    className="mt-0.5"
                  >
                    {agent.risk}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
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
              <p className="mt-1 text-2xl font-bold text-emerald-400">29</p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm text-slate-400">Medium Risk</p>
              <p className="mt-1 text-2xl font-bold text-amber-400">6</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm text-slate-400">High Risk</p>
              <p className="mt-1 text-2xl font-bold text-red-400">3</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
