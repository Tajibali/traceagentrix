"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Search,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type AlertItem = {
  _id: string;
  title: string;
  description?: string;
  severity: string;
  status: string;
  source?: string;
  createdAt: string;
};

const severityConfig: Record<
  string,
  { variant: "danger" | "warning" | "success" | "info"; icon: any }
> = {
  critical: { variant: "danger", icon: XCircle },
  high: { variant: "danger", icon: AlertTriangle },
  medium: { variant: "warning", icon: Bell },
  low: { variant: "info", icon: Clock },
};

function timeAgo(dateStr: string) {
  if (!dateStr) return "Just now";
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  async function loadAlerts() {
    try {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      if (data.alerts) setAlerts(data.alerts);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  async function updateAlertStatus(id: string, status: string) {
    const res = await fetch(`/api/alerts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setAlerts((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    }
  }

  async function markAllRead() {
    const res = await fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "acknowledge-all" }),
    });
    if (res.ok) await loadAlerts();
  }

  const filtered = alerts.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.source || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" || a.severity === filter || a.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    open: alerts.filter((a) => a.status === "open").length,
    critical: alerts.filter((a) => a.severity === "critical").length,
    high: alerts.filter((a) => a.severity === "high").length,
    resolved: alerts.filter((a) => a.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          <p className="mt-1 text-sm text-slate-400">
            Live security incidents and policy violations
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={markAllRead}>
          Mark all read
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Open", value: stats.open, color: "text-amber-400" },
          { label: "Critical", value: stats.critical, color: "text-red-400" },
          { label: "High", value: stats.high, color: "text-red-400" },
          { label: "Resolved", value: stats.resolved, color: "text-emerald-400" },
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
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-white/10 bg-elevated pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "open", "critical", "high", "medium", "resolved"].map((f) => (
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
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading alerts...</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert, i) => {
            const config = severityConfig[alert.severity] || severityConfig.low;
            const Icon = config.icon;

            return (
              <motion.div
                key={alert._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card
                  hover
                  className={cn(
                    "p-4",
                    alert.status === "resolved" && "opacity-60"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        alert.severity === "critical" || alert.severity === "high"
                          ? "bg-red-500/10"
                          : alert.severity === "medium"
                          ? "bg-amber-500/10"
                          : "bg-cyan-500/10"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          alert.severity === "critical" || alert.severity === "high"
                            ? "text-red-400"
                            : alert.severity === "medium"
                            ? "text-amber-400"
                            : "text-cyan-400"
                        )}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{alert.title}</p>
                        <Badge variant={config.variant}>{alert.severity}</Badge>
                        <Badge
                          variant={
                            alert.status === "open"
                              ? "warning"
                              : alert.status === "resolved"
                              ? "success"
                              : "outline"
                          }
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">
                        {alert.description}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        <span>{alert.source || "System"}</span>
                        <span>·</span>
                        <span>{timeAgo(alert.createdAt)}</span>
                      </div>
                    </div>

                    {alert.status !== "resolved" && (
                      <div className="flex shrink-0 gap-2">
                        {alert.status === "open" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateAlertStatus(alert._id, "acknowledged")}
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateAlertStatus(alert._id, "resolved")}
                        >
                          Resolve
                        </Button>
                      </div>
                    )}
                    {alert.status === "resolved" && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
