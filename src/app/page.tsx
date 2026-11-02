"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Zap,
  Server,
  Activity,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: Eye,
    title: "Full AI Visibility",
    desc: "Discover every AI app, agent and MCP running across your device fleet in minutes.",
  },
  {
    icon: Shield,
    title: "Real-time Protection",
    desc: "Block dangerous tool calls and risky actions before they impact data or systems.",
  },
  {
    icon: Server,
    title: "Device Fleet Control",
    desc: "Monitor and secure Windows & macOS endpoints from a single dashboard.",
  },
  {
    icon: Activity,
    title: "Usage & Token Analytics",
    desc: "Track token consumption, team usage patterns and cost drivers in real time.",
  },
  {
    icon: Zap,
    title: "Instant Policy Enforcement",
    desc: "Warn or block high-risk actions with flexible policies — no scripts needed.",
  },
  {
    icon: Lock,
    title: "MCP Security",
    desc: "Inventory, score and quarantine untrusted MCP connectors automatically.",
  },
];

const stats = [
  { value: "15min", label: "Deploy time" },
  { value: "1K+", label: "AI apps detected" },
  { value: "10K+", label: "Actions blocked/sec" },
  { value: "99.9%", label: "Uptime" },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500">
            <Shield className="h-5 w-5 text-deep" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Trace<span className="text-cyan-400">AgentriX</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Security Platform for the Agentic Era
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            See. Secure. Control{" "}
            <span className="text-gradient">every AI agent</span> on every
            device.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            TraceAgentriX gives security teams complete visibility and real-time
            control over AI apps, coding agents and MCP connectors across the
            entire device fleet.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="min-w-[180px]">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="min-w-[180px]">
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/5 bg-surface/50 px-4 py-5 backdrop-blur"
            >
              <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Built for modern AI security teams
          </h2>
          <p className="mt-3 text-slate-400">
            Everything you need to monitor, control and protect AI usage at scale.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-xl border border-white/5 bg-surface p-6 transition-all duration-300 hover:border-cyan-500/20 hover:shadow-glow"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-surface to-surface p-10 text-center shadow-glow sm:p-14">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to secure your AI fleet?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Deploy in under 15 minutes. Get full visibility into every AI agent
            and connector across your organization.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-6xl px-6">
          © {new Date().getFullYear()} TraceAgentriX. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
