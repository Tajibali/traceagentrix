"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Search,
  Network,
  ShieldCheck,
  Check,
  X,
  Cpu,
  Timer,
} from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DashboardPreview } from "@/components/landing/DashboardPreview";


const pillars = [
  {
    icon: Search,
    tone: "bg-indigo-100 text-indigo-600",
    title: "Discover AI Activity",
    desc: "Gain complete visibility into all AI tools, apps and user activity across your organization.",
  },
  {
    icon: Network,
    tone: "bg-sky-100 text-sky-600",
    title: "Trace Data Movement",
    desc: "Track sensitive data across AI workflows, devices and external destinations.",
  },
  {
    icon: ShieldCheck,
    tone: "bg-violet-100 text-violet-600",
    title: "Block Data Exfiltration",
    desc: "Automatically stop unauthorized data transfers and prevent data breaches.",
  },
];

const trusted = ["Aramco", "ADNOC", "KSB", "Microsoft", "Google", "aws", "ORACLE"];

const why = [
  {
    icon: Cpu,
    title: "On-device coverage",
    desc: "See AI usage where it actually happens — on every endpoint, browser, CLI and agent.",
  },
  {
    icon: Timer,
    title: "Fast onboarding",
    desc: "Roll out across your fleet in minutes with MDM integrations. No proxies, no re-architecture.",
  },
  {
    icon: ShieldCheck,
    title: "Block dangerous actions",
    desc: "Warn or stop risky tool calls and data transfers before they leave the device.",
  },
];

const stats = [
  { value: "10K+", label: "Devices protected" },
  { value: "15 min", label: "Average onboarding" },
  { value: "1,000+", label: "AI tools & MCPs cataloged" },
  { value: "10K+", label: "Risky actions blocked / sec" },
];

const without = [
  "No idea which AI tools employees are using",
  "Sensitive data pasted into unapproved apps",
  "Alerts after the breach has already happened",
];
const withUs = [
  "Complete inventory of AI apps, agents and MCPs",
  "Every data flow traced to its destination",
  "Unauthorized transfers blocked in real time",
];


const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1437]">
      {/* ===== HERO (light) ===== */}
      <div className="relative bg-[radial-gradient(ellipse_at_80%_0%,#E0E7FF_0%,transparent_55%),radial-gradient(ellipse_at_0%_60%,#EEF2FF_0%,transparent_50%)]">
        <Navbar />

        {/* Hero */}
        <section className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[600px_1fr] lg:px-10 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              AI Security for the Enterprise
            </span>
            <h1 className="mt-7 whitespace-nowrap text-5xl font-extrabold leading-[1.08] tracking-tight xl:text-[56px]">
              See Every AI Data Flow.
              <span className="mt-1 block bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text italic text-transparent">
                Stop Every Risk.
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-xl leading-relaxed text-slate-700">
              Discover AI usage, trace sensitive data movement, and block
              unauthorized transfers in real time.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#0B1437] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-900/20 transition hover:bg-indigo-700"
              >
                Request a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="group inline-flex items-center gap-2.5 text-base font-semibold"
              >
                <PlayCircle className="h-7 w-7" strokeWidth={1.5} />
                <span className="border-b-2 border-indigo-600 pb-0.5">
                  Explore Platform
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="lg:-mr-10 xl:-mr-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <DashboardPreview />
          </motion.div>
        </section>

        {/* Pillars */}
        <section className="relative z-10 mx-auto grid max-w-[1280px] gap-5 px-6 pb-12 md:grid-cols-3 lg:px-10">
          {pillars.map((p, i) => (
            <motion.a
              href="#"
              key={p.title}
              {...fade}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(79,70,229,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(79,70,229,0.14)]"
            >
              <span
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${p.tone}`}
              >
                <p.icon className="h-8 w-8" strokeWidth={1.7} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="whitespace-nowrap text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm leading-snug text-slate-600">
                  {p.desc}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-200 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </section>

        {/* Trusted by */}
        <section className="relative z-10 mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
          <div className="flex items-center gap-6 text-center">
            <span className="h-px flex-1 bg-slate-200" />
            <p className="text-base font-semibold">
              Trusted by forward-thinking organizations
            </p>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-2xl font-semibold text-slate-400">
            {trusted.map((t) => (
              <span key={t} className="tracking-tight">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* ===== DARK WAVE BAND ===== */}
      <div className="relative bg-[#050B24] bg-[radial-gradient(ellipse_at_80%_20%,rgba(79,70,229,0.28),transparent_55%)]">
        <svg
          className="absolute inset-x-0 top-0 block w-full -translate-y-[1px] text-white"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: 80 }}
        >
          <path
            d="M0 0H1440V30C1200 80 1000 10 720 40C440 70 220 20 0 50Z"
            fill="currentColor"
          />
        </svg>
        <div className="px-6 pb-8 pt-28 text-center">
          <p className="text-sm font-medium tracking-[0.35em] text-slate-300">
            INTELLIGENCE <span className="mx-3">•</span> VISIBILITY{" "}
            <span className="mx-3">•</span> CONTROL
          </p>
        </div>

        {/* Why */}
        <section className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10">
          <motion.div {...fade} className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Seeing beneath the surface of every device.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Observe and secure AI at the device layer — where data actually
              moves.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {why.map((w, i) => (
              <motion.div
                key={w.title}
                {...fade}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                  <w.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {w.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-400">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/10">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-6 py-14 lg:grid-cols-4 lg:px-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-5xl font-extrabold text-transparent">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== COMPARISON (light) ===== */}
      <section className="bg-slate-50 px-6 py-24 lg:px-10">
        <motion.div {...fade} className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            See the difference between monitoring and protection
          </h2>
        </motion.div>
        <div className="mx-auto mt-14 grid max-w-[1000px] gap-6 md:grid-cols-2">
          <motion.div
            {...fade}
            className="rounded-2xl border border-slate-200 bg-white p-8"
          >
            <h3 className="text-lg font-bold text-slate-500">
              Without TraceAgentrix
            </h3>
            <ul className="mt-6 space-y-4">
              {without.map((t) => (
                <li key={t} className="flex gap-3 text-slate-600">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-indigo-200 bg-white p-8 shadow-[0_12px_40px_rgba(79,70,229,0.12)]"
          >
            <h3 className="text-lg font-bold text-indigo-600">
              With TraceAgentrix
            </h3>
            <ul className="mt-6 space-y-4">
              {withUs.map((t) => (
                <li key={t} className="flex gap-3 font-medium">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
