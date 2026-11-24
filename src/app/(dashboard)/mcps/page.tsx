"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plug, Search, ShieldAlert, Plus, Trash2, ShieldBan, CheckCircle, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type McpItem = {
  _id: string;
  name: string;
  description?: string;
  status: string;
  riskLevel: string;
  riskScore: number;
  permissions: string[];
  source: string;
  agentId?: { name?: string } | null;
};

export default function McpsPage() {
  const [mcps, setMcps] = useState<McpItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    source: "remote",
    riskScore: 45,
    permissions: "read, write",
  });

  async function loadMcps() {
    try {
      const res = await fetch("/api/mcps");
      const data = await res.json();
      if (data.mcps) setMcps(data.mcps);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMcps();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/mcps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        permissions: form.permissions
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
      }),
    });
    if (res.ok) {
      setShowModal(false);
      setForm({ name: "", description: "", source: "remote", riskScore: 45, permissions: "read, write" });
      await loadMcps();
    }
  }

  async function quarantineHighRisk() {
    const res = await fetch("/api/mcps", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "quarantine-high-risk" }),
    });
    if (res.ok) await loadMcps();
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/mcps/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setMcps((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/mcps/${id}`, { method: "DELETE" });
    if (res.ok) setMcps((prev) => prev.filter((m) => m._id !== id));
  }

  const filtered = mcps.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.description || "").toLowerCase().includes(search.toLowerCase());
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
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={quarantineHighRisk}>
            Quarantine High Risk
          </Button>
          <Button size="sm" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4" />
            Add MCP
          </Button>
        </div>
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
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                      Loading MCPs...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                      No MCPs found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((mcp, i) => (
                    <motion.tr
                      key={mcp._id}
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
                            <p className="font-mono text-sm font-medium">{mcp.name}</p>
                            <p className="text-xs text-slate-500">{mcp.description}</p>
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
                          {(mcp.permissions || []).map((p) => (
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
                          {mcp.source || "local"}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-slate-300">
                        {mcp.agentId?.name || "Global"}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          {mcp.status !== "active" ? (
                            <button
                              onClick={() => updateStatus(mcp._id, "active")}
                              title="Activate"
                              className="rounded p-1.5 text-emerald-400 hover:bg-hover"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => updateStatus(mcp._id, "quarantined")}
                              title="Quarantine"
                              className="rounded p-1.5 text-slate-400 hover:bg-hover hover:text-amber-400"
                            >
                              <ShieldBan className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(mcp._id)}
                            title="Delete"
                            className="rounded p-1.5 text-slate-400 hover:bg-hover hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
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
              <h2 className="text-lg font-semibold">Add MCP Server</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-slate-400">MCP Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. postgres-mcp"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Description</label>
                <input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Database access server"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Source</label>
                  <select
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  >
                    <option value="local">Local</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
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
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Permissions (comma-separated)</label>
                <input
                  value={form.permissions}
                  onChange={(e) => setForm({ ...form, permissions: e.target.value })}
                  placeholder="read, write, execute"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save MCP</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
