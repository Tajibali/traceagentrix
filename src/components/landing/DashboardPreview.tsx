"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring, useTransform,
  useMotionTemplate, useReducedMotion,
} from "framer-motion";
import {
  User, Bot, Monitor, Check, X, Cloud, LayoutDashboard, Search, ShieldCheck,
  FileText, Settings, Bell, TrendingUp, BarChart3, Clock, Lock, Sparkles,
  AlertTriangle, Zap,
} from "lucide-react";
import { LogoMark } from "./Logo";

type Scenario = {
  id: string; label: string; status: "blocked" | "allowed"; banner: string;
  eventLog: string; src: 0 | 1 | 2; dst: 0 | 1 | 2; ms: number;
};

const scenarios: Scenario[] = [
  { id: "leak", label: "Exfiltration Blocked", status: "blocked", banner: "Blocked: API Secret → External LLM", eventLog: "POLICY #04 • Redacted AWS_SECRET_KEY in ChatGPT Desktop prompt", src: 1, dst: 1, ms: 8 },
  { id: "safe", label: "Safe Copilot Sync", status: "allowed", banner: "Verified: Least-Privilege Context", eventLog: "POLICY #01 • Approved sanitized Q4 summary for Work Apps", src: 0, dst: 0, ms: 5 },
  { id: "mcp", label: "MCP Quarantine", status: "blocked", banner: "Blocked: DROP TABLE via MCP", eventLog: "POLICY #02 • Quarantined unvetted postgres-mcp write call", src: 2, dst: 1, ms: 11 },
];

const sideIcons = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Search, label: "Investigate" },
  { icon: ShieldCheck, label: "Policies" },
  { icon: FileText, label: "Audit Logs" },
  { icon: Settings, label: "Settings" },
];

/* Canvas is a fixed 460 x 300 box; nodes use % of it so nothing overlaps */
const VY = [72, 150, 228];
const srcNodes = [
  { icon: User, title: "Employee", sub: "Browser & SaaS" },
  { icon: Bot, title: "AI Agents", sub: "Claude, Copilot" },
  { icon: Monitor, title: "Local MCPs", sub: "CLI & Local DB" },
];
const srcPath = (i: number) => (i === 1 ? "M 146 150 L 187 150" : `M 146 ${VY[i]} C 168 ${VY[i]}, 168 150, 187 150`);
const dstPath = (i: number) => (i === 1 ? "M 273 150 L 316 150" : `M 273 150 C 292 150, 292 ${VY[i]}, 316 ${VY[i]}`);
const top = (i: number) => `${(VY[i] / 300) * 100}%`;

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const t = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(t), v) : v + 1)), 18);
    return () => clearInterval(t);
  }, [text]);
  return (
    <>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-2.5 w-[5px] translate-y-[1px] animate-pulse bg-indigo-300" />
    </>
  );
}

export function DashboardPreview() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [blocked, setBlocked] = useState(24);
  const [flows, setFlows] = useState(12.8);
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 14 }, (_, k) => 30 + ((k * 37) % 60)));
  const cur = scenarios[i];
  const wrap = useRef<HTMLDivElement>(null);

  // 3D tilt + glare that follow the cursor
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 }), sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotY = useTransform(sx, [0, 1], [-7, 7]);
  const rotX = useTransform(sy, [0, 1], [6, -6]);
  const gx = useTransform(sx, (v) => `${v * 100}%`), gy = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${gx} ${gy}, rgba(255,255,255,0.13), transparent 60%)`;
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => {
        const n = (p + 1) % scenarios.length;
        if (scenarios[n].status === "blocked") setBlocked((c) => c + 1);
        setFlows((f) => Number((f + 0.1).toFixed(1)));
        return n;
      });
    }, 3800);
    const b = setInterval(() => setBars((a) => [...a.slice(1), 25 + Math.round(Math.random() * 70)]), 700);
    return () => { clearInterval(t); clearInterval(b); };
  }, []);

  return (
    <motion.div
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
      className="relative mx-auto w-full max-w-[780px]"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-indigo-500/35 via-cyan-400/20 to-fuchsia-500/30 blur-3xl" />

      {/* rotating gradient border */}
      <div className="relative overflow-hidden rounded-2xl p-[1.5px] shadow-[0_40px_90px_-20px_rgba(30,27,75,0.6)]">
        <motion.div
          className="absolute -inset-[80%]"
          style={{ background: "conic-gradient(from 0deg, transparent 0 55%, #6366f1 72%, #22d3ee 86%, #e879f9 94%, transparent)" }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative overflow-hidden rounded-[15px] bg-[#060B22]">
          <motion.div className="pointer-events-none absolute inset-0 z-40" style={{ background: glare }} />

          {/* Browser bar */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 hidden items-center gap-1.5 truncate rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 xl:inline-flex">
                <Lock className="h-2.5 w-2.5 text-emerald-400" /> app.traceagentrix.io/live-mesh
              </span>
            </div>
            <div className="flex items-center gap-0.5 rounded-lg bg-white/10 p-0.5">
              {scenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => setI(idx)}
                  className={`relative overflow-hidden rounded-md px-2 py-1 text-[9.5px] font-semibold transition-colors ${i === idx ? "bg-indigo-500 text-white shadow-[0_0_16px_rgba(99,102,241,0.7)]" : "text-slate-300 hover:text-white"}`}
                >
                  {sc.label}
                  {i === idx && (
                    <motion.span key={`p-${i}`} className="absolute bottom-0 left-0 h-[2px] bg-cyan-300" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.8, ease: "linear" }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-[118px] shrink-0 flex-col justify-between border-r border-white/10 bg-black/30 px-2.5 py-4 text-white sm:flex">
              <div>
                <div className="mb-5 flex items-center gap-2 px-1.5">
                  <LogoMark className="h-7 w-6 shrink-0" />
                  <span className="truncate text-[11px] font-bold tracking-tight">TraceAgentrix</span>
                </div>
                <div className="space-y-1">
                  {sideIcons.map((s) => (
                    <div key={s.label} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] font-medium ${s.active ? "bg-gradient-to-r from-indigo-500/40 to-transparent text-white ring-1 ring-indigo-400/40" : "text-slate-400"}`}>
                      <s.icon className="h-3.5 w-3.5 shrink-0 text-indigo-300" /> {s.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                <div className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Agent v2.4
                </div>
                <p className="mt-1 text-[8.5px] leading-tight text-slate-400">124 devices synced</p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              {/* Sub header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-xs font-bold text-white">Real-Time AI Data Mesh</span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Enforcing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[9.5px] font-medium text-slate-400 xl:inline-flex">
                    <Clock className="h-3 w-3" /> Live Stream
                  </span>
                  <Bell className="h-3.5 w-3.5 text-slate-400" />
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[9px] font-bold text-white">TA</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_150px]">
                {/* ===== Mesh canvas ===== */}
                <div className="relative bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:16px_16px] p-2">
                  <div className="relative mx-auto w-full" style={{ aspectRatio: "460 / 300" }}>
                    <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={cur.id}
                          initial={{ opacity: 0, y: -10, scale: 0.85 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-semibold text-white ${cur.status === "blocked" ? "bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_0_24px_rgba(244,63,94,0.7)]" : "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_24px_rgba(16,185,129,0.7)]"}`}
                        >
                          {cur.status === "blocked" ? <AlertTriangle className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                          {cur.banner}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <svg viewBox="0 0 460 300" className="pointer-events-none absolute inset-0 h-full w-full">
                      {[0, 1, 2].map((n) => (
                        <path key={`s${n}`} id={`m-s${n}`} d={srcPath(n)} fill="none"
                          stroke={cur.src === n ? "#818cf8" : "rgba(129,140,248,0.22)"} strokeWidth={cur.src === n ? 2.6 : 1.3}
                          style={{ filter: cur.src === n ? "drop-shadow(0 0 5px #6366f1)" : undefined }} />
                      ))}
                      {[0, 1, 2].map((n) => (
                        <path key={`d${n}`} id={`m-d${n}`} d={dstPath(n)} fill="none"
                          stroke={n === 1 ? "#f43f5e" : cur.dst === n ? "#34d399" : "rgba(52,211,153,0.25)"}
                          strokeWidth={cur.dst === n || n === 1 ? 2.4 : 1.3} strokeDasharray={n === 1 ? "5 4" : undefined}
                          style={{ filter: cur.dst === n ? "drop-shadow(0 0 5px #10b981)" : undefined }} />
                      ))}

                      {/* incoming packets with a glow halo */}
                      {[0, 1, 2].map((n) => (
                        <g key={`ps${n}`} opacity={cur.src === n ? 1 : 0.4}>
                          <circle r={cur.src === n ? 10 : 6} fill="#6366f1" opacity="0.3">
                            <animateMotion dur={cur.src === n ? "1.1s" : "2.2s"} begin={`${n * 0.4}s`} repeatCount="indefinite"><mpath href={`#m-s${n}`} /></animateMotion>
                          </circle>
                          <circle r={cur.src === n ? 4.5 : 3} fill="#c7d2fe">
                            <animateMotion dur={cur.src === n ? "1.1s" : "2.2s"} begin={`${n * 0.4}s`} repeatCount="indefinite"><mpath href={`#m-s${n}`} /></animateMotion>
                          </circle>
                        </g>
                      ))}
                      {[0, 2].map((n) => (
                        <g key={`pd${n}`} opacity={cur.dst === n ? 1 : 0.4}>
                          <circle r={cur.dst === n ? 10 : 6} fill="#10b981" opacity="0.3">
                            <animateMotion dur="1.6s" begin={`${0.5 + n * 0.3}s`} repeatCount="indefinite"><mpath href={`#m-d${n}`} /></animateMotion>
                          </circle>
                          <circle r={cur.dst === n ? 4.5 : 3} fill="#a7f3d0">
                            <animateMotion dur="1.6s" begin={`${0.5 + n * 0.3}s`} repeatCount="indefinite"><mpath href={`#m-d${n}`} /></animateMotion>
                          </circle>
                        </g>
                      ))}
                      {/* blocked packet stops before the external node */}
                      {[10, 4.5].map((r, k) => (
                        <circle key={k} r={r} fill={k ? "#fecdd3" : "#f43f5e"} opacity={k ? 1 : 0.35}>
                          <animateMotion dur="1.7s" repeatCount="indefinite" keyPoints="0;0.7;0.7;0" keyTimes="0;0.55;0.85;1" calcMode="linear"><mpath href="#m-d1" /></animateMotion>
                        </circle>
                      ))}
                      {cur.status === "blocked" && (
                        <circle cx="304" cy="150" r="5" fill="none" stroke="#fb7185" strokeWidth="1.8">
                          <animate attributeName="r" values="4;22" dur="1.1s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="1;0" dur="1.1s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </svg>

                    {/* left nodes */}
                    {srcNodes.map((n, idx) => {
                      const on = cur.src === idx;
                      return (
                        <div key={n.title} style={{ top: top(idx), width: "30%" }}
                          className={`absolute left-[1.5%] z-10 flex -translate-y-1/2 items-center gap-1.5 rounded-xl px-1.5 py-1.5 backdrop-blur transition-all duration-300 sm:gap-2 sm:px-2 ${on ? "scale-[1.06] bg-indigo-500/25 shadow-[0_0_26px_rgba(99,102,241,0.6)] ring-2 ring-indigo-400" : "bg-white/[0.06] ring-1 ring-white/10"}`}>
                          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${on ? "bg-indigo-500 text-white" : "bg-white/10 text-indigo-300"}`}>
                            <n.icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 leading-tight">
                            <div className="truncate text-[10px] font-bold text-white">{n.title}</div>
                            <div className="truncate text-[8px] text-slate-400">{n.sub}</div>
                          </div>
                        </div>
                      );
                    })}

                    {/* hub */}
                    <div className="absolute left-1/2 top-1/2 z-20 w-[19.5%] -translate-x-1/2 -translate-y-1/2">
                      <motion.span className="absolute -inset-2 rounded-[20px] border border-dashed border-indigo-300/50" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} />
                      <motion.div
                        animate={{ boxShadow: ["0 0 30px rgba(99,102,241,0.5), 0 0 0 0px rgba(99,102,241,0.5)", "0 0 30px rgba(99,102,241,0.5), 0 0 0 16px rgba(99,102,241,0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative flex aspect-square w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#1e2a78] to-[#0a1030] text-white ring-2 ring-indigo-300/70"
                      >
                        <LogoMark className="h-5 w-4 sm:h-6 sm:w-5" />
                        <span className="mt-0.5 text-[7px] font-bold leading-none text-indigo-100">Policy Engine</span>
                      </motion.div>
                      {/* decision speed pill */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={cur.id}
                          initial={{ opacity: 0, y: 8, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.7 }}
                          className="absolute left-1/2 top-full mt-4 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-cyan-400/15 px-2 py-0.5 text-[9px] font-bold text-cyan-200 ring-1 ring-cyan-300/40"
                        >
                          <Zap className="h-2.5 w-2.5" /> decided in {cur.ms} ms
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* right nodes */}
                    {[
                      { title: "Approved", sub: "Sanctioned Apps", icon: Check, box: "bg-emerald-500 text-white", on: cur.dst === 0, glow: "bg-emerald-500/20 shadow-[0_0_26px_rgba(16,185,129,0.6)] ring-2 ring-emerald-400" },
                      { title: "External", sub: "Unvetted / Leak", icon: X, box: "bg-red-500 text-white", on: cur.status === "blocked", glow: "bg-red-500/20 shadow-[0_0_26px_rgba(244,63,94,0.65)] ring-2 ring-red-400", red: true },
                      { title: "Vault", sub: "Encrypted Audit", icon: Cloud, box: "bg-sky-400/20 text-sky-300", on: false, glow: "" },
                    ].map((n, idx) => (
                      <motion.div key={n.title}
                        animate={n.red && n.on ? { x: [0, -4, 4, -3, 0] } : { x: 0 }}
                        transition={{ duration: 0.4, delay: n.red && n.on ? 0.9 : 0 }}
                        style={{ top: top(idx), width: "30%" }}
                        className={`absolute right-[1.5%] z-10 flex -translate-y-1/2 items-center gap-1.5 rounded-xl px-1.5 py-1.5 backdrop-blur transition-all duration-300 sm:gap-2 sm:px-2 ${n.on ? `scale-[1.06] ${n.glow}` : n.red ? "bg-red-500/10 ring-1 ring-red-400/30" : "bg-white/[0.06] ring-1 ring-white/10"}`}>
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${n.box}`}>
                          <n.icon className="h-3.5 w-3.5" strokeWidth={n.icon === Cloud ? 2 : 3} />
                        </span>
                        <div className="min-w-0 leading-tight">
                          <div className="truncate text-[10px] font-bold text-white">{n.title}</div>
                          <div className={`truncate text-[8px] ${n.red ? "text-red-300" : "text-slate-400"}`}>{n.sub}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-col justify-between gap-2.5 border-t border-white/10 bg-black/20 p-3 md:border-l md:border-t-0">
                  <div className="relative overflow-hidden rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-2.5 text-center">
                    <motion.span className="absolute inset-0 bg-gradient-to-t from-emerald-400/20 to-transparent" animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 2.6, repeat: Infinity }} />
                    <div className="relative mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.6)]">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="relative mt-1 text-[11px] font-bold leading-tight text-emerald-200">All Systems<br />Protected</div>
                    <div className="relative mt-0.5 text-[8.5px] font-medium text-emerald-300/80">Zero data breaches</div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-2 ring-1 ring-white/10">
                    <TrendingUp className="h-4 w-4 shrink-0 text-rose-400" />
                    <div className="leading-tight">
                      <div className="text-[8.5px] text-slate-400">Threats Blocked</div>
                      <motion.div key={blocked} initial={{ y: -8, opacity: 0, scale: 1.3 }} animate={{ y: 0, opacity: 1, scale: 1 }} className="text-sm font-extrabold text-white">{blocked}</motion.div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white/[0.06] p-2 ring-1 ring-white/10">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 shrink-0 text-cyan-300" />
                      <div className="leading-tight">
                        <div className="text-[8.5px] text-slate-400">Flows Inspected</div>
                        <div className="text-sm font-extrabold text-white">{flows}K</div>
                      </div>
                    </div>
                    <div className="mt-1.5 flex h-6 items-end gap-[2px]">
                      {bars.map((h, k) => (
                        <motion.span key={k} className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500 to-cyan-300" animate={{ height: `${h}%` }} transition={{ type: "spring", stiffness: 120, damping: 14 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event ticker */}
              <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-2 text-[10px] text-slate-300">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`h-2 w-2 shrink-0 animate-pulse rounded-full ${cur.status === "blocked" ? "bg-rose-500 shadow-[0_0_10px_#f43f5e]" : "bg-emerald-400 shadow-[0_0_10px_#34d399]"}`} />
                  <span className="truncate font-mono text-[9.5px]"><Typed text={cur.eventLog} /></span>
                </div>
                <span className="ml-2 shrink-0 text-[9px] font-semibold text-cyan-300">REAL-TIME</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User,
//   Bot,
//   Monitor,
//   Check,
//   X,
//   Cloud,
//   LayoutDashboard,
//   Search,
//   ShieldCheck,
//   FileText,
//   Settings,
//   Bell,
//   TrendingUp,
//   BarChart3,
//   MonitorSmartphone,
//   Clock,
//   Lock,
//   Sparkles,
//   AlertTriangle,
// } from "lucide-react";
// import { LogoMark } from "./Logo";

// type Scenario = {
//   id: string;
//   label: string;
//   status: "blocked" | "allowed";
//   banner: string;
//   eventLog: string;
//   activeSource: "employee" | "ai" | "local";
//   activeDest: "approved" | "external" | "cloud";
// };

// const scenarios: Scenario[] = [
//   {
//     id: "leak",
//     label: "Exfiltration Blocked",
//     status: "blocked",
//     banner: "Blocked: API Secret → External LLM",
//     eventLog: "POLICY #04 • Redacted AWS_SECRET_KEY in ChatGPT Desktop prompt",
//     activeSource: "ai",
//     activeDest: "external",
//   },
//   {
//     id: "safe",
//     label: "Safe Copilot Sync",
//     status: "allowed",
//     banner: "Verified: Least-Privilege Context",
//     eventLog: "POLICY #01 • Approved sanitized Q4 summary for Work Apps",
//     activeSource: "employee",
//     activeDest: "approved",
//   },
//   {
//     id: "mcp",
//     label: "MCP Quarantine",
//     status: "blocked",
//     banner: "Blocked: DROP TABLE via MCP",
//     eventLog: "POLICY #02 • Quarantined unvetted postgres-mcp write call",
//     activeSource: "local",
//     activeDest: "external",
//   },
// ];

// const sideIcons = [
//   { icon: LayoutDashboard, label: "Overview", active: true },
//   { icon: Search, label: "Investigate" },
//   { icon: ShieldCheck, label: "Policies" },
//   { icon: FileText, label: "Audit Logs" },
//   { icon: Settings, label: "Settings" },
// ];

// export function DashboardPreview() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [blockedCount, setBlockedCount] = useState(24);
//   const [flowsCount, setFlowsCount] = useState(12.8);

//   const current = scenarios[activeIndex];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => {
//         const next = (prev + 1) % scenarios.length;
//         if (scenarios[next].status === "blocked") {
//           setBlockedCount((c) => c + 1);
//         }
//         setFlowsCount((f) => Number((f + 0.1).toFixed(1)));
//         return next;
//       });
//     }, 3400);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative mx-auto w-full max-w-[780px]">
//       {/* Ambient Outer Aura */}
//       <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-indigo-500/20 via-sky-400/15 to-violet-500/25 blur-2xl" />

//       <div className="relative overflow-hidden rounded-2xl border border-indigo-200/80 bg-white shadow-[0_28px_70px_-15px_rgba(15,23,42,0.22)]">
//         {/* Top Browser / App Bar */}
//         <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-2.5">
//           <div className="flex items-center gap-2">
//             <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
//             <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
//             <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
//             <span className="ml-2 hidden items-center gap-1.5 rounded-md border border-slate-200/80 bg-white px-2.5 py-0.5 text-[10px] font-medium text-slate-500 sm:inline-flex">
//               <Lock className="h-2.5 w-2.5 text-emerald-500" />
//               app.traceagentrix.io/live-mesh
//             </span>
//           </div>

//           {/* Interactive Scenario Switcher Pills */}
//           <div className="flex items-center gap-1 rounded-lg bg-slate-200/60 p-0.5">
//             {scenarios.map((sc, idx) => (
//               <button
//                 key={sc.id}
//                 onClick={() => setActiveIndex(idx)}
//                 className={`rounded-md px-2 py-1 text-[9.5px] font-semibold transition-all ${activeIndex === idx
//                     ? "bg-[#0B1437] text-white shadow-sm"
//                     : "text-slate-600 hover:text-slate-900"
//                   }`}
//               >
//                 {sc.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="flex">
//           {/* Dark Enterprise Sidebar */}
//           <div className="hidden w-[118px] shrink-0 flex-col justify-between bg-[#080E2B] px-2.5 py-4 text-white sm:flex">
//             <div>
//               <div className="mb-5 flex items-center gap-2 px-1.5">
//                 <LogoMark className="h-7 w-6 shrink-0" />
//                 <span className="text-[11px] font-bold tracking-tight text-white">
//                   TraceAgentrix
//                 </span>
//               </div>
//               <div className="space-y-1">
//                 {sideIcons.map((s) => (
//                   <div
//                     key={s.label}
//                     className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] font-medium transition ${s.active
//                         ? "bg-gradient-to-r from-indigo-600/40 to-indigo-500/10 text-white ring-1 ring-indigo-400/30"
//                         : "text-slate-400 hover:text-slate-200"
//                       }`}
//                   >
//                     <s.icon className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
//                     {s.label}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
//               <div className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-400">
//                 <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
//                 Endpoint Agent v2.4
//               </div>
//               <p className="mt-1 text-[8.5px] leading-tight text-slate-400">
//                 124 devices synced • Zero latency
//               </p>
//             </div>
//           </div>

//           {/* Main Dashboard Body */}
//           <div className="min-w-0 flex-1">
//             {/* Sub Header */}
//             <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-2.5">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-bold text-slate-900">
//                   Real-Time AI Data Mesh
//                 </span>
//                 <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600 ring-1 ring-emerald-200/70">
//                   <span className="relative flex h-1.5 w-1.5">
//                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//                     <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
//                   </span>
//                   Enforcing
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="hidden items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[9.5px] font-medium text-slate-500 md:inline-flex">
//                   <Clock className="h-3 w-3 text-slate-400" /> Live Stream
//                 </span>
//                 <Bell className="h-3.5 w-3.5 text-slate-400" />
//                 <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[9px] font-bold text-white">
//                   TA
//                 </span>
//               </div>
//             </div>

//             {/* Canvas + Right Metrics */}
//             <div className="grid grid-cols-1 md:grid-cols-[1fr_165px]">
//               {/* Interactive Mesh Graph */}
//               <div className="relative h-[305px] overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:16px_16px] p-3">
//                 {/* Dynamic Top Status Pill */}
//                 <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={current.id}
//                       initial={{ opacity: 0, y: -6, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 6, scale: 0.95 }}
//                       transition={{ duration: 0.25 }}
//                       className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-semibold text-white shadow-md ${current.status === "blocked"
//                           ? "bg-gradient-to-r from-rose-600 to-red-500 shadow-red-500/25"
//                           : "bg-gradient-to-r from-emerald-600 to-teal-500 shadow-emerald-500/25"
//                         }`}
//                     >
//                       {current.status === "blocked" ? (
//                         <AlertTriangle className="h-3 w-3" />
//                       ) : (
//                         <Sparkles className="h-3 w-3" />
//                       )}
//                       {current.banner}
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 {/* High-Precision SVG Paths & Packets */}
//                 <svg
//                   viewBox="0 0 460 280"
//                   className="pointer-events-none absolute inset-0 h-full w-full"
//                 >
//                   <defs>
//                     <linearGradient id="beamIndigo" x1="0" y1="0" x2="1" y2="0">
//                       <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
//                       <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.9" />
//                     </linearGradient>
//                     <linearGradient id="beamEmerald" x1="0" y1="0" x2="1" y2="0">
//                       <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
//                       <stop offset="100%" stopColor="#34D399" stopOpacity="0.35" />
//                     </linearGradient>
//                   </defs>

//                   {/* Left Source Curves */}
//                   <path
//                     id="mesh-src-1"
//                     d="M 134 62 C 180 62, 180 140, 200 140"
//                     fill="none"
//                     stroke="url(#beamIndigo)"
//                     strokeWidth={current.activeSource === "employee" ? "2.4" : "1.4"}
//                   />
//                   <path
//                     id="mesh-src-2"
//                     d="M 134 140 L 200 140"
//                     fill="none"
//                     stroke="url(#beamIndigo)"
//                     strokeWidth={current.activeSource === "ai" ? "2.4" : "1.4"}
//                   />
//                   <path
//                     id="mesh-src-3"
//                     d="M 134 218 C 180 218, 180 140, 200 140"
//                     fill="none"
//                     stroke="url(#beamIndigo)"
//                     strokeWidth={current.activeSource === "local" ? "2.4" : "1.4"}
//                   />

//                   {/* Right Destination Curves */}
//                   <path
//                     id="mesh-dst-ok1"
//                     d="M 260 140 C 282 140, 282 62, 326 62"
//                     fill="none"
//                     stroke="url(#beamEmerald)"
//                     strokeWidth={current.activeDest === "approved" ? "2.4" : "1.4"}
//                   />
//                   <path
//                     id="mesh-dst-bad"
//                     d="M 260 140 L 326 140"
//                     fill="none"
//                     stroke="#EF4444"
//                     strokeWidth={current.activeDest === "external" ? "2.4" : "1.5"}
//                     strokeDasharray="5 4"
//                   />
//                   <path
//                     id="mesh-dst-ok2"
//                     d="M 260 140 C 282 140, 282 218, 326 218"
//                     fill="none"
//                     stroke="url(#beamEmerald)"
//                     strokeWidth="1.4"
//                   />

//                   {/* True-Circle Glowing Data Packets */}
//                   <circle r="4" fill="#4F46E5">
//                     <animateMotion dur="2s" repeatCount="indefinite">
//                       <mpath href="#mesh-src-1" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="4.5" fill="#6366F1">
//                     <animateMotion dur="1.6s" begin="0.4s" repeatCount="indefinite">
//                       <mpath href="#mesh-src-2" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="4" fill="#4F46E5">
//                     <animateMotion dur="2.2s" begin="0.9s" repeatCount="indefinite">
//                       <mpath href="#mesh-src-3" />
//                     </animateMotion>
//                   </circle>

//                   {/* Safe Packets */}
//                   <circle r="4" fill="#10B981">
//                     <animateMotion dur="1.8s" begin="0.5s" repeatCount="indefinite">
//                       <mpath href="#mesh-dst-ok1" />
//                     </animateMotion>
//                   </circle>
//                   <circle r="4" fill="#10B981">
//                     <animateMotion dur="2.1s" begin="1.1s" repeatCount="indefinite">
//                       <mpath href="#mesh-dst-ok2" />
//                     </animateMotion>
//                   </circle>

//                   {/* Blocked Packet Stopping Before External Node */}
//                   <circle r="4.5" fill="#EF4444">
//                     <animateMotion
//                       dur="1.7s"
//                       repeatCount="indefinite"
//                       keyPoints="0;0.74;0.74;0"
//                       keyTimes="0;0.55;0.85;1"
//                       calcMode="linear"
//                     >
//                       <mpath href="#mesh-dst-bad" />
//                     </animateMotion>
//                   </circle>
//                 </svg>

//                 {/* LEFT NODES */}
//                 <div className="relative z-10 flex h-full flex-col justify-between py-6">
//                   {[
//                     {
//                       id: "employee",
//                       icon: User,
//                       title: "Employee",
//                       sub: "Browser & SaaS",
//                     },
//                     {
//                       id: "ai",
//                       icon: Bot,
//                       title: "AI Agents",
//                       sub: "Claude, Copilot",
//                     },
//                     {
//                       id: "local",
//                       icon: Monitor,
//                       title: "Local MCPs",
//                       sub: "CLI & Local DB",
//                     },
//                   ].map((node) => {
//                     const isActive = current.activeSource === node.id;
//                     return (
//                       <div
//                         key={node.id}
//                         className={`flex w-[126px] items-center gap-2.5 rounded-xl bg-white/95 px-2.5 py-2 backdrop-blur transition-all duration-300 ${isActive
//                             ? "scale-[1.03] shadow-md shadow-indigo-500/15 ring-2 ring-indigo-500/60"
//                             : "shadow-sm ring-1 ring-slate-200/80"
//                           }`}
//                       >
//                         <div
//                           className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isActive
//                               ? "bg-indigo-600 text-white"
//                               : "bg-indigo-50 text-indigo-600"
//                             }`}
//                         >
//                           <node.icon className="h-3.5 w-3.5" />
//                         </div>
//                         <div className="min-w-0 leading-tight">
//                           <div className="truncate text-[10.5px] font-bold text-slate-800">
//                             {node.title}
//                           </div>
//                           <div className="truncate text-[8.5px] text-slate-500">
//                             {node.sub}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* CENTER POLICY ENGINE HUB */}
//                 <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
//                   <motion.div
//                     animate={{
//                       boxShadow: [
//                         "0 12px 30px rgba(11,20,55,0.35), 0 0 0 0px rgba(99,102,241,0.4)",
//                         "0 12px 30px rgba(11,20,55,0.35), 0 0 0 12px rgba(99,102,241,0)",
//                       ],
//                     }}
//                     transition={{ duration: 2.2, repeat: Infinity }}
//                     className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#132054] to-[#080E2B] text-white ring-2 ring-indigo-400/60"
//                   >
//                     <LogoMark className="h-7 w-6" />
//                     <span className="mt-1 text-[7.5px] font-bold tracking-wide text-indigo-100">
//                       Policy Engine
//                     </span>
//                   </motion.div>
//                 </div>

//                 {/* RIGHT DESTINATION NODES */}
//                 <div className="absolute right-3 top-0 z-10 flex h-full flex-col justify-between py-6">
//                   {/* Approved */}
//                   <div
//                     className={`flex w-[126px] items-center gap-2.5 rounded-xl bg-white/95 px-2.5 py-2 backdrop-blur transition-all duration-300 ${current.activeDest === "approved"
//                         ? "scale-[1.03] shadow-md shadow-emerald-500/15 ring-2 ring-emerald-500/60"
//                         : "shadow-sm ring-1 ring-slate-200/80"
//                       }`}
//                   >
//                     <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
//                       <Check className="h-3.5 w-3.5" strokeWidth={3} />
//                     </span>
//                     <div className="min-w-0 leading-tight">
//                       <div className="truncate text-[10.5px] font-bold text-slate-800">
//                         Approved
//                       </div>
//                       <div className="truncate text-[8.5px] text-slate-500">
//                         Sanctioned Apps
//                       </div>
//                     </div>
//                   </div>

//                   {/* External (Blocked) */}
//                   <motion.div
//                     animate={
//                       current.status === "blocked"
//                         ? { x: [0, -3, 3, -2, 0] }
//                         : { x: 0 }
//                     }
//                     transition={{ duration: 0.4 }}
//                     className={`flex w-[126px] items-center gap-2.5 rounded-xl px-2.5 py-2 transition-all duration-300 ${current.status === "blocked"
//                         ? "bg-red-50/95 shadow-md shadow-red-500/15 ring-2 ring-red-400"
//                         : "bg-red-50/70 ring-1 ring-red-200"
//                       }`}
//                   >
//                     <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500 text-white">
//                       <X className="h-3.5 w-3.5" strokeWidth={3} />
//                     </span>
//                     <div className="min-w-0 leading-tight">
//                       <div className="truncate text-[10.5px] font-bold text-slate-800">
//                         External
//                       </div>
//                       <div className="truncate text-[8.5px] text-red-600">
//                         Unvetted / Leak
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Cloud Storage */}
//                   <div className="flex w-[126px] items-center gap-2.5 rounded-xl bg-white/95 px-2.5 py-2 shadow-sm ring-1 ring-slate-200/80 backdrop-blur">
//                     <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-600">
//                       <Cloud className="h-3.5 w-3.5" />
//                     </span>
//                     <div className="min-w-0 leading-tight">
//                       <div className="truncate text-[10.5px] font-bold text-slate-800">
//                         Enterprise Vault
//                       </div>
//                       <div className="truncate text-[8.5px] text-slate-500">
//                         Encrypted Audit
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Metrics Sidebar */}
//               <div className="flex flex-col justify-between border-t border-slate-100 bg-slate-50/70 p-3.5 md:border-l md:border-t-0">
//                 <div className="rounded-xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50 to-white p-3 text-center shadow-sm">
//                   <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
//                     <ShieldCheck className="h-5 w-5" />
//                   </div>
//                   <div className="mt-1.5 text-[11px] font-bold leading-tight text-emerald-800">
//                     All Systems
//                     <br />
//                     Protected
//                   </div>
//                   <div className="mt-0.5 text-[8.5px] font-medium text-emerald-600">
//                     Zero data breaches
//                   </div>
//                 </div>

//                 <div className="mt-3 space-y-2.5">
//                   <div className="flex items-center gap-2.5 rounded-lg bg-white p-2 ring-1 ring-slate-100">
//                     <TrendingUp className="h-4 w-4 shrink-0 text-rose-500" />
//                     <div className="leading-tight">
//                       <div className="text-[8.5px] text-slate-500">
//                         Threats Blocked
//                       </div>
//                       <div className="text-sm font-extrabold text-slate-900">
//                         {blockedCount}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2.5 rounded-lg bg-white p-2 ring-1 ring-slate-100">
//                     <BarChart3 className="h-4 w-4 shrink-0 text-indigo-500" />
//                     <div className="leading-tight">
//                       <div className="text-[8.5px] text-slate-500">
//                         Flows Inspected
//                       </div>
//                       <div className="text-sm font-extrabold text-slate-900">
//                         {flowsCount}K
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2.5 rounded-lg bg-white p-2 ring-1 ring-slate-100">
//                     <MonitorSmartphone className="h-4 w-4 shrink-0 text-violet-500" />
//                     <div className="leading-tight">
//                       <div className="text-[8.5px] text-slate-500">
//                         Active Monitors
//                       </div>
//                       <div className="text-sm font-extrabold text-slate-900">
//                         8
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Live Policy Event Ticker */}
//             <div className="flex items-center justify-between border-t border-slate-100 bg-[#080E2B] px-4 py-2 text-[10px] text-slate-300">
//               <div className="flex items-center gap-2 truncate">
//                 <span
//                   className={`h-2 w-2 shrink-0 rounded-full ${current.status === "blocked" ? "bg-rose-500" : "bg-emerald-400"
//                     }`}
//                 />
//                 <AnimatePresence mode="wait">
//                   <motion.span
//                     key={current.id}
//                     initial={{ opacity: 0, x: 8 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -8 }}
//                     transition={{ duration: 0.25 }}
//                     className="truncate font-mono text-[9.5px]"
//                   >
//                     {current.eventLog}
//                   </motion.span>
//                 </AnimatePresence>
//               </div>
//               <span className="ml-2 shrink-0 text-[9px] font-semibold text-indigo-300">
//                 REAL-TIME
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }