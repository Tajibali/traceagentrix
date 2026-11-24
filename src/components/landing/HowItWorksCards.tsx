"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Bot,
    FileText,
    Settings,
    UserCheck,
    User,
    BrainCircuit,
    Sparkles,
    FileCode2,
    ShieldCheck,
    Gauge,
    Check,
    X,
    ArrowUpRight,
} from "lucide-react";

const cardAnim = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55 },
};

export function HowItWorksCards() {
    // Active highlight step simulation (jaise screen recording mein auto/hovering focus hota hai)
    const [activeKnowStep, setActiveKnowStep] = useState(0);
    const [activeAdaptStep, setActiveAdaptStep] = useState(0);
    const [activeProtectStep, setActiveProtectStep] = useState(1); // Default to Redact

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveKnowStep((prev) => (prev + 1) % 3);
            setActiveAdaptStep((prev) => (prev + 1) % 4);
            setActiveProtectStep((prev) => (prev === 3 ? 0 : prev + 1));
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-gradient-to-b from-white via-slate-50/70 to-white px-6 py-24 lg:px-10">
            <div className="mx-auto max-w-[1200px]">
                {/* Section Header */}
                <motion.div {...cardAnim} className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50 px-3.5 py-1 text-xs font-bold tracking-wide text-indigo-700">
                        HOW IT WORKS
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B1437] sm:text-4xl">
                        Protect Every AI Interaction with a Data-Aware Approach
                    </h2>
                </motion.div>

                <div className="space-y-10">
                    {/* =========================================================
              CARD 1: KNOW (See the Data)
          ========================================================= */}
                    <motion.div
                        {...cardAnim}
                        className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/70 to-sky-50/40 p-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] sm:p-12"
                    >
                        <div className="grid items-center gap-10 lg:grid-cols-[310px_1fr]">
                            <div>
                                <p className="text-xs font-bold tracking-wide text-indigo-600">
                                    See the Data
                                </p>
                                <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-[#0B1437]">
                                    Know
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                    Discover and classify data across cloud, endpoint and SaaS,
                                    reclassify the moment AI transforms it and inventory every AI
                                    touchpoint: sanctioned apps, shadow tools, browser extensions
                                    and OAuth grants.
                                </p>
                            </div>

                            {/* Animated Interactive Flow */}
                            <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
                                <svg
                                    viewBox="0 0 560 180"
                                    className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
                                >
                                    <line
                                        x1="210"
                                        y1="90"
                                        x2="285"
                                        y2="90"
                                        stroke="#cbd5e1"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                    />
                                    <line
                                        x1="365"
                                        y1="90"
                                        x2="430"
                                        y2="90"
                                        stroke="#cbd5e1"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                    />
                                    <circle r="4" fill="#f97316">
                                        <animateMotion dur="1.8s" repeatCount="indefinite" path="M 210 90 L 285 90" />
                                    </circle>
                                    <circle r="4" fill="#6366f1">
                                        <animateMotion dur="1.8s" begin="0.8s" repeatCount="indefinite" path="M 365 90 L 430 90" />
                                    </circle>
                                </svg>

                                {/* Node 1 */}
                                <div
                                    className={`relative z-10 w-full max-w-[225px] rounded-2xl border bg-white p-4 transition-all duration-300 shadow-md ${activeKnowStep === 0 ? "border-indigo-500 ring-2 ring-indigo-500/20 scale-[1.02]" : "border-slate-200/80"
                                        }`}
                                >
                                    <div className="text-xs font-bold text-slate-800">Employee</div>
                                    <p className="mt-1.5 text-[11px] text-slate-500">Summarize this customer:</p>
                                    <p className="mt-1 text-[11px] font-medium text-slate-700">Name: John Doe</p>
                                    <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                                        <span className="text-slate-600">SSN:</span>
                                        <span className="rounded bg-rose-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-rose-600">
                                            123-45-6789
                                        </span>
                                    </div>
                                    <p className="mt-1 text-[11px] font-medium text-slate-700">Account 987654</p>
                                </div>

                                {/* Node 2 */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <span className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                                        <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                                        AI app detected
                                    </span>
                                    <div
                                        className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl border bg-white transition-all duration-300 ${activeKnowStep === 1 ? "border-orange-500 ring-2 ring-orange-500/20 shadow-lg" : "border-slate-200"
                                            }`}
                                    >
                                        <Bot className="h-7 w-7 text-slate-800" strokeWidth={1.7} />
                                        <span className="mt-1 text-[10px] font-bold text-slate-800">ChatGPT</span>
                                    </div>
                                    <span className="mt-2 rounded-full bg-orange-100 px-3 py-0.5 text-[10px] font-bold text-orange-600">
                                        Unsanctioned
                                    </span>
                                </div>

                                {/* Node 3 */}
                                <div
                                    className={`relative z-10 w-full max-w-[255px] rounded-2xl border bg-white p-4 transition-all duration-300 shadow-md ${activeKnowStep === 2 ? "border-emerald-500 ring-2 ring-emerald-500/20 scale-[1.02]" : "border-slate-200/80"
                                        }`}
                                >
                                    <div className="text-xs font-bold text-slate-800">Sensitive data found</div>
                                    <div className="mt-3 space-y-2.5">
                                        <div className="flex items-center justify-between gap-2 text-[11px]">
                                            <span className="flex items-center gap-2 text-slate-600">
                                                <FileText className="h-3.5 w-3.5 text-indigo-500" /> Personal identifier
                                            </span>
                                            <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-600">SSN</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 text-[11px]">
                                            <span className="flex items-center gap-2 text-slate-600">
                                                <Settings className="h-3.5 w-3.5 text-sky-500" /> Customer data
                                            </span>
                                            <span className="rounded bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">Account number</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 text-[11px]">
                                            <span className="flex items-center gap-2 text-slate-600">
                                                <UserCheck className="h-3.5 w-3.5 text-emerald-500" /> Personal data
                                            </span>
                                            <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">Name</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* =========================================================
              CARD 2: ADAPT (Adjust to Risk)
          ========================================================= */}
                    <motion.div
                        {...cardAnim}
                        className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/70 to-emerald-50/30 p-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] sm:p-12"
                    >
                        <div className="grid items-center gap-10 lg:grid-cols-[310px_1fr]">
                            <div>
                                <p className="text-xs font-bold tracking-wide text-indigo-600">
                                    Adjust to Risk
                                </p>
                                <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-[#0B1437]">
                                    Adapt
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                    Restrict autonomous agents to least-privilege access, tighten
                                    controls when behavior indicates a risk and respond in
                                    real-time to prevent data from leaking.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
                                {/* Left 4 Signals */}
                                <div className="relative z-10 w-full max-w-[195px] space-y-2.5">
                                    {[
                                        { icon: User, top: "User", val: "Employee", color: "text-sky-600" },
                                        { icon: BrainCircuit, top: "Identity type", val: "AI agent", color: "text-indigo-600" },
                                        { icon: Sparkles, top: "Tool", val: "Claude (sanctioned)", color: "text-orange-500" },
                                        { icon: FileCode2, top: "Action", val: "Write to external app", color: "text-slate-700" },
                                    ].map((item, idx) => (
                                        <div
                                            key={item.top}
                                            className={`flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2 transition-all duration-300 ${activeAdaptStep === idx ? "border-indigo-500 ring-2 ring-indigo-500/20 scale-[1.02]" : "border-slate-200/80"
                                                }`}
                                        >
                                            <item.icon className={`h-4 w-4 shrink-0 ${item.color}`} />
                                            <div className="leading-tight">
                                                <div className="text-[9.5px] text-slate-400">{item.top}</div>
                                                <div className="text-[11px] font-bold text-slate-800">{item.val}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Center Shield */}
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <motion.div
                                        animate={{
                                            boxShadow: [
                                                "0 0 0 0px rgba(16,185,129,0.28)",
                                                "0 0 0 14px rgba(16,185,129,0)",
                                            ],
                                        }}
                                        transition={{ duration: 2.2, repeat: Infinity }}
                                        className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-100 bg-white shadow-md"
                                    >
                                        <ShieldCheck className="h-8 w-8 text-[#0B1437]" />
                                    </motion.div>
                                    <p className="mt-2.5 text-[11px] font-bold leading-tight text-slate-800">
                                        Analyze context
                                        <br />
                                        and risk in real time
                                    </p>
                                </div>

                                {/* Right Policy Rules */}
                                <div className="relative z-10 w-full max-w-[245px] rounded-2xl border border-slate-200/90 bg-white p-4 shadow-md">
                                    <div className="text-xs font-bold text-slate-800">Policy applied automatically</div>
                                    <div className="mt-3 space-y-2">
                                        {[
                                            { icon: User, label: "User permissions", val: "Employee (standard)" },
                                            { icon: Gauge, label: "Tool risk", val: "Sanctioned (lower risk)" },
                                            { icon: FileText, label: "Data sensitivity", val: "Contains customer PII (high)" },
                                            { icon: Settings, label: "Action type", val: "Write action (requires approval)" },
                                        ].map((rule, idx) => (
                                            <div
                                                key={rule.label}
                                                className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 transition-all ${activeAdaptStep === idx ? "border-emerald-500 bg-emerald-50/60" : "border-slate-100 bg-slate-50/70"
                                                    }`}
                                            >
                                                <rule.icon className="h-3.5 w-3.5 shrink-0 text-indigo-600" />
                                                <div className="leading-tight">
                                                    <div className="text-[9.5px] font-semibold text-slate-700">{rule.label}</div>
                                                    <div className="text-[9px] text-slate-500">{rule.val}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* =========================================================
              CARD 3: PROTECT (Enforce and Audit)
          ========================================================= */}
                    <motion.div
                        {...cardAnim}
                        className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/40 p-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] sm:p-12"
                    >
                        <div className="grid items-start gap-10 lg:grid-cols-[310px_1fr]">
                            <div>
                                <p className="text-xs font-bold tracking-wide text-indigo-600">
                                    Enforce and Audit
                                </p>
                                <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-[#0B1437]">
                                    Protect
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                    Allow safe AI use, enforce policies with API controls and
                                    on-device enforcement and create audit trails for regulators.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="relative flex flex-col items-center justify-between gap-5 sm:flex-row">
                                    {/* Original Prompt */}
                                    <div className="relative z-10 w-full max-w-[185px] rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm">
                                        <div className="text-[11px] font-bold text-slate-800">Original prompt</div>
                                        <p className="mt-1 text-[10px] text-slate-500">Summarize this customer:</p>
                                        <p className="mt-1 text-[10px] text-slate-700">Name: John Doe</p>
                                        <div className="mt-1 flex items-center gap-1 text-[10px]">
                                            <span>SSN:</span>
                                            <span className="rounded bg-rose-100 px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-rose-600">
                                                123-45-6789
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[10px] text-slate-700">Account 987654</p>
                                    </div>

                                    {/* Center Redact Action */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <span className="mb-2 text-[11px] font-bold text-slate-800">Action: Redact</span>
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-100 bg-white shadow-sm">
                                            <FileText className="h-6 w-6 text-slate-700" />
                                        </div>
                                    </div>

                                    {/* Sanitized Prompt */}
                                    <div className="relative z-10 w-full max-w-[185px] rounded-2xl border border-emerald-200/80 bg-white p-3.5 shadow-sm">
                                        <div className="text-[11px] font-bold text-slate-800">Prompt sent to ChatGPT</div>
                                        <p className="mt-1 text-[10px] text-slate-500">Summarize this customer:</p>
                                        <p className="mt-1 text-[10px] text-slate-700">Name: John Doe</p>
                                        <div className="mt-1 flex items-center gap-1 text-[10px]">
                                            <span>SSN:</span>
                                            <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-emerald-700">
                                                [REDACTED]
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[10px] text-slate-700">Account 987654</p>
                                    </div>

                                    {/* 4 Policy Outcomes with active highlight */}
                                    <div className="relative z-10 w-full max-w-[165px] space-y-2">
                                        {[
                                            { title: "Allow", sub: "Safe Policy", color: "bg-emerald-50 text-emerald-800 ring-emerald-200", icon: Check, activeColor: "bg-emerald-500 text-white" },
                                            { title: "Redact", sub: "Remove, then continue", color: "bg-indigo-50 text-[#0B1437] ring-indigo-500/50", icon: Check, activeColor: "bg-[#0B1437] text-white" },
                                            { title: "Block", sub: "Stop the transfer", color: "bg-orange-50 text-orange-800 ring-orange-200", icon: X, activeColor: "bg-orange-500 text-white" },
                                            { title: "Escalate", sub: "Route to a human", color: "bg-fuchsia-50 text-fuchsia-900 ring-fuchsia-200", icon: ArrowUpRight, activeColor: "bg-fuchsia-600 text-white" },
                                        ].map((item, idx) => (
                                            <div
                                                key={item.title}
                                                className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 ring-1 transition-all ${item.color} ${activeProtectStep === idx ? "ring-2 scale-105 shadow-md" : "opacity-80"
                                                    }`}
                                            >
                                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${item.activeColor}`}>
                                                    <item.icon className="h-3 w-3" strokeWidth={3} />
                                                </span>
                                                <div className="leading-tight">
                                                    <div className="text-[10px] font-bold">{item.title}</div>
                                                    <div className="text-[8.5px] opacity-80">{item.sub}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Audit Record Strip */}
                                <div className="rounded-2xl border border-sky-200/80 bg-white/95 p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                        Audit record <span className="text-[10px] font-normal text-slate-500">(always on)</span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-700">Who</div>
                                            <div className="text-[9.5px] text-slate-500">jane.smith@acme.com<br />employee</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-700">What</div>
                                            <div className="text-[9.5px] text-slate-500">Prompt to ChatGPT<br />Contained SSN</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-700">Policy</div>
                                            <div className="text-[9.5px] text-slate-500">PII Protection Policy<br />Redact SSN</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-700">Result</div>
                                            <div className="text-[9.5px] font-semibold text-emerald-600">Redacted</div>
                                            <div className="text-[9.5px] text-slate-500">Prompt continued</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}