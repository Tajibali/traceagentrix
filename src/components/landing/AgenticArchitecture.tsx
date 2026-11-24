"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useInView, useReducedMotion } from "framer-motion";
import {
    Database, Code2, FileSpreadsheet, KeyRound, Bot, AppWindow, Terminal,
    Sparkles, Check, Ban, UserCheck, ShieldCheck, Activity,
} from "lucide-react";
import { LogoMark } from "@/components/landing/Logo";

/* ---------- scenario data (viewBox 560 x 380) ---------- */

const W = 560, H = 380, HUB = { x: 280, y: 190 };
const srcY = [55, 150, 245, 335];
const dstY = [70, 190, 310];

const sources = [
    { icon: Database, label: "Customer Data" },
    { icon: Code2, label: "Source Code" },
    { icon: FileSpreadsheet, label: "Financial Models" },
    { icon: KeyRound, label: "API Secrets" },
];
const consumers = [
    { icon: Bot, label: "AI Assistant", sub: "Sanitized context", rgb: "52,211,153", text: "text-emerald-300" },
    { icon: AppWindow, label: "AI Application", sub: "Scoped permissions", rgb: "56,189,248", text: "text-sky-300" },
    { icon: Terminal, label: "Rogue Agent", sub: "Write action held", rgb: "251,113,133", text: "text-rose-300" },
];

type Verdict = "allow" | "redact" | "escalate" | "block";
const scenarios: { src: number; dst: number; v: Verdict; msg: string; log: string }[] = [
    { src: 0, dst: 0, v: "redact", msg: "Redacted 2 PII fields", log: "Customer Data → AI Assistant: SSN and email redacted" },
    { src: 1, dst: 1, v: "allow", msg: "Allowed, read-only", log: "Source Code → AI Application: scoped to read-only" },
    { src: 2, dst: 0, v: "escalate", msg: "Sent for human approval", log: "Financial Models → AI Assistant: routed to approver" },
    { src: 3, dst: 2, v: "block", msg: "Blocked secret exfiltration", log: "API Secrets → Rogue Agent: write action blocked" },
];
const vStyle: Record<Verdict, { c: string; rgb: string; icon: typeof Check }> = {
    allow: { c: "#38bdf8", rgb: "56,189,248", icon: Check },
    redact: { c: "#34d399", rgb: "52,211,153", icon: ShieldCheck },
    escalate: { c: "#fbbf24", rgb: "251,191,36", icon: UserCheck },
    block: { c: "#fb7185", rgb: "251,113,133", icon: Ban },
};

const bez = (p: number[][], t: number) => {
    const u = 1 - t;
    const f = (i: number) => u * u * u * p[0][i] + 3 * u * u * t * p[1][i] + 3 * u * t * t * p[2][i] + t * t * t * p[3][i];
    return { x: f(0), y: f(1) };
};
const inPts = (i: number) => [[150, srcY[i]], [200, srcY[i]], [190, HUB.y], [232, HUB.y]];
const outPts = (j: number) => [[328, HUB.y], [370, HUB.y], [370, dstY[j]], [410, dstY[j]]];
const pathD = (p: number[][]) => `M ${p[0]} C ${p[1]}, ${p[2]}, ${p[3]}`;

/* ---------- component ---------- */

export function AgenticArchitecture() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const live = useInView(ref, { margin: "-80px" });
    const [scn, setScn] = useState(0);
    const [run, setRun] = useState(0); // bump to restart on click
    const [pkt, setPkt] = useState<{ x: number; y: number; c: string; o: number } | null>(null);
    const [showV, setShowV] = useState(false);
    const [log, setLog] = useState<{ id: number; v: Verdict; text: string }[]>([]);
    const [count, setCount] = useState(1284392);
    const s = scenarios[scn];
    const vs = vStyle[s.v];

    // main animation loop
    useEffect(() => {
        if (!live) return;
        let dead = false;
        const sc = scenarios[scn];
        const col = vStyle[sc.v].c;
        (async () => {
            setShowV(false);
            const seg = (pts: number[][], dur: number, to: number, c: string) =>
                new Promise<void>((res) => {
                    animate(0, to, {
                        duration: reduce ? 0.01 : dur, ease: "easeInOut",
                        onUpdate: (t) => { if (!dead) { const p = bez(pts, t); setPkt({ ...p, c, o: 1 }); } },
                        onComplete: () => res(),
                    });
                });
            await seg(inPts(sc.src), 0.9, 1, "#818cf8");
            if (dead) return;
            setShowV(true);
            setLog((l) => [{ id: Date.now(), v: sc.v, text: sc.log }, ...l].slice(0, 3));
            await new Promise((r) => setTimeout(r, reduce ? 50 : 650));
            if (dead) return;
            await seg(outPts(sc.dst), 0.8, sc.v === "block" ? 0.7 : 1, col);
            if (dead) return;
            setPkt((p) => (p ? { ...p, o: 0 } : p));
            await new Promise((r) => setTimeout(r, reduce ? 800 : 1500));
            if (!dead) setScn((v) => (v + 1) % scenarios.length);
        })();
        return () => { dead = true; };
    }, [scn, run, live, reduce]);

    // live counter
    useEffect(() => {
        if (!live) return;
        const t = setInterval(() => setCount((c) => c + 1 + Math.floor(Math.random() * 6)), 600);
        return () => clearInterval(t);
    }, [live]);

    const pick = (i: number) => {
        setScn(scenarios.findIndex((x) => x.src === i));
        setRun((r) => r + 1);
    };

    return (
        <section ref={ref} className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-14">
                {/* ---------- copy ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="min-w-0"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-300">
                        <Sparkles className="h-3.5 w-3.5" /> AGENTIC ENTERPRISE GOVERNANCE
                    </span>
                    <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
                        Secure the AI{" "}
                        <span className="bg-[linear-gradient(110deg,#a5b4fc,#67e8f9,#c4b5fd,#a5b4fc)] bg-[length:250%_100%] bg-clip-text text-transparent [animation:shine_6s_linear_infinite]">
                            That Powers Your Business
                        </span>
                    </h2>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-300 sm:text-base">
                        AI assistants and autonomous agents have sweeping access to your most critical repositories. TraceAgentrix sits between your enterprise data and every AI consumer to enforce least-privilege access in milliseconds.
                    </p>

                    {/* live counter */}
                    <div className="mt-7 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur">
                        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                            <Activity className="h-5 w-5" />
                            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" />
                        </span>
                        <div>
                            <div className="font-mono text-2xl font-bold tabular-nums text-white">{count.toLocaleString("en-US")}</div>
                            <div className="text-xs text-slate-400">policy decisions enforced, live</div>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {[
                            { t: "MCP & CLI", d: "Tool-call inspection & human approval gates", c: "text-sky-300", g: "hover:shadow-[0_0_34px_rgba(56,189,248,0.35)] hover:border-sky-400/50" },
                            { t: "Zero-Leak DLP", d: "Real-time secret & PII redaction in prompts", c: "text-emerald-300", g: "hover:shadow-[0_0_34px_rgba(52,211,153,0.35)] hover:border-emerald-400/50" },
                        ].map((c) => (
                            <motion.div key={c.t} whileHover={{ y: -5 }} className={`rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all ${c.g}`}>
                                <div className={`text-xl font-extrabold ${c.c}`}>{c.t}</div>
                                <div className="mt-1 text-xs leading-snug text-slate-400">{c.d}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ---------- live diagram ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative min-w-0 overflow-hidden rounded-[28px] p-px shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
                >
                    <motion.div
                        className="absolute -inset-[60%]"
                        style={{ background: "conic-gradient(from 0deg, transparent 0 60%, rgba(99,102,241,0.9) 78%, rgba(34,211,238,0.9) 90%, transparent)" }}
                        animate={reduce ? {} : { rotate: 360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative rounded-[27px] bg-[#070D2B] p-4 sm:p-7">
                        <div className="mb-3 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2 font-semibold text-slate-200">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Live enforcement
                            </span>
                            <span className="text-slate-500">Tap a source to replay</span>
                        </div>

                        <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
                            <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full">
                                {sources.map((_, i) => (
                                    <path key={i} d={pathD(inPts(i))} fill="none" strokeWidth={s.src === i ? 2.2 : 1.2}
                                        stroke={s.src === i ? "rgba(165,180,252,0.9)" : "rgba(129,140,248,0.25)"} strokeDasharray="4 4" />
                                ))}
                                {consumers.map((c, j) => (
                                    <path key={j} d={pathD(outPts(j))} fill="none" strokeWidth={s.dst === j ? 2.4 : 1.4}
                                        stroke={s.dst === j ? vs.c : `rgba(${c.rgb},0.28)`} strokeDasharray={j === 2 ? "4 3" : undefined} />
                                ))}
                                {pkt && (
                                    <g opacity={pkt.o} style={{ transition: "opacity .3s" }}>
                                        <circle cx={pkt.x} cy={pkt.y} r="11" fill={pkt.c} opacity="0.25" />
                                        <circle cx={pkt.x} cy={pkt.y} r="5" fill={pkt.c} style={{ filter: `drop-shadow(0 0 8px ${pkt.c})` }} />
                                    </g>
                                )}
                                {showV && s.v === "block" && (
                                    <circle cx={outPts(s.dst)[0][0] + (410 - 328) * 0.62} cy={(HUB.y + dstY[s.dst]) / 2 + 28} r="6" fill="none" stroke="#fb7185" strokeWidth="2">
                                        <animate attributeName="r" values="6;26" dur="0.9s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="1;0" dur="0.9s" repeatCount="indefinite" />
                                    </circle>
                                )}
                            </svg>

                            {/* sources */}
                            {sources.map((n, i) => {
                                const Icon = n.icon;
                                const on = s.src === i;
                                return (
                                    <motion.button
                                        key={n.label}
                                        onClick={() => pick(i)}
                                        animate={{ scale: on ? 1.06 : 1, opacity: on ? 1 : 0.6 }}
                                        whileHover={{ opacity: 1 }}
                                        style={{ top: `${(srcY[i] / H) * 100}%`, width: "26%" }}
                                        className={`absolute left-0 flex -translate-y-1/2 items-center gap-1.5 rounded-xl border px-2 py-2 text-left text-[10px] font-medium text-slate-100 backdrop-blur sm:gap-2 sm:px-3 sm:text-xs ${on ? "border-indigo-300/70 bg-indigo-500/20 shadow-[0_0_26px_rgba(99,102,241,0.5)]" : "border-white/10 bg-[#0F1942]/90"}`}
                                    >
                                        <Icon className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
                                        <span className="truncate">{n.label}</span>
                                    </motion.button>
                                );
                            })}

                            {/* hub */}
                            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                                <motion.span
                                    className="absolute -inset-4 rounded-[28px] border border-dashed border-indigo-300/40"
                                    animate={reduce ? {} : { rotate: 360 }}
                                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    key={showV ? scn : "idle"}
                                    animate={showV ? { scale: [1, 1.14, 1], boxShadow: [`0 0 0 0 rgba(${vs.rgb},0.7)`, `0 0 0 26px rgba(${vs.rgb},0)`, `0 0 0 0 rgba(${vs.rgb},0)`] } : {}}
                                    transition={{ duration: 0.9 }}
                                    className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-indigo-300/60 bg-gradient-to-b from-indigo-600/40 to-[#0B1437] text-center backdrop-blur-md sm:h-[88px] sm:w-[88px]"
                                >
                                    <LogoMark className="h-6 w-5 sm:h-8 sm:w-7" />
                                    <span className="mt-1 text-[8.5px] font-bold text-white sm:text-[10px]">Policy Guard</span>
                                </motion.div>

                                <AnimatePresence>
                                    {showV && (
                                        <motion.div
                                            key={scn}
                                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            className="absolute left-1/2 top-full mt-3 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold text-white sm:text-xs"
                                            style={{ background: `rgba(${vs.rgb},0.9)`, boxShadow: `0 0 24px rgba(${vs.rgb},0.7)` }}
                                        >
                                            <vs.icon className="h-3 w-3" strokeWidth={3} /> {s.msg}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* consumers */}
                            {consumers.map((n, j) => {
                                const Icon = n.icon;
                                const on = s.dst === j && showV;
                                const blocked = on && s.v === "block";
                                return (
                                    <motion.div
                                        key={n.label}
                                        animate={{ scale: on ? 1.06 : 1, opacity: on || !showV ? 1 : 0.55, x: blocked ? [0, -5, 5, -4, 4, 0] : 0 }}
                                        transition={{ duration: blocked ? 0.5 : 0.3, delay: blocked ? 0.8 : 0 }}
                                        style={{ top: `${(dstY[j] / H) * 100}%`, width: "26%", background: `rgba(${n.rgb},0.1)`, borderColor: `rgba(${n.rgb},${on ? 0.9 : 0.35})`, boxShadow: on ? `0 0 28px rgba(${n.rgb},0.45)` : "none" }}
                                        className="absolute right-0 -translate-y-1/2 rounded-xl border p-2 backdrop-blur sm:p-2.5"
                                    >
                                        <div className={`flex items-center gap-1.5 text-[10px] font-bold sm:text-xs ${n.text}`}>
                                            <Icon className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{n.label}</span>
                                        </div>
                                        <p className="mt-0.5 truncate text-[9px] text-slate-400 sm:text-[10px]">{blocked ? "Action blocked" : n.sub}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* event log */}
                        <div className="mt-4 min-h-[88px] space-y-1.5 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-[10px] sm:text-[11px]">
                            <AnimatePresence initial={false}>
                                {log.map((l) => (
                                    <motion.div
                                        key={l.id}
                                        layout
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: vStyle[l.v].c, boxShadow: `0 0 8px ${vStyle[l.v].c}` }} />
                                        <span className="uppercase" style={{ color: vStyle[l.v].c }}>{l.v}</span>
                                        <span className="truncate text-slate-300">{l.text}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {log.length === 0 && <span className="text-slate-500">Waiting for the first AI request…</span>}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}