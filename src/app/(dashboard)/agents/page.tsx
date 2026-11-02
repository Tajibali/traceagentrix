"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Search,
  MoreHorizontal,
  Monitor,
  Globe,
  Terminal,
  Code2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "1",
    name: "Claude Code",
    type: "cli",
    status: "active",
    riskLevel: "medium",
    riskScore: 58,
    tokens: 2400000,
    devices: 34,
    lastActive: "2m ago",
    version: "1.2.0",
  },
  {
    id: "2",
    name: "Cursor",
    type: "ide",
    status: "active",
    riskLevel: "low",
    riskScore: 22,
    tokens: 1800000,
    devices: 51,
    lastActive: "5m ago",
    version: "0.42.1",
  },
  {
    id: "3",
    name: "ChatGPT",
    type: "desktop",
    status: "active",
    riskLevel: "low",
    riskScore: 18,
    tokens: 980000,
    devices: 67,
    lastActive: "1m ago",
    version: "1.2024.11",
  },
  {
    id: "4",
    name: "GitHub Copilot",
    type: "ide",
    status: "active",
    riskLevel: "low",
    riskScore: 12,
    tokens: 720000,
    devices: 89,
    lastActive: "8m ago",
    version: "1.234.0",
  },
  {
    id: "5",
    name: "Claude",
    type: "browser",
    status: "warning",
    riskLevel: "high",
    riskScore: 81,
    tokens: 450000,
    devices: 23,
    lastActive: "12m ago",
    version: "web",
  },
  {
    id: "6",
    name: "Windsurf",
    type: "ide",
    status: "active",
    riskLevel: "medium",
    riskScore: 45,
    tokens: 310000,
    devices: 12,
    lastActive: "25m ago",
    version: "1.0.5",
  },
  {
    id: "7",
    name: "Microsoft Copilot",
    type: "desktop",
    status: "active",
    riskLevel: "low",
    riskScore: 9,
    tokens: 190000,
    devices: 41,
    lastActive: "3m ago",
    version: "1.0",
  },
  {
    id: "8",
    name: "Ollama",
    type: "cli",
    status: "active",
    riskLevel: "low",
    riskScore: 5,
    tokens: 0,
    devices: 8,
    lastActive: "1h ago",
    version: "0.3.12",
  },
];

const typeIcons: Record<string, any> = {
  cli: Terminal,
  ide: Code2,
  desktop: Monitor,
  browser: Globe,
};

function formatTokens(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function RiskBadge({ level, score }: { level: string; score: number }) {
  const variant =
    level === "high" ? "danger" : level === "medium" ? "warning" : "success";
  return (
    <Badge variant={variant}>
      {level} · {score}
    </Badge>
  );
}

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = agents.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      a.riskLevel === filter ||
      a.type === filter ||
      a.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: agents.length,
    high: agents.filter((a) => a.riskLevel === "high").length,
    medium: agents.filter((a) => a.riskLevel === "medium").length,
    low: agents.filter((a) => a.riskLevel === "low").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Agents</h1>
          <p className="mt-1 text-sm text-slate-400">
            Inventory, risk scores and usage of all AI agents
          </p>
        </div>
        <Button size="sm">Scan Devices</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Agents", value: stats.total, color: "text-cyan-400" },
          { label: "High Risk", value: stats.high, color: "text-red-400" },
          { label: "Medium Risk", value: stats.medium, color: "text-amber-400" },
          { label: "Low Risk", value: stats.low, color: "text-emerald-400" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-sm text-slate-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-white/10 bg-elevated pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "high", "medium", "low", "cli", "ide", "desktop", "browser"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "border-cyan-500/30 bg-cyan-500/15 text-cyan-400"
                    : "border-white/5 bg-elevated text-slate-400 hover:text-slate-200"
                )}
              >
                {f}
              </button>
            )
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left text-xs text-slate-500">
                  <th className="px-5 py-3 font-medium">Agent</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium">Tokens</th>
                  <th className="px-5 py-3 font-medium">Devices</th>
                  <th className="px-5 py-3 font-medium">Last Active</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((agent, i) => {
                  const Icon = typeIcons[agent.type] || Bot;
                  return (
                    <motion.tr
                      key={agent.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 transition-colors hover:bg-hover/50"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10">
                            <Icon className="h-4 w-4 text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-xs text-slate-500">
                              v{agent.version}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className="capitalize">
                          {agent.type}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            agent.status === "active"
                              ? "success"
                              : agent.status === "warning"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {agent.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <RiskBadge
                          level={agent.riskLevel}
                          score={agent.riskScore}
                        />
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-300">
                        {formatTokens(agent.tokens)}
                      </td>
                      <td className="px-5 py-3.5 text-slate-300">
                        {agent.devices}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {agent.lastActive}
                      </td>
                      <td className="px-5 py-3.5">
                        <button className="rounded p-1 text-slate-500 hover:bg-hover hover:text-slate-300">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
