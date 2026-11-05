import { Rocket, Laptop, SlidersHorizontal, Boxes, Code2, Bell } from "lucide-react";
import { PageHero, Section, CtaBand, SampleNote } from "@/components/site/blocks";

export const metadata = { title: "Docs – TraceAgentrix" };

const guides = [
  { icon: Rocket, t: "Getting Started", d: "Create your workspace and enroll your first device in 5 minutes.", n: "6 articles" },
  { icon: Laptop, t: "Agent Installation", d: "Deploy on Windows and macOS with Intune, Jamf or Kandji.", n: "8 articles" },
  { icon: SlidersHorizontal, t: "Policies", d: "Write warn and block rules by user, app and data type.", n: "12 articles" },
  { icon: Boxes, t: "MCP Scanner", d: "Inventory and risk-score MCP servers on every endpoint.", n: "5 articles" },
  { icon: Code2, t: "API Reference", d: "REST endpoints for devices, alerts, policies and events.", n: "24 endpoints" },
  { icon: Bell, t: "Alerts & Integrations", d: "Send alerts to Slack, Splunk, Sentinel and webhooks.", n: "9 articles" },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="Technical guides" accent="and references." desc="Everything you need to deploy, configure and extend TraceAgentrix." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <div key={g.t} className="rounded-2xl border border-slate-100 p-7 shadow-[0_8px_30px_rgba(79,70,229,0.07)] transition hover:-translate-y-0.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><g.icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-bold">{g.t}</h3>
              <p className="mt-2 text-slate-600">{g.d}</p>
              <p className="mt-4 text-sm font-medium text-indigo-600">{g.n}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tint title="Quick start" desc="Enroll a device from the command line.">
        <pre className="mx-auto max-w-2xl overflow-x-auto rounded-2xl bg-[#050B24] p-6 text-sm leading-relaxed text-slate-200">
{`# 1. Install the agent (macOS)
brew install traceagentrix/tap/agent

# 2. Enroll with your workspace key
traceagentrix enroll --key TA_live_xxxxxxxx

# 3. Verify status
traceagentrix status
> Agent: running   Policies: 12   Monitors: 8`}
        </pre>
        <SampleNote />
      </Section>
      <CtaBand title="Need help getting set up?" />
    </>
  );
}
