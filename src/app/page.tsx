"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion, animate, useInView, useReducedMotion, useScroll, useTransform,
} from "framer-motion";
import {
  ArrowRight, PlayCircle, Search, Network, ShieldCheck, Check, X, Cpu, Timer,
  Sparkles, ShieldAlert, Ban, Eye,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { ThreeWaveCanvas } from "@/components/landing/ThreeWaveCanvas";
import { ThreeGovernanceCanvas } from "@/components/landing/ThreeGovernanceCanvas";
import { AgenticArchitecture } from "@/components/landing/AgenticArchitecture";

/* ---------- data ---------- */

const pillars = [
  { icon: Search, rgb: "99,102,241", title: "Discover AI Activity", desc: "Gain complete visibility into all AI tools, apps and user activity across your organization." },
  { icon: Network, rgb: "14,165,233", title: "Trace Data Movement", desc: "Track sensitive data across AI workflows, devices and external destinations." },
  { icon: ShieldCheck, rgb: "139,92,246", title: "Block Data Exfiltration", desc: "Automatically stop unauthorized data transfers and prevent data breaches." },
];

const trusted = ["Aramco", "ADNOC", "KSB", "Microsoft", "Google", "AWS", "ORACLE"];

const why = [
  { icon: Cpu, badge: "ENDPOINT NATIVE", title: "On-device coverage", desc: "See AI usage where it actually happens — on every endpoint, browser, CLI and autonomous agent." },
  { icon: Timer, badge: "ZERO PROXY", title: "Fast onboarding", desc: "Roll out across your fleet in minutes with MDM integrations. No proxies, no network re-architecture." },
  { icon: ShieldCheck, badge: "REAL-TIME POLICY", title: "Block dangerous actions", desc: "Warn, redact, or stop risky MCP tool calls and sensitive data transfers before they leave the device." },
];

const stats = [
  { value: "10K+", label: "Devices protected" },
  { value: "15 min", label: "Average onboarding" },
  { value: "1,000+", label: "AI tools & MCPs cataloged" },
  { value: "10K+", label: "Risky actions blocked / sec" },
];

const without = [
  "No idea which AI tools or shadow extensions employees are using",
  "API keys, source code & PII pasted into unapproved LLM apps",
  "Alerts arrive hours after the data breach has already happened",
];
const withUs = [
  "Complete real-time inventory of AI apps, agents and MCP servers",
  "Every prompt and data flow traced from source to destination",
  "Unauthorized transfers and destructive tool calls blocked in real time",
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------- small components ---------- */

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const m = value.match(/^([\d,]+)(.*)$/);
  const target = m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  const suffix = m ? m[2] : "";
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || !m) return;
    const c = animate(0, target, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, target]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref}>{m ? n.toLocaleString("en-US") + suffix : value}</span>;
}

function Glow({ className, d = 8 }: { className: string; d?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5], x: [0, 30, 0] }}
      transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function FloatChip({
  icon: Icon, text, tone, className, delay,
}: { icon: typeof Ban; text: string; tone: string; className: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay: 0.8 + delay }, scale: { delay: 0.8 + delay }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay } }}
      className={`absolute z-20 hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-[0_16px_40px_-10px_rgba(79,70,229,0.35)] backdrop-blur-md md:flex ${className}`}
    >
      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${tone}`}><Icon className="h-4 w-4" /></span>
      {text}
    </motion.div>
  );
}

/* ---------- page ---------- */

export default function LandingPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const dashY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1437]">
      <style>{`
        @keyframes shine{to{background-position:-250% 0}}
        @keyframes spin-slow{to{transform:rotate(360deg)}}
      `}</style>

      {/* ===== HERO ===== */}
      <div
        ref={heroRef}
        className="relative bg-[radial-gradient(ellipse_at_80%_0%,#E0E7FF_0%,transparent_55%),radial-gradient(ellipse_at_0%_60%,#EEF2FF_0%,transparent_50%)]"
      >
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(79,70,229,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_70%)]" />
        <Glow className="-left-24 top-28 h-80 w-80 bg-indigo-300/40" d={7} />
        <Glow className="right-6 top-20 h-96 w-96 bg-violet-300/40" d={9} />

        <Navbar />

        <section className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-10 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:min-h-[calc(100vh-84px)] lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-10 lg:py-10">
          <div className="min-w-0 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur sm:px-4 sm:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
              </span>
              AI Security for the Enterprise
            </motion.span>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:mt-7 sm:text-6xl xl:text-[68px]">
              {["See Every", "AI Data Flow."].map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-1 block bg-[linear-gradient(110deg,#4f46e5,#8b5cf6,#0ea5e9,#4f46e5)] bg-[length:250%_100%] bg-clip-text italic text-transparent [animation:shine_6s_linear_infinite]"
              >
                Stop Every Risk.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-slate-700 sm:mt-7 sm:text-lg lg:text-xl"
            >
              Discover AI usage, trace sensitive data movement, and block unauthorized transfers in real time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-8 flex flex-col gap-3.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="relative w-full sm:w-auto">
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 opacity-60 blur-lg" />
                <Link
                  href="/register"
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#0B1437] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-indigo-600 sm:w-auto"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Request a Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  href="/login"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-semibold shadow-sm transition-all hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md sm:w-auto"
                >
                  <PlayCircle className="h-5 w-5 text-indigo-600 transition-transform group-hover:scale-125" />
                  Explore Platform
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Dashboard with floating alert chips + parallax */}
          <motion.div
            style={{ y: dashY }}
            className="relative w-full min-w-0 lg:-mr-6 xl:-mr-12"
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-indigo-400/30 via-violet-400/20 to-sky-400/30 blur-2xl" />
            <FloatChip icon={Ban} text="SSN blocked in prompt" tone="bg-rose-100 text-rose-600" className="-left-4 top-8 lg:-left-10" delay={0} />
            <FloatChip icon={Eye} text="ChatGPT detected" tone="bg-orange-100 text-orange-600" className="-right-2 top-1/2 lg:-right-4" delay={1.2} />
            <FloatChip icon={Check} text="Policy enforced" tone="bg-emerald-100 text-emerald-600" className="-bottom-4 left-10" delay={2.2} />
            <div className="relative">
              <DashboardPreview />
            </div>
          </motion.div>
        </section>

        {/* ===== PILLARS ===== */}
        <section className="relative z-10 mx-auto grid max-w-[1280px] gap-4 px-4 pb-12 sm:gap-6 sm:px-6 sm:pb-14 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {pillars.map((p, i) => (
            <motion.a
              href="#capabilities"
              key={p.title}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
              }}
              style={{ backgroundImage: `radial-gradient(260px circle at var(--x,50%) var(--y,0%), rgba(${p.rgb},0.14), transparent 65%)` }}
              className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(79,70,229,0.08)] transition-all duration-300 hover:border-indigo-300 hover:shadow-[0_22px_50px_rgba(79,70,229,0.22)] sm:p-5"
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-16 sm:w-16"
                style={{ background: `rgba(${p.rgb},0.14)`, color: `rgb(${p.rgb})` }}
              >
                <p.icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.7} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{p.title}</h3>
                <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-sm">{p.desc}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-200 text-indigo-600 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-600 group-hover:text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </section>

        {/* ===== MARQUEE ===== */}
        <section id="trusted" className="relative z-10 mx-auto max-w-[1280px] px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10">
          <div className="flex items-center gap-4 text-center sm:gap-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
            <p className="text-xs font-semibold tracking-wide text-slate-600 sm:text-sm">Trusted by forward-thinking security teams</p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
          </div>
          <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <motion.div
              animate={reduce ? {} : { x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex w-max items-center gap-10 py-2 sm:gap-16"
            >
              {[...trusted, ...trusted].map((t, idx) => (
                <span key={`${t}-${idx}`} className="cursor-default text-xl font-extrabold tracking-tight text-slate-400 transition-all duration-300 hover:scale-110 hover:text-indigo-600 sm:text-2xl">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* ===== DARK BAND ===== */}
      <div
        id="capabilities"
        className="relative overflow-hidden bg-[#050818] bg-[radial-gradient(ellipse_at_80%_20%,rgba(79,70,229,0.32),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(14,165,233,0.2),transparent_55%)]"
      >
        <ThreeWaveCanvas />
        <svg className="relative z-10 block w-full -translate-y-[1px] text-white" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 80 }}>
          <path d="M0 0H1440V30C1200 80 1000 10 720 40C440 70 220 20 0 50Z" fill="currentColor" />
        </svg>

        <motion.div {...fade} className="relative z-10 px-4 pb-4 pt-10 text-center sm:px-6 sm:pt-12">
          <p className="inline-flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-semibold tracking-[0.25em] text-indigo-200 sm:gap-4 sm:text-sm sm:tracking-[0.38em]">
            <span>INTELLIGENCE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
            <span>VISIBILITY</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
            <span>CONTROL</span>
          </p>
        </motion.div>

        <AgenticArchitecture />

        {/* Why cards */}
        <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
          <motion.div {...fade} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Seeing beneath the surface of every device.</h2>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">Observe and secure AI at the device layer — where data actually moves.</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {why.map((w, i) => (
              <motion.div
                key={w.title}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1437]/70 p-6 backdrop-blur-md transition-all hover:border-indigo-400/60 hover:bg-[#0F1B4A]/80 hover:shadow-[0_24px_60px_rgba(79,70,229,0.35)] sm:p-8"
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl transition-opacity duration-500 group-hover:bg-indigo-400/40" />
                <div className="relative flex items-center justify-between gap-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-sky-300 ring-1 ring-white/10">{w.badge}</span>
                </div>
                <h3 className="relative mt-6 text-xl font-bold text-white">{w.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats with count-up */}
        <section className="relative z-10 border-y border-white/10 bg-[#04081C]/60 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-4 py-12 sm:gap-y-10 sm:px-6 sm:py-16 lg:grid-cols-4 lg:px-10">
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-indigo-300 via-sky-200 to-violet-300 bg-clip-text text-4xl font-black text-transparent sm:text-6xl">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 text-xs font-medium text-slate-300 sm:text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== GOVERNANCE (dark, matches band above) ===== */}
      <ThreeGovernanceCanvas />

      {/* ===== COMPARISON ===== */}
      <section id="comparison" className="relative overflow-hidden bg-slate-50">
        {/* wave from dark governance section into light */}
        <svg className="block w-full -translate-y-[1px] text-[#050818]" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 80 }}>
          <path d="M0 0H1440V30C1200 80 1000 10 720 40C440 70 220 20 0 50Z" fill="currentColor" />
        </svg>
        <Glow className="-left-20 top-40 h-80 w-80 bg-indigo-200/50" d={10} />
        <Glow className="-right-20 bottom-40 h-80 w-80 bg-violet-200/50" d={12} />

        <div className="relative px-4 pb-20 pt-10 sm:px-6 sm:pb-24 lg:px-10">
          <motion.div {...fade} className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3.5 py-1 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" /> WHY ENTERPRISES SWITCH
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0B1437] sm:text-5xl">
              See the difference between monitoring and protection
            </h2>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-[1040px] gap-6 md:grid-cols-2 md:gap-8">
            <motion.div {...fade} className="rounded-2xl border border-slate-200 bg-white/80 p-6 opacity-95 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-500 sm:text-lg">Without TraceAgentrix</h3>
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-500">Blind Spots</span>
              </div>
              <ul className="mt-6 space-y-4">
                {without.map((t, i) => (
                  <motion.li key={t} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }} className="flex items-start gap-3 text-sm text-slate-600 sm:text-base">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500"><X className="h-3.5 w-3.5" strokeWidth={3} /></span>
                    <span>{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.6, delay: 0.12 }} whileHover={{ y: -6 }} className="relative overflow-hidden rounded-2xl p-[2px] shadow-[0_24px_60px_rgba(79,70,229,0.22)]">
              <div className="absolute -inset-[80%] [animation:spin-slow_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_55%,#6366f1_75%,#22d3ee_90%,transparent)]" />
              <div className="relative rounded-[14px] bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-indigo-600 sm:text-lg">With TraceAgentrix</h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">Real-Time Control</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {withUs.map((t, i) => (
                    <motion.li key={t} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }} className="flex items-start gap-3 text-sm font-medium text-slate-800 sm:text-base">
                      <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.45 + i * 0.15 }} className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </motion.span>
                      <span>{t}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            {...fade}
            className="relative mx-auto mt-16 max-w-[1040px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#080E2B] via-[#16236B] to-[#080E2B] p-7 text-center text-white shadow-[0_30px_80px_rgba(11,20,55,0.4)] sm:mt-20 sm:p-14"
          >
            <Glow className="-left-10 -top-10 h-56 w-56 bg-indigo-500/40" d={7} />
            <Glow className="-bottom-10 -right-10 h-56 w-56 bg-cyan-500/30" d={9} />
            <div className="relative">
              <motion.div animate={reduce ? {} : { y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/40 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                <ShieldAlert className="h-7 w-7" />
              </motion.div>
              <h3 className="mt-5 text-2xl font-black tracking-tight sm:text-4xl">Ready to secure every AI agent in your organization?</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
                Deploy TraceAgentrix across your endpoints in 15 minutes and gain instant visibility into Shadow AI and MCP data flows.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative w-full sm:w-auto">
                  <span className="absolute -inset-1 rounded-full bg-white/40 blur-md" />
                  <Link href="/register" className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0B1437] transition hover:bg-indigo-50 sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
                <Link href="/login" className="w-full rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                  Sign in to Console
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}



// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   PlayCircle,
//   Search,
//   Network,
//   ShieldCheck,
//   Check,
//   X,
//   Cpu,
//   Timer,
//   Sparkles,
//   ShieldAlert,
//   Database,
//   Code2,
//   FileSpreadsheet,
//   KeyRound,
//   Bot,
//   AppWindow,
//   Terminal,
// } from "lucide-react";
// import { Navbar } from "@/components/landing/Navbar";
// import { Footer } from "@/components/landing/Footer";
// import { DashboardPreview } from "@/components/landing/DashboardPreview";
// import { ThreeWaveCanvas } from "@/components/landing/ThreeWaveCanvas";
// import { ThreeGovernanceCanvas } from "@/components/landing/ThreeGovernanceCanvas";
// import { LogoMark } from "@/components/landing/Logo";

// const pillars = [
//   {
//     icon: Search,
//     tone: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
//     borderHover: "hover:border-indigo-300",
//     title: "Discover AI Activity",
//     desc: "Gain complete visibility into all AI tools, apps and user activity across your organization.",
//   },
//   {
//     icon: Network,
//     tone: "bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
//     borderHover: "hover:border-sky-300",
//     title: "Trace Data Movement",
//     desc: "Track sensitive data across AI workflows, devices and external destinations.",
//   },
//   {
//     icon: ShieldCheck,
//     tone: "bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
//     borderHover: "hover:border-violet-300",
//     title: "Block Data Exfiltration",
//     desc: "Automatically stop unauthorized data transfers and prevent data breaches.",
//   },
// ];

// const trusted = ["Aramco", "ADNOC", "KSB", "Microsoft", "Google", "AWS", "ORACLE"];

// const why = [
//   {
//     icon: Cpu,
//     badge: "ENDPOINT NATIVE",
//     title: "On-device coverage",
//     desc: "See AI usage where it actually happens — on every endpoint, browser, CLI and autonomous agent.",
//   },
//   {
//     icon: Timer,
//     badge: "ZERO PROXY",
//     title: "Fast onboarding",
//     desc: "Roll out across your fleet in minutes with MDM integrations. No proxies, no network re-architecture.",
//   },
//   {
//     icon: ShieldCheck,
//     badge: "REAL-TIME POLICY",
//     title: "Block dangerous actions",
//     desc: "Warn, redact, or stop risky MCP tool calls and sensitive data transfers before they leave the device.",
//   },
// ];

// const stats = [
//   { value: "10K+", label: "Devices protected" },
//   { value: "15 min", label: "Average onboarding" },
//   { value: "1,000+", label: "AI tools & MCPs cataloged" },
//   { value: "10K+", label: "Risky actions blocked / sec" },
// ];

// const without = [
//   "No idea which AI tools or shadow extensions employees are using",
//   "API keys, source code & PII pasted into unapproved LLM apps",
//   "Alerts arrive hours after the data breach has already happened",
// ];
// const withUs = [
//   "Complete real-time inventory of AI apps, agents and MCP servers",
//   "Every prompt and data flow traced from source to destination",
//   "Unauthorized transfers and destructive tool calls blocked in real time",
// ];

// const fade = {
//   initial: { opacity: 0, y: 20 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true, margin: "-40px" },
//   transition: { duration: 0.5 },
// };

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1437]">
//       {/* ===== HERO SECTION (Responsive across Mobile, Tablet & Laptop) ===== */}
//       <div className="relative bg-[radial-gradient(ellipse_at_80%_0%,#E0E7FF_0%,transparent_55%),radial-gradient(ellipse_at_0%_60%,#EEF2FF_0%,transparent_50%)]">
//         {/* Soft Ambient Orbs */}
//         <motion.div
//           animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
//           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//           className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl sm:h-80 sm:w-80"
//         />
//         <motion.div
//           animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//           className="pointer-events-none absolute right-6 top-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl sm:right-10 sm:h-96 sm:w-96"
//         />

//         <Navbar />

//         <section className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-10 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:min-h-[calc(100vh-84px)] lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-10 lg:py-10">
//           {/* Left Hero Copy */}
//           <div className="min-w-0 max-w-2xl">
//             <motion.span
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur sm:px-4 sm:text-sm"
//             >
//               <span className="relative flex h-2 w-2">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
//                 <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
//               </span>
//               AI Security for the Enterprise
//             </motion.span>

//             <motion.h1
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight sm:mt-7 sm:text-5xl lg:text-[50px] xl:text-[56px]"
//             >
//               See Every AI Data Flow.
//               <span className="mt-1 block bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text italic text-transparent">
//                 Stop Every Risk.
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="mt-5 max-w-lg text-base leading-relaxed text-slate-700 sm:mt-7 sm:text-lg lg:text-xl"
//             >
//               Discover AI usage, trace sensitive data movement, and block
//               unauthorized transfers in real time.
//             </motion.p>

//             {/* Sleek Responsive Hero CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="mt-7 flex flex-col gap-3.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
//             >
//               <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
//                 <Link
//                   href="/register"
//                   className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#0B1437] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-6px_rgba(11,20,55,0.4)] transition-all duration-300 hover:bg-indigo-600 hover:shadow-[0_16px_36px_-6px_rgba(79,70,229,0.55)] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
//                 >
//                   <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
//                   <span>Request a Demo</span>
//                   <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
//                 </Link>
//               </motion.div>

//               <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
//                 <Link
//                   href="/login"
//                   className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-slate-300/80 bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1437] shadow-sm transition-all duration-200 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md sm:w-auto sm:px-7 sm:py-4 sm:text-base"
//                 >
//                   <PlayCircle
//                     className="h-5 w-5 text-indigo-600 transition-transform duration-200 group-hover:scale-110"
//                     strokeWidth={2}
//                   />
//                   <span>Explore Platform</span>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Right DashboardPreview */}
//           <motion.div
//             className="w-full min-w-0 lg:-mr-6 xl:-mr-12"
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.15 }}
//           >
//             <DashboardPreview />
//           </motion.div>
//         </section>

//         {/* ===== 3 PILLARS CARDS ===== */}
//         <section className="relative z-10 mx-auto grid max-w-[1280px] gap-4 px-4 pb-12 sm:gap-6 sm:px-6 sm:pb-14 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
//           {pillars.map((p, i) => (
//             <motion.a
//               href="#capabilities"
//               key={p.title}
//               {...fade}
//               transition={{ duration: 0.45, delay: i * 0.1 }}
//               whileHover={{ y: -5 }}
//               className={`group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-[0_8px_30px_rgba(79,70,229,0.07)] backdrop-blur transition-all hover:shadow-[0_18px_40px_rgba(79,70,229,0.16)] sm:p-5 ${p.borderHover}`}
//             >
//               <span
//                 className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 sm:h-16 sm:w-16 ${p.tone}`}
//               >
//                 <p.icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.7} />
//               </span>
//               <div className="min-w-0 flex-1">
//                 <h3 className="text-base font-bold text-slate-900 sm:text-lg">
//                   {p.title}
//                 </h3>
//                 <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-sm">
//                   {p.desc}
//                 </p>
//               </div>
//               <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-200 text-indigo-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-indigo-600 group-hover:text-white sm:h-9 sm:w-9">
//                 <ArrowRight className="h-4 w-4" />
//               </span>
//             </motion.a>
//           ))}
//         </section>

//         {/* ===== TRUSTED BY INFINITE MARQUEE ===== */}
//         <section
//           id="trusted"
//           className="relative z-10 mx-auto max-w-[1280px] px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10"
//         >
//           <div className="flex items-center gap-4 text-center sm:gap-6">
//             <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
//             <p className="text-xs font-semibold tracking-wide text-slate-600 sm:text-sm">
//               Trusted by forward-thinking security teams
//             </p>
//             <span className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
//           </div>

//           <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
//             <motion.div
//               animate={{ x: ["0%", "-50%"] }}
//               transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
//               className="flex w-max items-center gap-10 py-2 sm:gap-16"
//             >
//               {[...trusted, ...trusted].map((t, idx) => (
//                 <span
//                   key={`${t}-${idx}`}
//                   className="cursor-default text-xl font-extrabold tracking-tight text-slate-400/85 transition-colors hover:text-[#0B1437] sm:text-2xl"
//                 >
//                   {t}
//                 </span>
//               ))}
//             </motion.div>
//           </div>
//         </section>
//       </div>

//       {/* ===== DARK WAVE BAND + THREE.JS + ARCHITECTURE FLOW ===== */}
//       <div
//         id="capabilities"
//         className="relative overflow-hidden bg-[#050B24] bg-[radial-gradient(ellipse_at_80%_20%,rgba(79,70,229,0.28),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(14,165,233,0.18),transparent_55%)]"
//       >
//         <ThreeWaveCanvas />

//         {/* Top Wave Cutout */}
//         <svg
//           className="relative z-10 inset-x-0 top-0 block w-full -translate-y-[1px] text-white"
//           viewBox="0 0 1440 80"
//           preserveAspectRatio="none"
//           style={{ height: 80 }}
//         >
//           <path
//             d="M0 0H1440V30C1200 80 1000 10 720 40C440 70 220 20 0 50Z"
//             fill="currentColor"
//           />
//         </svg>

//         {/* Tagline */}
//         <motion.div
//           {...fade}
//           className="relative z-10 px-4 pb-4 pt-10 text-center sm:px-6 sm:pt-12"
//         >
//           <p className="inline-flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-semibold tracking-[0.25em] text-indigo-200/90 sm:gap-4 sm:text-sm sm:tracking-[0.38em]">
//             <span>INTELLIGENCE</span>
//             <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
//             <span>VISIBILITY</span>
//             <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
//             <span>CONTROL</span>
//           </p>
//         </motion.div>

//         {/* ===== AGENTIC DATA ARCHITECTURE DIAGRAM ===== */}
//         <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
//           <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
//             {/* Left Copy */}
//             <motion.div {...fade} className="min-w-0">
//               <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-300">
//                 <Sparkles className="h-3.5 w-3.5" /> AGENTIC ENTERPRISE GOVERNANCE
//               </span>
//               <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
//                 Secure the AI That Powers Your Business
//               </h2>
//               <p className="mt-4 text-sm leading-relaxed text-slate-300/90 sm:text-base">
//                 AI assistants and autonomous agents have sweeping access to your
//                 most critical repositories. TraceAgentrix sits between your
//                 enterprise data and every AI consumer to enforce least-privilege
//                 access in milliseconds.
//               </p>

//               <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
//                   <div className="text-lg font-extrabold text-sky-300 sm:text-xl">
//                     MCP & CLI
//                   </div>
//                   <div className="mt-1 text-xs text-slate-400">
//                     Tool-call inspection & human approval gates
//                   </div>
//                 </div>
//                 <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
//                   <div className="text-lg font-extrabold text-emerald-300 sm:text-xl">
//                     Zero-Leak DLP
//                   </div>
//                   <div className="mt-1 text-xs text-slate-400">
//                     Real-time secret & PII redaction in prompts
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Live SVG Data-Packet Architecture */}
//             <motion.div
//               {...fade}
//               className="relative min-w-0 rounded-3xl border border-white/10 bg-[#080F2E]/80 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
//             >
//               <div className="relative h-[340px] w-full">
//                 <svg
//                   viewBox="0 0 500 320"
//                   className="pointer-events-none absolute inset-0 h-full w-full"
//                 >
//                   <path
//                     id="arch-s1"
//                     d="M 135 55 C 190 55, 190 160, 215 160"
//                     fill="none"
//                     stroke="rgba(129,140,248,0.35)"
//                     strokeWidth="1.5"
//                     strokeDasharray="4 4"
//                   />
//                   <path
//                     id="arch-s2"
//                     d="M 135 125 C 180 125, 185 160, 215 160"
//                     fill="none"
//                     stroke="rgba(129,140,248,0.35)"
//                     strokeWidth="1.5"
//                     strokeDasharray="4 4"
//                   />
//                   <path
//                     id="arch-s3"
//                     d="M 135 195 C 180 195, 185 160, 215 160"
//                     fill="none"
//                     stroke="rgba(129,140,248,0.35)"
//                     strokeWidth="1.5"
//                     strokeDasharray="4 4"
//                   />
//                   <path
//                     id="arch-s4"
//                     d="M 135 265 C 190 265, 190 160, 215 160"
//                     fill="none"
//                     stroke="rgba(129,140,248,0.35)"
//                     strokeWidth="1.5"
//                     strokeDasharray="4 4"
//                   />

//                   <path
//                     id="arch-d1"
//                     d="M 285 160 C 315 160, 315 70, 360 70"
//                     fill="none"
//                     stroke="rgba(52,211,153,0.45)"
//                     strokeWidth="1.8"
//                   />
//                   <path
//                     id="arch-d2"
//                     d="M 285 160 L 360 160"
//                     fill="none"
//                     stroke="rgba(56,189,248,0.45)"
//                     strokeWidth="1.8"
//                   />
//                   <path
//                     id="arch-d3"
//                     d="M 285 160 C 315 160, 315 250, 360 250"
//                     fill="none"
//                     stroke="rgba(244,63,94,0.5)"
//                     strokeWidth="1.8"
//                     strokeDasharray="4 3"
//                   />

//                   <circle r="3.5" fill="#818CF8">
//                     <animateMotion dur="2.2s" repeatCount="indefinite">
//                       <mpath href="#arch-s1" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="3.5" fill="#38BDF8">
//                     <animateMotion dur="1.9s" begin="0.4s" repeatCount="indefinite">
//                       <mpath href="#arch-s2" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="3.5" fill="#818CF8">
//                     <animateMotion dur="2.1s" begin="0.8s" repeatCount="indefinite">
//                       <mpath href="#arch-s3" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="3.5" fill="#A78BFA">
//                     <animateMotion dur="2.3s" begin="1.2s" repeatCount="indefinite">
//                       <mpath href="#arch-s4" />
//                     </animateMotion>
//                   </circle>

//                   <circle r="4" fill="#34D399">
//                     <animateMotion dur="1.8s" begin="0.5s" repeatCount="indefinite">
//                       <mpath href="#arch-d1" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="4" fill="#38BDF8">
//                     <animateMotion dur="1.6s" begin="0.9s" repeatCount="indefinite">
//                       <mpath href="#arch-d2" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="4" fill="#FB7185">
//                     <animateMotion
//                       dur="1.8s"
//                       repeatCount="indefinite"
//                       keyPoints="0;0.72;0.72;0"
//                       keyTimes="0;0.55;0.85;1"
//                       calcMode="linear"
//                     >
//                       <mpath href="#arch-d3" />
//                     </animateMotion>
//                   </circle>
//                 </svg>

//                 {/* Left Column: Enterprise Data Sources */}
//                 <div className="relative z-10 flex h-full flex-col justify-between py-2">
//                   {[
//                     { icon: Database, label: "Customer Data" },
//                     { icon: Code2, label: "Source Code" },
//                     { icon: FileSpreadsheet, label: "Financial Models" },
//                     { icon: KeyRound, label: "API Secrets" },
//                   ].map((item) => (
//                     <div
//                       key={item.label}
//                       className="flex w-[114px] items-center gap-1.5 rounded-xl border border-white/10 bg-[#0F1942]/90 px-2.5 py-2 text-[11px] font-medium text-slate-200 shadow-md sm:w-[132px] sm:gap-2 sm:px-3 sm:text-xs"
//                     >
//                       <item.icon className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
//                       <span className="truncate">{item.label}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Center Hub: TraceAgentrix Shield */}
//                 <motion.div
//                   animate={{
//                     boxShadow: [
//                       "0 0 0 0px rgba(99,102,241,0.45)",
//                       "0 0 0 14px rgba(99,102,241,0)",
//                     ],
//                   }}
//                   transition={{ duration: 2.2, repeat: Infinity }}
//                   className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-indigo-400/60 bg-gradient-to-b from-indigo-600/30 to-[#0B1437] text-center backdrop-blur-md sm:h-20 sm:w-20"
//                 >
//                   <LogoMark className="h-6 w-5 sm:h-7 sm:w-6" />
//                   <span className="mt-1 text-[8.5px] font-bold tracking-wide text-white sm:text-[9px]">
//                     Policy Guard
//                   </span>
//                 </motion.div>

//                 {/* Right Column: AI Consumers */}
//                 <div className="absolute right-0 top-0 z-10 flex h-full flex-col justify-between py-4">
//                   <div className="w-[116px] rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-2 backdrop-blur sm:w-[140px] sm:p-2.5">
//                     <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 sm:gap-2 sm:text-xs">
//                       <Bot className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />{" "}
//                       <span className="truncate">AI Assistant</span>
//                     </div>
//                     <p className="mt-0.5 truncate text-[9.5px] text-emerald-200/70 sm:text-[10px]">
//                       Sanitized context
//                     </p>
//                   </div>

//                   <div className="w-[116px] rounded-xl border border-sky-400/30 bg-sky-500/10 p-2 backdrop-blur sm:w-[140px] sm:p-2.5">
//                     <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-300 sm:gap-2 sm:text-xs">
//                       <AppWindow className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />{" "}
//                       <span className="truncate">AI Application</span>
//                     </div>
//                     <p className="mt-0.5 truncate text-[9.5px] text-sky-200/70 sm:text-[10px]">
//                       Scoped permissions
//                     </p>
//                   </div>

//                   <div className="w-[116px] rounded-xl border border-rose-400/40 bg-rose-500/10 p-2 backdrop-blur sm:w-[140px] sm:p-2.5">
//                     <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-300 sm:gap-2 sm:text-xs">
//                       <Terminal className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />{" "}
//                       <span className="truncate">Rogue Agent</span>
//                     </div>
//                     <p className="mt-0.5 truncate text-[9.5px] text-rose-200/80 sm:text-[10px]">
//                       Write action held
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* ===== WHY CARDS ===== */}
//         <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
//           <motion.div {...fade} className="mx-auto max-w-2xl text-center">
//             <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
//               Seeing beneath the surface of every device.
//             </h2>
//             <p className="mt-4 text-base text-slate-300/90 sm:text-lg">
//               Observe and secure AI at the device layer — where data actually
//               moves.
//             </p>
//           </motion.div>

//           <div className="mt-12 grid gap-6 md:grid-cols-3">
//             {why.map((w, i) => (
//               <motion.div
//                 key={w.title}
//                 {...fade}
//                 transition={{ duration: 0.45, delay: i * 0.1 }}
//                 whileHover={{ y: -6 }}
//                 className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1437]/70 p-6 backdrop-blur-md transition-all hover:border-indigo-400/50 hover:bg-[#0F1B4A]/80 hover:shadow-[0_20px_50px_rgba(79,70,229,0.25)] sm:p-8"
//               >
//                 <div className="flex items-center justify-between gap-2">
//                   <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30 transition-transform duration-300 group-hover:scale-110">
//                     <w.icon className="h-6 w-6" />
//                   </span>
//                   <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-sky-300 ring-1 ring-white/10">
//                     {w.badge}
//                   </span>
//                 </div>
//                 <h3 className="mt-6 text-xl font-bold text-white">{w.title}</h3>
//                 <p className="mt-2.5 text-sm leading-relaxed text-slate-300/80 sm:text-base">
//                   {w.desc}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* ===== STATS STRIP ===== */}
//         <section className="relative z-10 border-y border-white/10 bg-[#04081C]/60 backdrop-blur-sm">
//           <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-4 py-12 sm:gap-y-10 sm:px-6 sm:py-14 lg:grid-cols-4 lg:px-10">
//             {stats.map((s, idx) => (
//               <motion.div
//                 key={s.label}
//                 initial={{ opacity: 0, scale: 0.92 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.45, delay: idx * 0.08 }}
//                 className="text-center"
//               >
//                 <div className="bg-gradient-to-r from-indigo-300 via-sky-200 to-violet-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
//                   {s.value}
//                 </div>
//                 <div className="mt-2 text-xs font-medium text-slate-300/80 sm:text-sm">
//                   {s.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* ===== THREE.JS 3D INTERACTIVE GOVERNANCE ENGINE ===== */}
//       <ThreeGovernanceCanvas />

//       {/* ===== COMPARISON (LIGHT) ===== */}
//       <section id="comparison" className="bg-slate-50/90 px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
//         <motion.div {...fade} className="mx-auto max-w-3xl text-center">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3.5 py-1 text-xs font-semibold text-indigo-700">
//             <Sparkles className="h-3.5 w-3.5" /> WHY ENTERPRISES SWITCH
//           </span>
//           <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B1437] sm:text-4xl">
//             See the difference between monitoring and protection
//           </h2>
//         </motion.div>

//         <div className="mx-auto mt-12 grid max-w-[1040px] gap-6 md:grid-cols-2 md:gap-8">
//           {/* Without */}
//           <motion.div
//             {...fade}
//             className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8"
//           >
//             <div className="flex items-center justify-between gap-2">
//               <h3 className="text-base font-bold text-slate-500 sm:text-lg">
//                 Without TraceAgentrix
//               </h3>
//               <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-500">
//                 Blind Spots
//               </span>
//             </div>
//             <ul className="mt-6 space-y-4">
//               {without.map((t, i) => (
//                 <motion.li
//                   key={t}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   className="flex items-start gap-3 text-sm text-slate-600 sm:text-base"
//                 >
//                   <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
//                     <X className="h-3.5 w-3.5" strokeWidth={3} />
//                   </span>
//                   <span>{t}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* With Us */}
//           <motion.div
//             {...fade}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="relative rounded-2xl border-2 border-indigo-500/40 bg-white p-6 shadow-[0_18px_50px_rgba(79,70,229,0.14)] sm:p-8"
//           >
//             <div className="flex items-center justify-between gap-2">
//               <h3 className="text-base font-bold text-indigo-600 sm:text-lg">
//                 With TraceAgentrix
//               </h3>
//               <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
//                 Real-Time Control
//               </span>
//             </div>
//             <ul className="mt-6 space-y-4">
//               {withUs.map((t, i) => (
//                 <motion.li
//                   key={t}
//                   initial={{ opacity: 0, x: 10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   className="flex items-start gap-3 text-sm font-medium text-slate-800 sm:text-base"
//                 >
//                   <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
//                     <Check className="h-3.5 w-3.5" strokeWidth={3} />
//                   </span>
//                   <span>{t}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         </div>

//         {/* Bottom Enterprise CTA Banner */}
//         <motion.div
//           {...fade}
//           className="mx-auto mt-16 max-w-[1040px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#080E2B] via-[#111D52] to-[#080E2B] p-7 text-center text-white shadow-[0_24px_60px_rgba(11,20,55,0.28)] sm:mt-20 sm:p-14"
//         >
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
//             <ShieldAlert className="h-6 w-6" />
//           </div>
//           <h3 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-4xl">
//             Ready to secure every AI agent in your organization?
//           </h3>
//           <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
//             Deploy TraceAgentrix across your endpoints in 15 minutes and gain
//             instant visibility into Shadow AI and MCP data flows.
//           </p>
//           <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
//             <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
//               <Link
//                 href="/register"
//                 className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0B1437] shadow-lg transition hover:bg-indigo-50 sm:w-auto"
//               >
//                 Start Free Trial
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Link>
//             </motion.div>
//             <Link
//               href="/login"
//               className="w-full rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
//             >
//               Sign in to Console
//             </Link>
//           </div>
//         </motion.div>
//       </section>

//       <div id="footer">
//         <Footer />
//       </div>
//     </div>
//   );
// }