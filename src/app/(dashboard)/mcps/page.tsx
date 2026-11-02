"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plug, Search, MoreHorizontal, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const mcps = [
  {
    id: "1",
    name: "supabase-mcp",
    description: "Database read/write access",
    status: "active",
    riskLevel: "high",
    riskScore: 82,
    permissions: ["read", "write", "delete"],
    source: "remote",
    agent: "Claude Code",
  },
  {
    id: "2",
    name: "filesystem",
    description: "Local file system access",
    status: "active",
    riskLevel: "medium",
    riskScore: 55,
    permissions: ["read", "write"],
    source: "local",
    agent: "Cursor",
  },
  {
    id: "3",
    name: "github",
    description: "GitHub repository access",
    status: "active",
    riskLevel: "medium",
    riskScore: 48,
    permissions: ["read", "write"],
    source: "remote",
    agent: "Claude Code",
  },
  {
    id: "4",
    name: "browser",
    description: "Browser automation",
    status: "quarantined",
    riskLevel: "high",
    riskScore: 91,
    permissions: ["read", "write", "execute"],
    source: "remote",
    agent: "Claude",
  },
  {
    id: "5",
    name: "slack",
    description: "Slack messaging",
    status: "active",
    riskLevel: "low",
    riskScore: 18,
    permissions: ["read", "write"],
    source: "remote",
    agent: "ChatGPT",
  },
  {
    id: "6",
    name: "postgres",
    description: "PostgreSQL direct connection",
    status: "active",
    riskLevel: "high",
    riskScore: 75,
    permissions: ["read", "write", "delete"],
    source: "local",
    agent: "Claude Code",
  },
  {
    id: "7",
    name: "memory",
    description: "Persistent memory store",
    status: "active",
    riskLevel: "low",
    riskScore: 12,
    permissions: ["read", "write"],
    source: "local",
    agent: "Cursor",
  },
  {
    id: "8",
    name: "puppeteer",
    description: "Headless browser control",
    status: "blocked",
    riskLevel: "high",
    riskScore: 88,
    permissions: ["read", "write", "execute"],
    source: "remote",
    agent: "Windsurf",
  },
];

export default function McpsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mcps.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      m.riskLevel === filter ||
      m.status === filter ||
      m.source === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: mcps.length,
    quarantined: mcps.filter((m) => m.status === "quarantined").length,
    blocked: mcps.filter((m) => m.status === "blocked").length,
    high: mcps.filter((m) => m.riskLevel === "high").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">MCPs</h1>
          <p className="mt-1 text-sm text-slate-400">
            Model Context Protocol connectors — inventory & risk
          </p>
        </div>
        <Button size="sm" variant="outline">
          Quarantine High Risk
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total MCPs", value: stats.total, color: "text-cyan-400" },
          { label: "High Risk", value: stats.high, color: "text-red-400" },
          { label: "Quarantined", value: stats.quarantined, color: "text-amber-400" },
          { label: "Blocked", value: stats.blocked, color: "text-slate-400" },
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
            placeholder="Search MCPs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-white/10 bg-elevated pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "high", "medium", "low", "active", "quarantined", "blocked"].map(
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
                  <th className="px-5 py-3 font-medium">MCP</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium">Permissions</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-5 py-3 font-medium">Used by</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((mcp, i) => (
                  <motion.tr
                    key={mcp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 transition-colors hover:bg-hover/50"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg",
                            mcp.riskLevel === "high"
                              ? "bg-red-500/10"
                              : "bg-cyan-500/10"
                          )}
                        >
                          {mcp.riskLevel === "high" ? (
                            <ShieldAlert className="h-4 w-4 text-red-400" />
                          ) : (
                            <Plug className="h-4 w-4 text-cyan-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium font-mono text-sm">
                            {mcp.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {mcp.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant={
                          mcp.status === "active"
                            ? "success"
                            : mcp.status === "quarantined"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {mcp.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant={
                          mcp.riskLevel === "high"
                            ? "danger"
                            : mcp.riskLevel === "medium"
                            ? "warning"
                            : "success"
                        }
                      >
                        {mcp.riskLevel} · {mcp.riskScore}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {mcp.permissions.map((p) => (
                          <span
                            key={p}
                            className="rounded bg-elevated px-1.5 py-0.5 text-[10px] font-medium text-slate-400"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="capitalize">
                        {mcp.source}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">{mcp.agent}</td>
                    <td className="px-5 py-3.5">
                      <button className="rounded p-1 text-slate-500 hover:bg-hover hover:text-slate-300">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
