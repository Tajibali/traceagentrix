"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Plus, MoreHorizontal, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const policies = [
  {
    id: "1",
    name: "Block destructive DB commands",
    description: "Block DROP, TRUNCATE, DELETE without WHERE on production",
    action: "block",
    target: "action",
    condition: "command matches DROP|TRUNCATE",
    enabled: true,
  },
  {
    id: "2",
    name: "Quarantine high-risk MCPs",
    description: "Auto-quarantine MCPs with risk score > 70",
    action: "block",
    target: "mcp",
    condition: "riskScore > 70",
    enabled: true,
  },
  {
    id: "3",
    name: "Warn on personal AI accounts",
    description: "Warn when user signs in with non-company email",
    action: "warn",
    target: "agent",
    condition: "email not matching company domain",
    enabled: true,
  },
  {
    id: "4",
    name: "Block secrets in prompts",
    description: "Detect and block API keys / passwords in AI prompts",
    action: "block",
    target: "action",
    condition: "contains secret pattern",
    enabled: true,
  },
  {
    id: "5",
    name: "Allow approved coding agents only",
    description: "Only Cursor, Claude Code, Copilot allowed",
    action: "block",
    target: "agent",
    condition: "agent not in allowlist",
    enabled: false,
  },
  {
    id: "6",
    name: "Token budget alert",
    description: "Warn when daily token usage exceeds 500K",
    action: "warn",
    target: "action",
    condition: "dailyTokens > 500000",
    enabled: true,
  },
];

export default function PoliciesPage() {
  const [list, setList] = useState(policies);

  function togglePolicy(id: string) {
    setList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
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
        <Button size="sm">
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
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {enabledCount}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-400">Disabled</p>
          <p className="mt-1 text-2xl font-bold text-slate-400">
            {list.length - enabledCount}
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        {list.map((policy, i) => (
          <motion.div
            key={policy.id}
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
                    onClick={() => togglePolicy(policy.id)}
                    className="text-slate-400 transition-colors hover:text-cyan-400"
                    title={policy.enabled ? "Disable" : "Enable"}
                  >
                    {policy.enabled ? (
                      <ToggleRight className="h-6 w-6 text-cyan-400" />
                    ) : (
                      <ToggleLeft className="h-6 w-6" />
                    )}
                  </button>
                  <button className="rounded p-1 text-slate-500 hover:bg-hover hover:text-slate-300">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
