"use client";

import { motion } from "framer-motion";
import { Server, Monitor, Laptop, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const devices = [
  {
    id: "1",
    name: "MacBook Pro – Sarah",
    hostname: "sarah-mbp.local",
    os: "macOS",
    status: "online",
    agents: 8,
    riskScore: 22,
    lastSeen: "Just now",
  },
  {
    id: "2",
    name: "Dev Workstation – Ali",
    hostname: "ali-win-01",
    os: "Windows",
    status: "online",
    agents: 12,
    riskScore: 67,
    lastSeen: "2m ago",
  },
  {
    id: "3",
    name: "MacBook Air – Engineering",
    hostname: "eng-mba-03",
    os: "macOS",
    status: "online",
    agents: 5,
    riskScore: 15,
    lastSeen: "5m ago",
  },
  {
    id: "4",
    name: "Laptop – Finance",
    hostname: "fin-lt-07",
    os: "Windows",
    status: "offline",
    agents: 3,
    riskScore: 41,
    lastSeen: "3h ago",
  },
  {
    id: "5",
    name: "Mac Mini – CI Runner",
    hostname: "ci-mac-01",
    os: "macOS",
    status: "warning",
    agents: 6,
    riskScore: 78,
    lastSeen: "12m ago",
  },
];

function riskBadge(score: number) {
  if (score >= 70) return <Badge variant="danger">High · {score}</Badge>;
  if (score >= 40) return <Badge variant="warning">Medium · {score}</Badge>;
  return <Badge variant="success">Low · {score}</Badge>;
}

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Devices</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage and monitor your device fleet
          </p>
        </div>
        <Button size="sm">Add Device</Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Server className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Online</p>
              <p className="text-xl font-bold">118</p>
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
              <p className="text-xl font-bold">6</p>
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
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
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
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {devices.map((d, i) => (
                  <motion.tr
                    key={d.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/5 transition-colors hover:bg-hover/50"
                  >
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium">{d.name}</p>
                        <p className="text-xs text-slate-500">{d.hostname}</p>
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
                      {d.agents}
                    </td>
                    <td className="px-5 py-3.5">{riskBadge(d.riskScore)}</td>
                    <td className="px-5 py-3.5 text-slate-500">{d.lastSeen}</td>
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
