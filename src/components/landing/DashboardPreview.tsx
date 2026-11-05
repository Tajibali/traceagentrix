import {
  User,
  Bot,
  Monitor,
  Check,
  X,
  Cloud,
  LayoutDashboard,
  Search,
  ShieldCheck,
  FileText,
  Settings,
  Bell,
  TrendingUp,
  BarChart3,
  MonitorSmartphone,
  ChevronDown,
  Clock,
} from "lucide-react";
import { LogoMark } from "./Logo";

function SourceNode({
  icon: Icon,
  title,
  sub,
  top,
}: {
  icon: typeof User;
  title: string;
  sub: string;
  top: string;
}) {
  return (
    <div
      className="absolute left-[1.5%] flex w-[29%] items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_4px_14px_rgba(79,70,229,0.12)] ring-1 ring-slate-100"
      style={{ top }}
    >
      <Icon className="h-4 w-4 shrink-0 text-indigo-500" />
      <div className="leading-tight">
        <div className="whitespace-nowrap text-[10px] font-semibold text-slate-800">{title}</div>
        <div className="whitespace-nowrap text-[8px] text-slate-500">{sub}</div>
      </div>
    </div>
  );
}

function DestNode({
  tone,
  title,
  sub,
  top,
}: {
  tone: "ok" | "bad";
  title: string;
  sub: string;
  top: string;
}) {
  return (
    <div
      className={`absolute right-[1.5%] flex w-[29%] items-center gap-2 rounded-lg px-2.5 py-2 shadow-[0_4px_14px_rgba(79,70,229,0.1)] ring-1 ${
        tone === "ok" ? "bg-white ring-slate-100" : "bg-red-50 ring-red-100"
      }`}
      style={{ top }}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
          tone === "ok" ? "bg-emerald-500" : "bg-red-500"
        }`}
      >
        {tone === "ok" ? (
          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        ) : (
          <X className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        )}
      </span>
      <div className="leading-tight">
        <div className="whitespace-nowrap text-[10px] font-semibold text-slate-800">{title}</div>
        <div className="whitespace-nowrap text-[8px] text-slate-500">{sub}</div>
      </div>
    </div>
  );
}

const sideIcons = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Search, label: "Investigations" },
  { icon: ShieldCheck, label: "Policies" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-indigo-200/40 via-sky-100/40 to-violet-200/40 blur-2xl" />
      <div className="relative flex overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-12px_rgba(49,46,129,0.35)] ring-1 ring-indigo-100">
        {/* sidebar */}
        <div className="hidden w-[104px] shrink-0 flex-col bg-[#0B1437] py-4 sm:flex">
          <div className="mb-4 flex justify-center">
            <LogoMark className="h-8 w-7" />
          </div>
          {sideIcons.map((s) => (
            <div
              key={s.label}
              className={`mx-2 mb-1 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[8px] ${
                s.active
                  ? "bg-indigo-500/25 text-white"
                  : "text-slate-400"
              }`}
            >
              <s.icon className="h-3 w-3 shrink-0" />
              {s.label}
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
              Real-Time Security Overview
              <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="hidden items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[8px] text-slate-500 md:flex">
                <Clock className="h-2.5 w-2.5" /> Last 24 Hours
                <ChevronDown className="h-2.5 w-2.5" />
              </span>
              <Bell className="h-3.5 w-3.5 text-slate-500" />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0B1437] text-[8px] font-bold text-white">
                IJ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_30%]">
            {/* flow */}
            <div className="relative min-h-[270px] bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:18px_18px]">
              <SourceNode icon={User} title="Employee" sub="(User)" top="12%" />
              <SourceNode
                icon={Bot}
                title="AI Tools"
                sub="(ChatGPT, Copilot)"
                top="40%"
              />
              <SourceNode
                icon={Monitor}
                title="Local Apps"
                sub="(Desktop/CLI)"
                top="68%"
              />

              <DestNode tone="ok" title="Approved" sub="(Work Apps)" top="12%" />
              <DestNode tone="bad" title="External" sub="(Unknown)" top="40%" />
              <div
                className="absolute right-[1.5%] flex w-[29%] items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_4px_14px_rgba(79,70,229,0.1)] ring-1 ring-slate-100"
                style={{ top: "68%" }}
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                <Cloud className="h-3 w-3 text-slate-400" />
                <div className="leading-tight">
                  <div className="whitespace-nowrap text-[10px] font-semibold text-slate-800">
                    Cloud Storage
                  </div>
                  <div className="text-[8px] text-slate-500">(Secure)</div>
                </div>
              </div>

              {/* connectors */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {[
                  "M29 19 C 38 19, 38 50, 41 50",
                  "M29 47 L 41 50",
                  "M29 75 C 38 75, 38 50, 41 50",
                  "M59 50 C 63 50, 63 19, 71 19",
                  "M59 50 C 63 50, 63 75, 71 75",
                ].map((d) => (
                  <path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <path
                  d="M59 50 L 71 47"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="absolute left-1/2 top-[8%] -translate-x-1/2 rounded bg-red-500 px-2 py-0.5 text-[8px] font-medium text-white shadow">
                Blocked: Sensitive Data
              </div>
              <div className="absolute left-1/2 top-[50%] flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-[#0B1437] shadow-xl ring-2 ring-indigo-400/40">
                <LogoMark className="h-6 w-5" />
                <span className="mt-0.5 text-[7px] font-semibold text-white">
                  TraceAgentrix
                </span>
              </div>
            </div>

            {/* status panel */}
            <div className="border-l border-slate-100 bg-slate-50/60 p-3">
              <div className="rounded-lg bg-emerald-50 p-3 text-center ring-1 ring-emerald-100">
                <ShieldCheck className="mx-auto h-8 w-8 text-emerald-500" />
                <div className="mt-1 text-[11px] font-semibold leading-tight text-emerald-700">
                  All Systems
                  <br />
                  Protected
                </div>
                <div className="mt-1 text-[8px] text-slate-500">
                  No active threats
                </div>
              </div>
              {[
                { icon: TrendingUp, label: "Threats Blocked", v: "24", c: "text-red-500" },
                { icon: BarChart3, label: "Data Flows Traced", v: "12.8K", c: "text-indigo-500" },
                { icon: MonitorSmartphone, label: "Active Monitors", v: "8", c: "text-violet-500" },
              ].map((m) => (
                <div key={m.label} className="mt-3 flex items-center gap-2">
                  <m.icon className={`h-4 w-4 ${m.c}`} />
                  <div className="leading-tight">
                    <div className="text-[8px] text-slate-500">{m.label}</div>
                    <div className="text-sm font-bold text-slate-800">{m.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
