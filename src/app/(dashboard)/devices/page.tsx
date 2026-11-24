"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Server, Monitor, Laptop, Plus, Trash2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type DeviceItem = {
  _id: string;
  name: string;
  hostname?: string;
  os: string;
  status: string;
  agentCount: number;
  riskScore: number;
  lastSeen: string;
};

function riskBadge(score: number) {
  if (score >= 70) return <Badge variant="danger">High · {score}</Badge>;
  if (score >= 40) return <Badge variant="warning">Medium · {score}</Badge>;
  return <Badge variant="success">Low · {score}</Badge>;
}

function timeAgo(dateStr: string) {
  if (!dateStr) return "Just now";
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    hostname: "",
    os: "macOS",
    status: "online",
    agentCount: 4,
    riskScore: 15,
  });

  async function loadDevices() {
    try {
      const res = await fetch("/api/devices");
      const data = await res.json();
      if (data.devices) setDevices(data.devices);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevices();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowModal(false);
      setForm({ name: "", hostname: "", os: "macOS", status: "online", agentCount: 4, riskScore: 15 });
      await loadDevices();
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/devices/${id}`, { method: "DELETE" });
    if (res.ok) setDevices((prev) => prev.filter((d) => d._id !== id));
  }

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;
  const warningCount = devices.filter((d) => d.status === "warning").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Devices</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage and monitor your device fleet
          </p>
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Add Device
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Server className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Online</p>
              <p className="text-xl font-bold">{onlineCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/10">
              <Monitor className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Offline</p>
              <p className="text-xl font-bold">{offlineCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <Laptop className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Warning</p>
              <p className="text-xl font-bold">{warningCount}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Devices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left text-xs text-slate-500">
                  <th className="px-5 py-3 font-medium">Device</th>
                  <th className="px-5 py-3 font-medium">OS</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Agents</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium">Last Seen</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                      Loading devices...
                    </td>
                  </tr>
                ) : devices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                      No devices registered.
                    </td>
                  </tr>
                ) : (
                  devices.map((d, i) => (
                    <motion.tr
                      key={d._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-white/5 transition-colors hover:bg-hover/50"
                    >
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="font-medium">{d.name}</p>
                          <p className="text-xs text-slate-500">{d.hostname || "—"}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-300">{d.os}</td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            d.status === "online"
                              ? "success"
                              : d.status === "warning"
                              ? "warning"
                              : "outline"
                          }
                        >
                          {d.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-300">
                        {d.agentCount}
                      </td>
                      <td className="px-5 py-3.5">{riskBadge(d.riskScore)}</td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {timeAgo(d.lastSeen)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(d._id)}
                          className="rounded p-1.5 text-slate-400 hover:bg-hover hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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
              <h2 className="text-lg font-semibold">Add Device</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-slate-400">Device Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. MacBook Pro – Dev"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Hostname</label>
                <input
                  value={form.hostname}
                  onChange={(e) => setForm({ ...form, hostname: e.target.value })}
                  placeholder="dev-mbp.local"
                  className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">OS</label>
                  <select
                    value={form.os}
                    onChange={(e) => setForm({ ...form, os: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 text-sm text-white"
                  >
                    <option value="macOS">macOS</option>
                    <option value="Windows">Windows</option>
                    <option value="Linux">Linux</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Risk Score</label>
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
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Device</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
