"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const tokenTrend = [
  { day: "Mon", tokens: 420 },
  { day: "Tue", tokens: 580 },
  { day: "Wed", tokens: 510 },
  { day: "Thu", tokens: 720 },
  { day: "Fri", tokens: 890 },
  { day: "Sat", tokens: 340 },
  { day: "Sun", tokens: 280 },
];

const agentUsage = [
  { name: "Claude Code", tokens: 2400, color: "#22D3EE" },
  { name: "Cursor", tokens: 1800, color: "#14B8A6" },
  { name: "ChatGPT", tokens: 980, color: "#3B82F6" },
  { name: "Copilot", tokens: 720, color: "#8B5CF6" },
  { name: "Claude", tokens: 450, color: "#F59E0B" },
  { name: "Others", tokens: 310, color: "#64748B" },
];

const teamUsage = [
  { team: "Engineering", tokens: "3.2M", agents: 28, risk: "medium" },
  { team: "Product", tokens: "1.1M", agents: 12, risk: "low" },
  { team: "Data", tokens: "890K", agents: 9, risk: "low" },
  { team: "Support", tokens: "420K", agents: 6, risk: "low" },
  { team: "Marketing", tokens: "180K", agents: 4, risk: "low" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-slate-400">
          Token usage, agent activity and cost insights
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Tokens (7d)", value: "3.74M", change: "+18%" },
          { label: "Avg Daily", value: "534K", change: "+12%" },
          { label: "Active Agents", value: "38", change: "+4" },
          { label: "Est. Cost", value: "$187", change: "+15%" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-4">
              <p className="text-sm text-slate-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs text-emerald-400">{s.change}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Token trend chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Token Usage (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tokenTrend}>
                  <defs>
                    <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="day"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(v) => `${v}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#121826",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                    labelStyle={{ color: "#94a3b8" }}
                    itemStyle={{ color: "#22D3EE" }}
                    formatter={(value: number) => [`${value}K tokens`, "Usage"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="tokens"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    fill="url(#tokenGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Agent breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>By Agent (K tokens)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentUsage} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#121826",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="tokens" radius={[0, 4, 4, 0]}>
                    {agentUsage.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team table */}
      <Card>
        <CardHeader>
          <CardTitle>Usage by Team</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs text-slate-500">
                <th className="px-5 py-3 font-medium">Team</th>
                <th className="px-5 py-3 font-medium">Tokens</th>
                <th className="px-5 py-3 font-medium">Agents</th>
                <th className="px-5 py-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {teamUsage.map((t, i) => (
                <motion.tr
                  key={t.team}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 transition-colors hover:bg-hover/50"
                >
                  <td className="px-5 py-3.5 font-medium">{t.team}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-300">
                    {t.tokens}
                  </td>
                  <td className="px-5 py-3.5 text-slate-300">{t.agents}</td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant={
                        t.risk === "high"
                          ? "danger"
                          : t.risk === "medium"
                          ? "warning"
                          : "success"
                      }
                    >
                      {t.risk}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
