"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Search,
  Monitor,
  Globe,
  Terminal,
  Code2,
  Plus,
  Trash2,
  Ban,
  CheckCircle,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type AgentItem = {
  _id: string;
  name: string;
  type: string;
  version?: string;
  status: string;
  riskLevel: string;
  riskScore: number;
  tokenUsage: number;
  lastActive: string;
  deviceId?: { name?: string; hostname?: string } | null;
};

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

function timeAgo(dateStr: string) {
  if (!dateStr) return "Just now";
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
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
  const [agents, setAgents] = useState<AgentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "ide",
    version: "1.0.0",
    riskScore: 20,
    tokenUsage: 50000,
  });

  async function loadAgents() {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      if (data.agents) setAgents(data.agents);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAgents();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowModal(false);
        setForm({ name: "", type: "ide", version: "1.0.0", riskScore: 20, tokenUsage: 50000 });
        await loadAgents();
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleStatus(agent: AgentItem) {
    const nextStatus = agent.status === "blocked" ? "active" : "blocked";
    const res = await fetch(`/api/agents/${agent._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (res.ok) {
      setAgents((prev) =>
        prev.map((a) => (a._id === agent._id ? { ...a, status: nextStatus } : a))
      );
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/agents/${id}`, { method: "DELETE" });
    if (res.ok) {
      setAgents((prev) => prev.filter((a) => a._id !== id));
    }
  }

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
        <Button size="sm" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Register Agent
        </Button>
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
                  <th className="px-5 py-3 font-medium">Device</th>
                  <th className="px-5 py-3 font-medium">Last Active</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-slate-400">
                      Loading agents...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-slate-400">
                      No agents found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((agent, i) => {
                    const Icon = typeIcons[agent.type] || Bot;
                    return (
                      <motion.tr
                        key={agent._id}
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
                                v{agent.version || "1.0"}
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
                          {formatTokens(agent.tokenUsage || 0)}
                        </td>
                        <td className="px-5 py-3.5 text-slate-300">
                          {agent.deviceId?.name || "Unassigned"}
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">
                          {timeAgo(agent.lastActive)}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => toggleStatus(agent)}
                              title={agent.status === "blocked" ? "Activate" : "Block"}
                              className="rounded p-1.5 text-slate-400 hover:bg-hover hover:text-amber-400"
                            >
                              {agent.status === "blocked" ? (
                                <CheckCircle className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <Ban className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(agent._id)}
                              title="Delete"
                              className="rounded p-1.5 text-slate-400 hover:bg-hover hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0F1623] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Register AI Agent</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-slate-400">Agent Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Claude Code, Cursor"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  >
                    <option value="ide">IDE</option>
                    <option value="cli">CLI</option>
                    <option value="desktop">Desktop</option>
                    <option value="browser">Browser</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Version</label>
                  <input
                    value={form.version}
                    onChange={(e) => setForm({ ...form, version: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Risk Score (0-100)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.riskScore}
                    onChange={(e) => setForm({ ...form, riskScore: Number(e.target.value) })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Token Usage</label>
                  <input
                    type="number"
                    min={0}
                    value={form.tokenUsage}
                    onChange={(e) => setForm({ ...form, tokenUsage: Number(e.target.value) })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Agent"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
