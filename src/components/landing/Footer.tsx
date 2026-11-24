"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Send,
  Globe,
} from "lucide-react";
import { Logo } from "./Logo";
import { navMenus } from "./Navbar";

const fallbackCols = [
  {
    title: "Product",
    links: [
      { label: "AI Agent Gateway", href: "#capabilities" },
      { label: "Real-Time Data Mesh", href: "#capabilities" },
      { label: "Shadow AI Discovery", href: "#capabilities" },
      { label: "Zero-Leak DLP Policy", href: "#capabilities" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Enterprise AI Security Guide", href: "#comparison" },
      { label: "Compliance & Audit Docs", href: "#comparison" },
      { label: "Live Threat Feed", href: "#capabilities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About TraceAgentrix", href: "#footer" },
      { label: "Customers & Case Studies", href: "#trusted" },
      { label: "Contact Security Team", href: "/register" },
    ],
  },
];

const footerCols =
  Array.isArray(navMenus) && navMenus.length > 0
    ? navMenus.map((m) => ({
      title: m.label,
      links: m.items.map((i) => ({ label: i.title, href: i.href })),
    }))
    : fallbackCols;

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[#050B24] text-slate-300">
      {/* Top Glowing Gradient Border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-96 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -top-20 right-1/4 h-64 w-80 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-12 pt-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + Newsletter + Compliance Badges */}
          <div>
            <div className="inline-block rounded-xl bg-white/95 px-3 py-1.5 shadow-sm">
              <Logo />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Real-time AI visibility, data lineage, and autonomous MCP policy
              enforcement for modern security-first enterprises.
            </p>

            {/* Threat Intelligence Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-6 max-w-sm">
              <label className="block text-xs font-semibold tracking-wide text-slate-300">
                Subscribe to AI Threat Briefings
              </label>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2.5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  You&apos;re subscribed to weekly AI security advisories.
                </motion.div>
              ) : (
                <div className="mt-2.5 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-4 backdrop-blur-sm transition-colors focus-within:border-indigo-400/60">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="work@company.com"
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
                  >
                    Join <Send className="h-3 w-3" />
                  </button>
                </div>
              )}
            </form>

            {/* Enterprise Compliance Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {["SOC 2 Type II", "ISO 27001", "GDPR Ready"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300"
                >
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 text-indigo-400 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal & System Status Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <span>
              © {new Date().getFullYear()} TraceAgentrix Inc. All rights
              reserved.
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              All Systems Operational
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              <Lock className="h-3 w-3 text-indigo-400" /> Trust Center
            </Link>
            <Link
              href="#footer"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#footer"
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Globe className="h-3.5 w-3.5" /> Global
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;