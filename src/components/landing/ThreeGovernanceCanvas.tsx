"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
    motion, AnimatePresence, useInView, useReducedMotion, useScroll, useSpring,
} from "framer-motion";
import {
    Bot, FileText, Settings, UserCheck, User, BrainCircuit, Sparkles, FileCode2,
    ShieldCheck, Gauge, Check, X, ArrowUpRight, ScanSearch,
} from "lucide-react";

/* ---------- helpers ---------- */

function useLoop(n: number, ms: number, run: boolean) {
    const [s, setS] = useState(0);
    useEffect(() => {
        if (!run) return;
        const t = setInterval(() => setS((v) => (v + 1) % n), ms);
        return () => clearInterval(t);
    }, [n, ms, run]);
    return s;
}

function Scramble({ text, active }: { text: string; active: boolean }) {
    const [out, setOut] = useState(text);
    useEffect(() => {
        if (!active) return setOut(text);
        let i = 0;
        const set = "#%&*@$01234567";
        const t = setInterval(() => {
            i++;
            setOut(text.split("").map((c, k) => (k < i / 2 || c === " " ? c : set[Math.floor(Math.random() * set.length)])).join(""));
            if (i > text.length * 2) clearInterval(t);
        }, 35);
        return () => clearInterval(t);
    }, [text, active]);
    return <>{out}</>;
}

function Flow({ color = "#818cf8", delay = 0 }) {
    const reduce = useReducedMotion();
    return (
        <div className="relative h-px w-full min-w-[40px] flex-1 bg-white/15 max-md:h-8 max-md:w-px max-md:flex-none">
            {!reduce && (
                <motion.span
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 16px 4px ${color}` }}
                    animate={{ left: ["-5%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay }}
                />
            )}
        </div>
    );
}

const glass = "relative z-10 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]";

type Accent = { rgb: string; text: string };

function Panel({
    no, eyebrow, title, text, accent, children,
}: {
    no: number; eyebrow: string; title: string; text: string; accent: Accent;
    children: (live: boolean) => React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const live = useInView(ref, { margin: "-80px" });
    const once = useInView(ref, { once: true, margin: "-60px" });
    const reduce = useReducedMotion();

    const spot = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={once ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[32px] p-px"
        >
            {/* rotating gradient border */}
            <motion.div
                className="absolute -inset-[60%]"
                style={{ background: `conic-gradient(from 0deg, transparent 0 60%, rgba(${accent.rgb},0.9) 80%, transparent 100%)` }}
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            <div
                onMouseMove={spot}
                className="relative rounded-[31px] bg-[#0A1030] p-6 sm:p-10"
                style={{ backgroundImage: `radial-gradient(520px circle at var(--x,80%) var(--y,0%), rgba(${accent.rgb},0.16), transparent 60%)` }}
            >
                <div className="grid items-center gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
                    <div>
                        <div className="flex items-center gap-3">
                            <span
                                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                                style={{ background: `rgb(${accent.rgb})`, boxShadow: `0 0 24px rgba(${accent.rgb},0.7)` }}
                            >
                                {no}
                            </span>
                            <p className={`text-sm font-semibold ${accent.text}`}>{eyebrow}</p>
                        </div>
                        <h3 className="mt-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl">
                            {title}
                        </h3>
                        <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{text}</p>
                    </div>
                    <div>{children(live)}</div>
                </div>
            </div>
        </motion.div>
    );
}

const A = {
    indigo: { rgb: "99,102,241", text: "text-indigo-300" },
    cyan: { rgb: "34,211,238", text: "text-cyan-300" },
    emerald: { rgb: "52,211,153", text: "text-emerald-300" },
};

/* ---------- root ---------- */

export function ThreeGovernanceCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);
    const wrap = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 70%", "end 60%"] });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

    useEffect(() => {
        const el = mountRef.current;
        if (!el) return;
        const scene = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
        cam.position.z = 11;
        const ren = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        ren.setSize(el.clientWidth, el.clientHeight);
        ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        el.appendChild(ren.domElement);

        const N = 140;
        const pos = new Float32Array(N * 3);
        for (let i = 0; i < N * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 26;
            pos[i + 1] = (Math.random() - 0.5) * 18;
            pos[i + 2] = (Math.random() - 0.5) * 8;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xa5b4fc, size: 0.09, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
        const seg: number[] = [];
        for (let a = 0; a < N; a++)
            for (let b = a + 1; b < N; b++) {
                const dx = pos[a * 3] - pos[b * 3], dy = pos[a * 3 + 1] - pos[b * 3 + 1], dz = pos[a * 3 + 2] - pos[b * 3 + 2];
                if (dx * dx + dy * dy + dz * dz < 7) seg.push(pos[a * 3], pos[a * 3 + 1], pos[a * 3 + 2], pos[b * 3], pos[b * 3 + 1], pos[b * 3 + 2]);
            }
        const lg = new THREE.BufferGeometry();
        lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
        const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.22 }));
        const grp = new THREE.Group();
        grp.add(pts, lines);
        scene.add(grp);

        let mx = 0, my = 0;
        const move = (e: PointerEvent) => { mx = (e.clientX / innerWidth - 0.5) * 0.6; my = (e.clientY / innerHeight - 0.5) * 0.4; };
        const resize = () => { cam.aspect = el.clientWidth / el.clientHeight; cam.updateProjectionMatrix(); ren.setSize(el.clientWidth, el.clientHeight); };
        addEventListener("pointermove", move);
        addEventListener("resize", resize);
        const clock = new THREE.Clock();
        let raf = 0;
        const tick = () => {
            raf = requestAnimationFrame(tick);
            const t = reduce ? 0 : clock.getElapsedTime();
            grp.rotation.y += (mx + t * 0.02 - grp.rotation.y) * 0.04;
            grp.rotation.x += (my - grp.rotation.x) * 0.04;
            ren.render(scene, cam);
        };
        tick();
        return () => {
            cancelAnimationFrame(raf);
            removeEventListener("pointermove", move);
            removeEventListener("resize", resize);
            g.dispose(); lg.dispose(); ren.dispose();
            if (ren.domElement.parentNode === el) el.removeChild(ren.domElement);
        };
    }, [reduce]);

    return (
        <section className="relative overflow-hidden bg-[#050818] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
            {/* aurora blobs */}
            {!reduce && (
                <>
                    <motion.div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-indigo-600/30 blur-[120px]" animate={{ x: [0, 120, 0], y: [0, 80, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
                    <motion.div className="pointer-events-none absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full bg-cyan-500/20 blur-[130px]" animate={{ x: [0, -100, 0], y: [0, 120, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
                    <motion.div className="pointer-events-none absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-fuchsia-600/20 blur-[120px]" animate={{ x: [0, 90, 0], y: [0, -90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
                </>
            )}
            <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div ref={mountRef} className="pointer-events-none absolute inset-0 h-full w-full" />

            <div className="relative z-10 mx-auto max-w-[1180px]">
                {/* headline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto mb-16 max-w-3xl text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-200 backdrop-blur">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400" />
                            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        AI governance, running live
                    </span>
                    <h2 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-7xl">
                        <span className="bg-[linear-gradient(110deg,#fff,#a5b4fc,#67e8f9,#fff)] bg-[length:250%_100%] bg-clip-text text-transparent [animation:shine_6s_linear_infinite]">
                            Know. Adapt. Protect.
                        </span>
                    </h2>
                    <p className="mt-5 text-lg text-slate-300">
                        See every AI interaction, respond to risk in real time and prove it to auditors.
                    </p>
                </motion.div>

                {/* cards + scroll progress rail */}
                <div ref={wrap} className="relative">
                    <div className="absolute -left-5 bottom-0 top-0 hidden w-px bg-white/10 xl:block">
                        <motion.div className="w-full origin-top bg-gradient-to-b from-indigo-400 via-cyan-400 to-emerald-400 shadow-[0_0_14px_#22d3ee]" style={{ scaleY: progress, height: "100%" }} />
                    </div>
                    <div className="space-y-10">
                        <Know />
                        <Adapt />
                        <Protect />
                    </div>
                </div>
            </div>

            <style>{`@keyframes shine{to{background-position:-250% 0}}`}</style>
        </section>
    );
}

/* ---------- 1. KNOW ---------- */

const knowRows = [
    { icon: FileText, label: "Personal identifier", tag: "SSN", s: "border-rose-400/40 bg-rose-500/15 text-rose-200" },
    { icon: Settings, label: "Customer data", tag: "Account number", s: "border-sky-400/40 bg-sky-500/15 text-sky-200" },
    { icon: UserCheck, label: "Personal data", tag: "Name", s: "border-indigo-400/40 bg-indigo-500/15 text-indigo-200" },
];

function Know() {
    return (
        <Panel no={1} eyebrow="See the data" title="Know" accent={A.indigo}
            text="Discover and classify data across cloud, endpoint and SaaS, reclassify it the moment AI transforms it, and inventory every AI touchpoint: sanctioned apps, shadow tools, browser extensions and OAuth grants.">
            {(live) => <KnowScene live={live} />}
        </Panel>
    );
}

function KnowScene({ live }: { live: boolean }) {
    const step = useLoop(5, 1500, live);
    const [hover, setHover] = useState<number | null>(null);
    const found = (i: number) => step > i || step === 4;
    const mark = (i: number, c: string) => `rounded px-1 transition-all duration-500 ${found(i) ? c : ""}`;
    return (
        <div className="space-y-5">
            <div className="flex flex-col items-center gap-5 md:flex-row md:gap-2">
                <div className={`${glass} w-full max-w-[230px] overflow-hidden`}>
                    <div className="text-sm font-bold text-white">Employee prompt</div>
                    <div className="relative mt-3 space-y-1.5 text-[13px] text-slate-200">
                        <p className="text-slate-400">Summarize this customer:</p>
                        <p>Name: <span className={mark(0, "bg-indigo-500/40 text-white")}>John Doe</span></p>
                        <p>SSN: <span className={`font-mono ${mark(1, "bg-rose-500/40 text-white shadow-[0_0_14px_rgba(244,63,94,0.7)]")}`}>123-45-6789</span></p>
                        <p>Account <span className={mark(2, "bg-sky-500/40 text-white")}>987654</span></p>
                        {live && step > 0 && step < 4 && (
                            <motion.div
                                key={step}
                                className="pointer-events-none absolute inset-x-[-16px] h-7 bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent"
                                initial={{ top: `${(step - 1) * 26}%` }}
                                animate={{ top: `${step * 26}%` }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                        )}
                    </div>
                </div>

                <Flow color="#fb923c" />

                <div className="relative z-10 flex flex-col items-center">
                    <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-100">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400" />
                            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        AI app detected
                    </span>
                    <motion.div
                        animate={live ? { y: [0, -6, 0], boxShadow: ["0 0 0 0 rgba(251,146,60,0)", "0 0 40px 6px rgba(251,146,60,0.45)", "0 0 0 0 rgba(251,146,60,0)"] } : {}}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur"
                    >
                        <Bot className="h-9 w-9 text-white" strokeWidth={1.6} />
                        <span className="mt-1 text-xs font-bold text-white">ChatGPT</span>
                    </motion.div>
                    <span className="mt-3 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-300 ring-1 ring-orange-400/40">Unsanctioned</span>
                </div>

                <Flow color="#818cf8" delay={0.7} />

                <div className={`${glass} w-full max-w-[280px]`}>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                        <ScanSearch className="h-4 w-4 text-cyan-300" /> Sensitive data found
                    </div>
                    <div className="mt-3 space-y-2">
                        {knowRows.map((r, i) => {
                            const Icon = r.icon;
                            const on = hover === i || found(i === 0 ? 1 : i === 1 ? 2 : 0);
                            return (
                                <motion.div
                                    key={r.label}
                                    onMouseEnter={() => setHover(i)}
                                    onMouseLeave={() => setHover(null)}
                                    animate={{ opacity: on ? 1 : 0.25, x: on ? 0 : 14, scale: on ? 1 : 0.97 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] hover:bg-white/5"
                                >
                                    <span className="flex items-center gap-2 text-slate-200"><Icon className="h-4 w-4 text-slate-400" />{r.label}</span>
                                    <span className={`rounded border px-2 py-0.5 text-[11px] font-semibold ${r.s}`}>{r.tag}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <motion.div
                animate={{ opacity: step === 4 ? 1 : 0.5, scale: step === 4 ? 1 : 0.99 }}
                className="flex items-center justify-between rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm"
            >
                <span className="flex items-center gap-2 font-medium text-emerald-200">
                    <Check className="h-4 w-4" /> Data classified. Visibility created before anything is sent.
                </span>
                <span className="hidden font-semibold text-emerald-300 sm:inline">Real-time</span>
            </motion.div>
        </div>
    );
}

/* ---------- 2. ADAPT ---------- */

const signals = [
    { icon: User, label: "User", value: "Employee", c: "text-sky-300" },
    { icon: BrainCircuit, label: "Identity type", value: "AI agent", c: "text-indigo-300" },
    { icon: Sparkles, label: "Tool", value: "Claude (sanctioned)", c: "text-orange-300" },
    { icon: FileCode2, label: "Action", value: "Write to external app", c: "text-slate-200" },
];
const policies = [
    { icon: User, title: "User permissions", sub: "Employee (standard)" },
    { icon: Gauge, title: "Tool risk", sub: "Sanctioned (lower risk)" },
    { icon: FileText, title: "Data sensitivity", sub: "Contains customer PII (high)" },
    { icon: Settings, title: "Action type", sub: "Write action (requires approval)" },
];

function Adapt() {
    return (
        <Panel no={2} eyebrow="Adjust to risk" title="Adapt" accent={A.cyan}
            text="Restrict autonomous agents to least-privilege access, tighten controls when behavior indicates a risk, and respond in real time to stop data from leaking.">
            {(live) => <AdaptScene live={live} />}
        </Panel>
    );
}

function AdaptScene({ live }: { live: boolean }) {
    const step = useLoop(6, 1100, live);
    const [hover, setHover] = useState<number | null>(null);
    const cur = hover ?? Math.min(step, 3);
    return (
        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-3">
            <div className="w-full max-w-[210px] space-y-2.5">
                {signals.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div
                            key={s.label}
                            onMouseEnter={() => setHover(i)}
                            onMouseLeave={() => setHover(null)}
                            animate={{ scale: i === cur ? 1.05 : 1, opacity: i <= cur ? 1 : 0.45 }}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 backdrop-blur transition-colors ${i === cur ? "border-cyan-300/70 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.35)]" : "border-white/10 bg-white/[0.05]"}`}
                        >
                            <Icon className={`h-5 w-5 shrink-0 ${s.c}`} />
                            <div className="leading-tight">
                                <div className="text-[11px] text-slate-400">{s.label}</div>
                                <div className="text-[13px] font-bold text-white">{s.value}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <Flow color="#22d3ee" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative flex h-32 w-32 items-center justify-center">
                    <motion.span className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-300/60" animate={live ? { rotate: 360 } : {}} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
                    <motion.span className="absolute inset-3 rounded-full border border-emerald-300/40" animate={live ? { rotate: -360 } : {}} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                    <motion.span className="absolute inset-5 rounded-full bg-cyan-400/25 blur-md" animate={live ? { scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] } : {}} transition={{ duration: 2.4, repeat: Infinity }} />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-[#0A1030] shadow-[0_0_40px_rgba(34,211,238,0.5)]">
                        <ShieldCheck className="h-10 w-10 text-cyan-200" />
                    </div>
                </div>
                <p className="mt-3 text-sm font-bold leading-tight text-white">Analyze context<br />and risk in real time</p>
            </div>

            <Flow color="#34d399" delay={0.5} />

            <div className={`${glass} w-full max-w-[270px]`}>
                <div className="text-sm font-bold text-white">Policy applied automatically</div>
                <div className="mt-3 space-y-2">
                    {policies.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={p.title}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(null)}
                                animate={{ opacity: i <= cur ? 1 : 0.4 }}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-colors ${i === cur ? "border-cyan-300/60 bg-cyan-400/10" : "border-white/5 bg-white/[0.03]"}`}
                            >
                                <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
                                <div className="flex-1 leading-tight">
                                    <div className="text-xs font-bold text-white">{p.title}</div>
                                    <div className="text-[11px] text-slate-400">{p.sub}</div>
                                </div>
                                {(i < cur || step >= 4) && <Check className="h-4 w-4 text-emerald-400" />}
                            </motion.div>
                        );
                    })}
                </div>
                <AnimatePresence>
                    {step >= 4 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: 8 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-2 text-xs font-bold text-white shadow-[0_0_24px_rgba(99,102,241,0.6)]"
                        >
                            Decision: require approval
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ---------- 3. PROTECT ---------- */

const actions = [
    { title: "Allow", sub: "Safe policy", icon: Check, c: "emerald" },
    { title: "Redact", sub: "Remove, then continue", icon: Check, c: "indigo" },
    { title: "Block", sub: "Stop the transfer", icon: X, c: "orange" },
    { title: "Escalate", sub: "Route to a human", icon: ArrowUpRight, c: "fuchsia" },
];
const actStyle: Record<string, string> = {
    emerald: "border-emerald-400/50 bg-emerald-500/10 text-emerald-100",
    indigo: "border-indigo-400/60 bg-indigo-500/15 text-indigo-100",
    orange: "border-orange-400/50 bg-orange-500/10 text-orange-100",
    fuchsia: "border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-100",
};
const audit = [
    { label: "Who", a: "jane.smith@acme.com", b: "employee" },
    { label: "What", a: "Prompt to ChatGPT", b: "Contained SSN" },
    { label: "Policy", a: "PII Protection Policy", b: "Redact SSN" },
    { label: "Result", a: "Redacted", b: "Prompt continued", res: true },
];

function Protect() {
    return (
        <Panel no={3} eyebrow="Enforce and audit" title="Protect" accent={A.emerald}
            text="Allow safe AI use, enforce policies with API controls and on-device enforcement, and create audit trails for regulators.">
            {(live) => <ProtectScene live={live} />}
        </Panel>
    );
}

function ProtectScene({ live }: { live: boolean }) {
    const step = useLoop(7, 1000, live);
    const [hover, setHover] = useState<number | null>(null);
    const redacted = step >= 2;
    const auditCount = Math.max(0, step - 2);
    const act = hover ?? (step >= 1 ? 1 : -1);
    return (
        <div className="space-y-5">
            <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className={`${glass} w-full max-w-[200px]`}>
                    <div className="text-xs font-bold text-white">Original prompt</div>
                    <div className="mt-2 space-y-1 text-xs text-slate-200">
                        <p className="text-slate-400">Summarize this customer:</p>
                        <p>Name: John Doe</p>
                        <p>SSN: <span className="rounded bg-rose-500/30 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-rose-100">123-45-6789</span></p>
                        <p>Account 987654</p>
                    </div>
                </div>

                <Flow color="#fb923c" />

                <div className="relative z-10 flex flex-col items-center">
                    <span className="mb-2 text-xs font-bold text-white">Action: Redact</span>
                    <motion.div
                        animate={redacted ? { scale: [1, 1.25, 1], boxShadow: ["0 0 0 0 rgba(251,146,60,0)", "0 0 44px 8px rgba(251,146,60,0.6)", "0 0 0 0 rgba(251,146,60,0)"] } : {}}
                        transition={{ duration: 0.8 }}
                        key={String(redacted)}
                        className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-orange-300/60 bg-[#0A1030]"
                    >
                        <FileText className="h-7 w-7 text-orange-200" />
                    </motion.div>
                </div>

                <Flow color="#34d399" delay={0.4} />

                <motion.div
                    animate={{ borderColor: redacted ? "rgba(52,211,153,0.7)" : "rgba(255,255,255,0.1)", boxShadow: redacted ? "0 0 36px rgba(52,211,153,0.3)" : "0 0 0 rgba(0,0,0,0)" }}
                    className={`${glass} w-full max-w-[200px]`}
                >
                    <div className="text-xs font-bold text-white">Prompt sent to ChatGPT</div>
                    <div className="mt-2 space-y-1 text-xs text-slate-200">
                        <p className="text-slate-400">Summarize this customer:</p>
                        <p>Name: John Doe</p>
                        <p>SSN: <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold transition-colors duration-500 ${redacted ? "bg-emerald-500/30 text-emerald-100" : "bg-rose-500/30 text-rose-100"}`}>
                            <Scramble text={redacted ? "[REDACTED]" : "123-45-6789"} active={step === 2} />
                        </span></p>
                        <p>Account 987654</p>
                    </div>
                </motion.div>

                <div className="relative z-10 w-full max-w-[180px] space-y-2">
                    {actions.map((a, i) => {
                        const Icon = a.icon;
                        const on = act === i;
                        return (
                            <motion.div
                                key={a.title}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(null)}
                                animate={{ scale: on ? 1.06 : 1, opacity: on ? 1 : 0.5 }}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 ${actStyle[a.c]} ${on ? "shadow-[0_0_24px_rgba(129,140,248,0.45)]" : ""}`}
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                                    <Icon className="h-3.5 w-3.5" strokeWidth={3} />
                                </span>
                                <div className="leading-tight">
                                    <div className="text-xs font-bold">{a.title}</div>
                                    <div className="text-[10px] opacity-75">{a.sub}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-2xl border border-cyan-300/25 bg-white/[0.05] p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                    Audit record <span className="text-xs font-normal text-slate-400">(always on)</span>
                    <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-cyan-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" /> recording
                    </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {audit.map((c, i) => (
                        <motion.div key={c.label} animate={{ opacity: i < auditCount ? 1 : 0.2, y: i < auditCount ? 0 : 8 }} transition={{ duration: 0.4 }}>
                            <div className="text-xs font-bold text-slate-100">{c.label}</div>
                            <div className={`text-xs ${c.res ? "font-bold text-emerald-300" : "text-slate-300"}`}>{c.a}</div>
                            <div className="text-xs text-slate-400">{c.b}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
// "use client";

// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     Eye,
//     Sliders,
//     ShieldCheck,
//     Check,
//     X,
//     Sparkles,
//     Bot,
//     FileText,
//     Settings,
//     UserCheck,
//     User,
//     BrainCircuit,
//     FileCode2,
//     Gauge,
//     ArrowUpRight,
// } from "lucide-react";

// const stages = [
//     {
//         id: 0,
//         tag: "SEE THE DATA",
//         title: "Know",
//         desc: "Discover and classify data across cloud, endpoint and SaaS, reclassify the moment AI transforms it and inventory every AI touchpoint: sanctioned apps, shadow tools, browser extensions and OAuth grants.",
//         icon: Eye,
//     },
//     {
//         id: 1,
//         tag: "ADJUST TO RISK",
//         title: "Adapt",
//         desc: "Restrict autonomous agents to least-privilege access, tighten controls when behavior indicates a risk and respond in real-time to prevent data from leaking.",
//         icon: Sliders,
//     },
//     {
//         id: 2,
//         tag: "ENFORCE AND AUDIT",
//         title: "Protect",
//         desc: "Allow safe AI use, enforce policies with API controls and on-device enforcement and create audit trails for regulators.",
//         icon: ShieldCheck,
//     },
// ];

// export function ThreeGovernanceCanvas() {
//     const mountRef = useRef<HTMLDivElement>(null);
//     const activeStageRef = useRef(0);
//     const [activeStage, setActiveStage] = useState(0);

//     useEffect(() => {
//         activeStageRef.current = activeStage;
//     }, [activeStage]);

//     // Auto-cycle every 6s (pauses if user clicks manually)
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setActiveStage((prev) => (prev + 1) % 3);
//         }, 6000);
//         return () => clearInterval(timer);
//     }, []);

//     useEffect(() => {
//         const container = mountRef.current;
//         if (!container) return;

//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(
//             45,
//             container.clientWidth / container.clientHeight,
//             0.1,
//             100
//         );
//         camera.position.set(0, 1.2, 9.5);

//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(container.clientWidth, container.clientHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//         container.appendChild(renderer.domElement);

//         // 3D Cyber Grid Floor
//         const grid = new THREE.GridHelper(26, 32, 0x312e81, 0x1e1b4b);
//         grid.position.y = -2.4;
//         (grid.material as THREE.Material).transparent = true;
//         (grid.material as THREE.Material).opacity = 0.35;
//         scene.add(grid);

//         // Center 3D Wireframe Policy Ring Behind Cards
//         const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
//         const ringMat = new THREE.MeshBasicMaterial({
//             color: 0x6366f1,
//             transparent: true,
//             opacity: 0.32,
//         });
//         const ring1 = new THREE.Mesh(ringGeo, ringMat);
//         ring1.position.set(1.5, 0, -1.5);
//         scene.add(ring1);

//         const ring2 = new THREE.Mesh(
//             new THREE.TorusGeometry(2.6, 0.015, 16, 100),
//             new THREE.MeshBasicMaterial({
//                 color: 0x38bdf8,
//                 transparent: true,
//                 opacity: 0.22,
//             })
//         );
//         ring2.position.set(1.5, 0, -1.8);
//         scene.add(ring2);

//         // 3D Flowing Data Stream Curves Behind HUD Cards
//         const streamCurves = [
//             new THREE.CatmullRomCurve3([
//                 new THREE.Vector3(-2.5, 0.8, -0.5),
//                 new THREE.Vector3(1.2, 0.2, -0.3),
//                 new THREE.Vector3(4.8, 0.9, -0.5),
//             ]),
//             new THREE.CatmullRomCurve3([
//                 new THREE.Vector3(-2.5, 0, -0.5),
//                 new THREE.Vector3(1.2, 0, -0.2),
//                 new THREE.Vector3(4.8, 0, -0.5),
//             ]),
//             new THREE.CatmullRomCurve3([
//                 new THREE.Vector3(-2.5, -0.8, -0.5),
//                 new THREE.Vector3(1.2, -0.2, -0.3),
//                 new THREE.Vector3(4.8, -0.9, -0.5),
//             ]),
//         ];

//         const packets: {
//             mesh: THREE.Mesh;
//             curve: THREE.CatmullRomCurve3;
//             speed: number;
//             offset: number;
//         }[] = [];

//         streamCurves.forEach((curve, idx) => {
//             const line = new THREE.Line(
//                 new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
//                 new THREE.LineBasicMaterial({
//                     color: 0x6366f1,
//                     transparent: true,
//                     opacity: 0.28,
//                 })
//             );
//             scene.add(line);

//             const pkt = new THREE.Mesh(
//                 new THREE.SphereGeometry(0.08, 12, 12),
//                 new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
//             );
//             scene.add(pkt);
//             packets.push({
//                 mesh: pkt,
//                 curve,
//                 speed: 0.32 + idx * 0.04,
//                 offset: idx * 0.33,
//             });
//         });

//         // Floating 3D Particles
//         const count = 220;
//         const pos = new Float32Array(count * 3);
//         for (let i = 0; i < count * 3; i += 3) {
//             pos[i] = (Math.random() - 0.5) * 20;
//             pos[i + 1] = (Math.random() - 0.5) * 10;
//             pos[i + 2] = (Math.random() - 0.5) * 8 - 1;
//         }
//         const starGeo = new THREE.BufferGeometry();
//         starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
//         const stars = new THREE.Points(
//             starGeo,
//             new THREE.PointsMaterial({
//                 color: 0x818cf8,
//                 size: 0.045,
//                 transparent: true,
//                 opacity: 0.65,
//             })
//         );
//         scene.add(stars);

//         let mx = 0;
//         let my = 0;
//         const onMove = (e: MouseEvent) => {
//             const r = container.getBoundingClientRect();
//             mx = ((e.clientX - r.left) / r.width) * 2 - 1;
//             my = -((e.clientY - r.top) / r.height) * 2 + 1;
//         };
//         container.addEventListener("mousemove", onMove);

//         const onResize = () => {
//             if (!container) return;
//             camera.aspect = container.clientWidth / container.clientHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(container.clientWidth, container.clientHeight);
//         };
//         window.addEventListener("resize", onResize);

//         const clock = new THREE.Clock();
//         let raf = 0;
//         const animate = () => {
//             raf = requestAnimationFrame(animate);
//             const t = clock.getElapsedTime();
//             const s = activeStageRef.current;

//             const hex = s === 0 ? 0x38bdf8 : s === 1 ? 0x818cf8 : 0x34d399;
//             ringMat.color.setHex(hex);

//             ring1.rotation.z = t * 0.35;
//             ring1.rotation.x = Math.sin(t * 0.4) * 0.3;
//             ring2.rotation.z = -t * 0.25;
//             ring2.rotation.y = Math.cos(t * 0.35) * 0.3;
//             stars.rotation.y = t * 0.025;

//             camera.position.x += (mx * 0.45 - camera.position.x) * 0.05;
//             camera.position.y += (1.2 + my * 0.25 - camera.position.y) * 0.05;
//             camera.lookAt(0, 0, 0);

//             packets.forEach((p) => {
//                 (p.mesh.material as THREE.MeshBasicMaterial).color.setHex(hex);
//                 const prog = (t * p.speed + p.offset) % 1;
//                 p.mesh.position.copy(p.curve.getPointAt(prog));
//             });

//             renderer.render(scene, camera);
//         };
//         animate();

//         return () => {
//             cancelAnimationFrame(raf);
//             container.removeEventListener("mousemove", onMove);
//             window.removeEventListener("resize", onResize);
//             renderer.dispose();
//             if (renderer.domElement.parentNode === container) {
//                 container.removeChild(renderer.domElement);
//             }
//         };
//     }, []);

//     const current = stages[activeStage];

//     return (
//         <section className="relative overflow-hidden bg-[#050B24] py-24 text-white">
//             <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(79,70,229,0.22),transparent_65%)]" />

//             <div className="relative z-10 mx-auto max-w-[1260px] px-6 lg:px-10">
//                 {/* Header */}
//                 <div className="mx-auto max-w-2xl text-center">
//                     <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1 text-xs font-bold tracking-wider text-indigo-300">
//                         <Sparkles className="h-3.5 w-3.5" /> DATA-AWARE AI GOVERNANCE
//                     </span>
//                     <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
//                         Know. Adapt. Protect.
//                     </h2>
//                 </div>

//                 {/* Stage Switcher Tabs */}
//                 <div className="mt-8 flex flex-wrap justify-center gap-3">
//                     {stages.map((st, idx) => {
//                         const Icon = st.icon;
//                         const active = activeStage === idx;
//                         return (
//                             <button
//                                 key={st.id}
//                                 type="button"
//                                 onClick={() => setActiveStage(idx)}
//                                 className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all ${active
//                                         ? "bg-white text-[#0B1437] shadow-[0_0_25px_rgba(129,140,248,0.55)]"
//                                         : "border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
//                                     }`}
//                             >
//                                 <Icon className="h-4 w-4 text-indigo-500" />
//                                 <span>
//                                     0{idx + 1}. {st.title}
//                                 </span>
//                             </button>
//                         );
//                     })}
//                 </div>

//                 {/* 3D Three.js Canvas + Labeled Interactive Cards Overlay */}
//                 <div className="relative mt-10 min-h-[460px] overflow-hidden rounded-3xl border border-white/15 bg-[#070E2B]/85 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
//                     {/* Live Three.js WebGL Layer */}
//                     <div
//                         ref={mountRef}
//                         className="pointer-events-auto absolute inset-0 h-full w-full"
//                     />

//                     {/* Foreground Labeled Interactive Flow (Matches Reference Screenshots) */}
//                     <div className="relative z-10 flex min-h-[460px] items-center p-7 sm:p-12">
//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={current.id}
//                                 initial={{ opacity: 0, y: 16 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -16 }}
//                                 transition={{ duration: 0.35 }}
//                                 className="grid w-full items-center gap-10 lg:grid-cols-[310px_1fr]"
//                             >
//                                 {/* Left Stage Explanation */}
//                                 <div>
//                                     <span className="text-xs font-bold tracking-widest text-sky-400">
//                                         {current.tag}
//                                     </span>
//                                     <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
//                                         {current.title}
//                                     </h3>
//                                     <p className="mt-4 text-sm leading-relaxed text-slate-300">
//                                         {current.desc}
//                                     </p>
//                                 </div>

//                                 {/* ===================================================
//                     STAGE 0: KNOW (Labeled Employee -> ChatGPT -> Sensitive Data)
//                 =================================================== */}
//                                 {activeStage === 0 && (
//                                     <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
//                                         {/* Connecting Animated Lines */}
//                                         <svg
//                                             viewBox="0 0 540 160"
//                                             className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
//                                         >
//                                             <line
//                                                 id="k-l1"
//                                                 x1="205"
//                                                 y1="80"
//                                                 x2="275"
//                                                 y2="80"
//                                                 stroke="rgba(148,163,184,0.45)"
//                                                 strokeWidth="1.5"
//                                                 strokeDasharray="4 4"
//                                             />
//                                             <line
//                                                 id="k-l2"
//                                                 x1="355"
//                                                 y1="80"
//                                                 x2="420"
//                                                 y2="80"
//                                                 stroke="rgba(148,163,184,0.45)"
//                                                 strokeWidth="1.5"
//                                                 strokeDasharray="4 4"
//                                             />
//                                             <circle r="4" fill="#fb923c">
//                                                 <animateMotion dur="1.6s" repeatCount="indefinite">
//                                                     <mpath href="#k-l1" />
//                                                 </animateMotion>
//                                             </circle>
//                                             <circle r="4" fill="#38bdf8">
//                                                 <animateMotion dur="1.6s" begin="0.7s" repeatCount="indefinite">
//                                                     <mpath href="#k-l2" />
//                                                 </animateMotion>
//                                             </circle>
//                                         </svg>

//                                         {/* Employee Prompt Card */}
//                                         <div className="relative z-10 w-full max-w-[225px] rounded-2xl border border-white/15 bg-[#0C163D]/90 p-4 shadow-xl backdrop-blur-md">
//                                             <div className="text-xs font-bold text-white">
//                                                 Employee
//                                             </div>
//                                             <p className="mt-1.5 text-[11px] text-slate-400">
//                                                 Summarize this customer:
//                                             </p>
//                                             <p className="mt-1 text-[11px] font-medium text-slate-200">
//                                                 Name: John Doe
//                                             </p>
//                                             <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
//                                                 <span className="text-slate-300">SSN:</span>
//                                                 <span className="rounded bg-rose-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-rose-300 ring-1 ring-rose-400/30">
//                                                     123-45-6789
//                                                 </span>
//                                             </div>
//                                             <p className="mt-1.5 text-[11px] font-medium text-slate-200">
//                                                 Account 987654
//                                             </p>
//                                         </div>

//                                         {/* Center AI App Detected Node */}
//                                         <div className="relative z-10 flex flex-col items-center">
//                                             <span className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
//                                                 <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
//                                                 AI app detected
//                                             </span>
//                                             <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-indigo-400/40 bg-[#101C4D]/95 shadow-[0_0_30px_rgba(99,102,241,0.3)] backdrop-blur-md">
//                                                 <Bot className="h-7 w-7 text-white" />
//                                                 <span className="mt-1 text-[10px] font-bold text-white">
//                                                     ChatGPT
//                                                 </span>
//                                             </div>
//                                             <span className="mt-2 rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-0.5 text-[10px] font-bold text-orange-300">
//                                                 Unsanctioned
//                                             </span>
//                                         </div>

//                                         {/* Sensitive Data Found Card */}
//                                         <div className="relative z-10 w-full max-w-[255px] rounded-2xl border border-white/15 bg-[#0C163D]/90 p-4 shadow-xl backdrop-blur-md">
//                                             <div className="text-xs font-bold text-white">
//                                                 Sensitive data found
//                                             </div>
//                                             <div className="mt-3 space-y-2.5">
//                                                 <div className="flex items-center justify-between gap-2 text-[11px]">
//                                                     <span className="flex items-center gap-2 text-slate-300">
//                                                         <FileText className="h-3.5 w-3.5 text-indigo-400" />
//                                                         Personal identifier
//                                                     </span>
//                                                     <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
//                                                         SSN
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between gap-2 text-[11px]">
//                                                     <span className="flex items-center gap-2 text-slate-300">
//                                                         <Settings className="h-3.5 w-3.5 text-sky-400" />
//                                                         Customer data
//                                                     </span>
//                                                     <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
//                                                         Account number
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between gap-2 text-[11px]">
//                                                     <span className="flex items-center gap-2 text-slate-300">
//                                                         <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
//                                                         Personal data
//                                                     </span>
//                                                     <span className="rounded bg-indigo-500/25 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
//                                                         Name
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* ===================================================
//                     STAGE 1: ADAPT (Labeled Context -> Risk Shield -> Policy)
//                 =================================================== */}
//                                 {activeStage === 1 && (
//                                     <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
//                                         {/* Left 4 Context Pills */}
//                                         <div className="relative z-10 w-full max-w-[205px] space-y-2.5">
//                                             {[
//                                                 { icon: User, label: "User", val: "Employee" },
//                                                 {
//                                                     icon: BrainCircuit,
//                                                     label: "Identity type",
//                                                     val: "AI agent",
//                                                 },
//                                                 {
//                                                     icon: Sparkles,
//                                                     label: "Tool",
//                                                     val: "Claude (sanctioned)",
//                                                 },
//                                                 {
//                                                     icon: FileCode2,
//                                                     label: "Action",
//                                                     val: "Write to external app",
//                                                 },
//                                             ].map((c) => (
//                                                 <div
//                                                     key={c.label}
//                                                     className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-[#0C163D]/90 px-3 py-2 backdrop-blur-md"
//                                                 >
//                                                     <c.icon className="h-4 w-4 shrink-0 text-sky-400" />
//                                                     <div className="leading-tight">
//                                                         <div className="text-[9.5px] text-slate-400">
//                                                             {c.label}
//                                                         </div>
//                                                         <div className="text-[11px] font-bold text-white">
//                                                             {c.val}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>

//                                         {/* Center Pulsing Risk Analyzer */}
//                                         <div className="relative z-10 flex flex-col items-center text-center">
//                                             <motion.div
//                                                 animate={{
//                                                     boxShadow: [
//                                                         "0 0 0 0px rgba(56,189,248,0.4)",
//                                                         "0 0 0 14px rgba(56,189,248,0)",
//                                                     ],
//                                                 }}
//                                                 transition={{ duration: 2, repeat: Infinity }}
//                                                 className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-sky-400/60 bg-[#101C4D]/95 backdrop-blur-md"
//                                             >
//                                                 <ShieldCheck className="h-8 w-8 text-sky-300" />
//                                             </motion.div>
//                                             <p className="mt-2.5 text-[11px] font-bold leading-tight text-slate-200">
//                                                 Analyze context
//                                                 <br />
//                                                 and risk in real time
//                                             </p>
//                                         </div>

//                                         {/* Right Policy Applied Automatically */}
//                                         <div className="relative z-10 w-full max-w-[255px] rounded-2xl border border-white/15 bg-[#0C163D]/90 p-4 shadow-xl backdrop-blur-md">
//                                             <div className="text-xs font-bold text-white">
//                                                 Policy applied automatically
//                                             </div>
//                                             <div className="mt-3 space-y-2">
//                                                 {[
//                                                     {
//                                                         icon: User,
//                                                         top: "User permissions",
//                                                         sub: "Employee (standard)",
//                                                     },
//                                                     {
//                                                         icon: Gauge,
//                                                         top: "Tool risk",
//                                                         sub: "Sanctioned (lower risk)",
//                                                     },
//                                                     {
//                                                         icon: FileText,
//                                                         top: "Data sensitivity",
//                                                         sub: "Contains customer PII (high)",
//                                                     },
//                                                     {
//                                                         icon: Settings,
//                                                         top: "Action type",
//                                                         sub: "Write action (requires approval)",
//                                                     },
//                                                 ].map((r) => (
//                                                     <div
//                                                         key={r.top}
//                                                         className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5"
//                                                     >
//                                                         <r.icon className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
//                                                         <div className="leading-tight">
//                                                             <div className="text-[10px] font-bold text-slate-200">
//                                                                 {r.top}
//                                                             </div>
//                                                             <div className="text-[9.5px] text-slate-400">
//                                                                 {r.sub}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* ===================================================
//                     STAGE 2: PROTECT (Original -> Action: Redact -> Sanitized + Audit)
//                 =================================================== */}
//                                 {activeStage === 2 && (
//                                     <div className="space-y-5">
//                                         <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
//                                             {/* Original Prompt */}
//                                             <div className="w-full max-w-[185px] rounded-2xl border border-white/15 bg-[#0C163D]/90 p-3.5 backdrop-blur-md">
//                                                 <div className="text-[11px] font-bold text-white">
//                                                     Original prompt
//                                                 </div>
//                                                 <p className="mt-1 text-[10px] text-slate-400">
//                                                     Summarize this customer:
//                                                 </p>
//                                                 <p className="mt-1 text-[10px] text-slate-200">
//                                                     Name: John Doe
//                                                 </p>
//                                                 <div className="mt-1 flex items-center gap-1 text-[10px]">
//                                                     <span className="text-slate-300">SSN:</span>
//                                                     <span className="rounded bg-rose-500/20 px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-rose-300">
//                                                         123-45-6789
//                                                     </span>
//                                                 </div>
//                                                 <p className="mt-1 text-[10px] text-slate-200">
//                                                     Account 987654
//                                                 </p>
//                                             </div>

//                                             {/* Center Action: Redact */}
//                                             <div className="flex flex-col items-center">
//                                                 <span className="mb-1.5 text-[11px] font-bold text-orange-300">
//                                                     Action: Redact
//                                                 </span>
//                                                 <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-400/50 bg-[#101C4D]/95">
//                                                     <FileText className="h-6 w-6 text-orange-300" />
//                                                 </div>
//                                             </div>

//                                             {/* Prompt Sent to ChatGPT */}
//                                             <div className="w-full max-w-[185px] rounded-2xl border border-emerald-400/35 bg-[#0C163D]/90 p-3.5 backdrop-blur-md">
//                                                 <div className="text-[11px] font-bold text-white">
//                                                     Prompt sent to ChatGPT
//                                                 </div>
//                                                 <p className="mt-1 text-[10px] text-slate-400">
//                                                     Summarize this customer:
//                                                 </p>
//                                                 <p className="mt-1 text-[10px] text-slate-200">
//                                                     Name: John Doe
//                                                 </p>
//                                                 <div className="mt-1 flex items-center gap-1 text-[10px]">
//                                                     <span className="text-slate-300">SSN:</span>
//                                                     <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-emerald-300">
//                                                         [REDACTED]
//                                                     </span>
//                                                 </div>
//                                                 <p className="mt-1 text-[10px] text-slate-200">
//                                                     Account 987654
//                                                 </p>
//                                             </div>

//                                             {/* 4 Policy Enforcement Pills */}
//                                             <div className="w-full max-w-[165px] space-y-2">
//                                                 <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1.5">
//                                                     <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
//                                                         <Check className="h-2.5 w-2.5" strokeWidth={3} />
//                                                     </span>
//                                                     <div className="leading-tight">
//                                                         <div className="text-[10px] font-bold text-emerald-300">
//                                                             Allow
//                                                         </div>
//                                                         <div className="text-[8.5px] text-slate-300">
//                                                             Safe Policy
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex items-center gap-2 rounded-xl border-2 border-indigo-400 bg-indigo-500/20 px-2.5 py-1.5">
//                                                     <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-white">
//                                                         <Check className="h-2.5 w-2.5" strokeWidth={3} />
//                                                     </span>
//                                                     <div className="leading-tight">
//                                                         <div className="text-[10px] font-bold text-white">
//                                                             Redact
//                                                         </div>
//                                                         <div className="text-[8.5px] text-indigo-200">
//                                                             Remove, then continue
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex items-center gap-2 rounded-xl border border-orange-400/30 bg-orange-500/10 px-2.5 py-1.5">
//                                                     <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white">
//                                                         <X className="h-2.5 w-2.5" strokeWidth={3} />
//                                                     </span>
//                                                     <div className="leading-tight">
//                                                         <div className="text-[10px] font-bold text-orange-300">
//                                                             Block
//                                                         </div>
//                                                         <div className="text-[8.5px] text-slate-300">
//                                                             Stop the transfer
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex items-center gap-2 rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 px-2.5 py-1.5">
//                                                     <span className="flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-500 text-white">
//                                                         <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={3} />
//                                                     </span>
//                                                     <div className="leading-tight">
//                                                         <div className="text-[10px] font-bold text-fuchsia-300">
//                                                             Escalate
//                                                         </div>
//                                                         <div className="text-[8.5px] text-slate-300">
//                                                             Route to a human
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Immutable Audit Record Strip */}
//                                         <div className="rounded-2xl border border-sky-400/30 bg-[#0C163D]/90 p-3.5 backdrop-blur-md">
//                                             <div className="text-[11px] font-bold text-white">
//                                                 Audit record{" "}
//                                                 <span className="font-normal text-slate-400">
//                                                     (always on)
//                                                 </span>
//                                             </div>
//                                             <div className="mt-2.5 grid grid-cols-2 gap-3 sm:grid-cols-4">
//                                                 <div>
//                                                     <div className="text-[10px] font-bold text-slate-200">
//                                                         Who
//                                                     </div>
//                                                     <div className="text-[9.5px] text-slate-400">
//                                                         jane.smith@acme.com • employee
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-[10px] font-bold text-slate-200">
//                                                         What
//                                                     </div>
//                                                     <div className="text-[9.5px] text-slate-400">
//                                                         Prompt to ChatGPT • Contained SSN
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-[10px] font-bold text-slate-200">
//                                                         Policy
//                                                     </div>
//                                                     <div className="text-[9.5px] text-slate-400">
//                                                         PII Protection Policy • Redact SSN
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-[10px] font-bold text-slate-200">
//                                                         Result
//                                                     </div>
//                                                     <div className="text-[9.5px] font-semibold text-emerald-400">
//                                                         Redacted • Prompt continued
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }