"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Plus, ToggleLeft, ToggleRight, Trash2, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type PolicyItem = {
  _id: string;
  name: string;
  description?: string;
  action: string;
  target: string;
  condition?: string;
  enabled: boolean;
};

export default function PoliciesPage() {
  const [list, setList] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    action: "block",
    target: "mcp",
    condition: "riskScore > 75",
  });

  async function loadPolicies() {
    try {
      const res = await fetch("/api/policies");
      const data = await res.json();
      if (data.policies) setList(data.policies);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPolicies();
  }, []);

  async function togglePolicy(policy: PolicyItem) {
    const nextEnabled = !policy.enabled;
    setList((prev) =>
      prev.map((p) => (p._id === policy._id ? { ...p, enabled: nextEnabled } : p))
    );
    await fetch(`/api/policies/${policy._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: nextEnabled }),
    });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowModal(false);
      setForm({ name: "", description: "", action: "block", target: "mcp", condition: "riskScore > 75" });
      await loadPolicies();
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/policies/${id}`, { method: "DELETE" });
    if (res.ok) setList((prev) => prev.filter((p) => p._id !== id));
  }

  const enabledCount = list.filter((p) => p.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Policies</h1>
          <p className="mt-1 text-sm text-slate-400">
            Control rules for AI agents, MCPs and actions
          </p>
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          New Policy
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-slate-400">Total Policies</p>
          <p className="mt-1 text-2xl font-bold text-cyan-400">{list.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Enabled</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">{enabledCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Disabled</p>
          <p className="mt-1 text-2xl font-bold text-slate-400">
            {list.length - enabledCount}
          </p>
        </Card>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading policies...</p>
      ) : (
        <div className="space-y-3">
          {list.map((policy, i) => (
            <motion.div
              key={policy._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className={cn(
                  "p-5 transition-all",
                  !policy.enabled && "opacity-60"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <Shield className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{policy.name}</p>
                      <Badge
                        variant={
                          policy.action === "block"
                            ? "danger"
                            : policy.action === "warn"
                            ? "warning"
                            : "success"
                        }
                      >
                        {policy.action}
                      </Badge>
                      <Badge variant="outline">{policy.target}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {policy.description}
                    </p>
                    <p className="mt-2 font-mono text-xs text-slate-500">
                      {policy.condition}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => togglePolicy(policy)}
                      className="text-slate-400 transition-colors hover:text-cyan-400"
                      title={policy.enabled ? "Disable" : "Enable"}
                    >
                      {policy.enabled ? (
                        <ToggleRight className="h-6 w-6 text-cyan-400" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(policy._id)}
                      className="rounded p-1.5 text-slate-400 hover:bg-hover hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0F1623] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Governance Policy</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-slate-400">Policy Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Block unverified MCPs"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Description</label>
                <input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Automatically quarantine unapproved servers"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Action</label>
                  <select
                    value={form.action}
                    onChange={(e) => setForm({ ...form, action: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  >
                    <option value="block">Block</option>
                    <option value="warn">Warn</option>
                    <option value="allow">Allow</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Target</label>
                  <select
                    value={form.target}
                    onChange={(e) => setForm({ ...form, target: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  >
                    <option value="agent">Agent</option>
                    <option value="mcp">MCP</option>
                    <option value="action">Action</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Rule Condition</label>
                <input
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  placeholder="riskScore > 70"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 font-mono text-sm text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Policy</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
