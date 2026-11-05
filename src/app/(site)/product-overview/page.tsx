import {
  Search, Network, ShieldCheck, Boxes, SlidersHorizontal, MonitorSmartphone,
  Download, Radar, Lock,
} from "lucide-react";
import { PageHero, Section, Pill, CtaBand } from "@/components/site/blocks";

export const metadata = { title: "Platform Overview – TraceAgentrix" };

const features = [
  { icon: Search, t: "AI Discovery", d: "Automatically inventory every AI app, browser tool, coding agent and CLI used across your fleet." },
  { icon: Network, t: "Data Flow Tracing", d: "Follow sensitive data from source to destination across prompts, uploads, clipboard and API calls." },
  { icon: ShieldCheck, t: "Exfiltration Blocking", d: "Stop unauthorized transfers to unapproved AI services before data leaves the device." },
  { icon: Boxes, t: "MCP Security", d: "Score, approve or quarantine MCP connectors with a continuously updated risk catalog." },
  { icon: SlidersHorizontal, t: "Policy Engine", d: "Warn, block or allow by user, group, app, data type or risk level — no scripts required." },
  { icon: MonitorSmartphone, t: "Device Fleet Control", d: "Lightweight agents for Windows and macOS, deployed through your existing MDM." },
];

const steps = [
  { icon: Download, t: "Deploy", d: "Push the TraceAgentrix agent with Intune, Jamf or Kandji in minutes." },
  { icon: Radar, t: "Observe", d: "Get an instant map of AI usage, data movement and risky connectors." },
  { icon: Lock, t: "Protect", d: "Turn on policies to warn or block dangerous actions in real time." },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Platform Overview"
        title="One platform to"
        accent="see and control AI."
        desc="TraceAgentrix observes AI usage at the device layer, traces sensitive data movement and blocks unauthorized transfers in real time."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Pill href="/contact">Request a Demo</Pill>
          <Pill href="/docs" light>Read the Docs</Pill>
        </div>
      </PageHero>

      <Section title="Everything you need to secure AI usage" desc="Six capabilities, one lightweight agent.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(79,70,229,0.07)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{f.t}</h3>
              <p className="mt-2 text-slate-600">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tint title="How it works" desc="From install to enforcement in under 15 minutes.">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="relative rounded-2xl bg-white p-7 ring-1 ring-slate-100">
              <span className="absolute right-6 top-5 text-5xl font-extrabold text-indigo-100">{i + 1}</span>
              <s.icon className="h-7 w-7 text-indigo-600" />
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {[["15 min","Average onboarding"],["1,000+","AI tools & MCPs cataloged"],["10K+","Actions blocked / sec"],["99.9%","Platform uptime"]].map(([v,l]) => (
            <div key={l}>
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-4xl font-extrabold text-transparent">{v}</div>
              <div className="mt-1 text-sm text-slate-500">{l}</div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
