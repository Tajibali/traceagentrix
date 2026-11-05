import { Eye, ShieldCheck, Zap } from "lucide-react";
import { PageHero, Section, CtaBand, SampleNote } from "@/components/site/blocks";

export const metadata = { title: "About Us – TraceAgentrix" };

const values = [
  { icon: Eye, t: "Visibility first", d: "You can't protect what you can't see. We start with the truth on every device." },
  { icon: ShieldCheck, t: "Protection, not noise", d: "Precise, explainable controls that stop real risk without blocking real work." },
  { icon: Zap, t: "Fast to value", d: "Minutes to deploy, hours to insight. Security should never slow adoption." },
];
const team = [
  ["Ayesha Khan", "CEO & Co-founder"], ["Daniel Moore", "CTO & Co-founder"],
  ["Sara Malik", "Head of Research"], ["Omar Siddiqui", "VP Engineering"],
];
const timeline = [["2024","Founded by security engineers frustrated by shadow AI"],["2025","First 100 enterprise devices; MCP scanner open-sourced"],["2026","10,000+ devices protected; real-time blocking launched"]];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="About Us" title="The team behind" accent="TraceAgentrix." desc="We're building the control layer that lets enterprises adopt AI without losing sight of their data." />
      <Section title="What we believe">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.t} className="rounded-2xl border border-slate-100 p-7 shadow-[0_8px_30px_rgba(79,70,229,0.07)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><v.icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-bold">{v.t}</h3>
              <p className="mt-2 text-slate-600">{v.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tint title="Our journey">
        <ol className="mx-auto max-w-2xl space-y-6 border-l-2 border-indigo-200 pl-8">
          {timeline.map(([y, t]) => (
            <li key={y} className="relative">
              <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100" />
              <div className="font-bold text-indigo-600">{y}</div>
              <p className="text-slate-700">{t}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Leadership">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {team.map(([n, r]) => (
            <div key={n} className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-2xl font-bold text-white">{n.split(" ").map((x) => x[0]).join("")}</div>
              <div className="mt-3 font-semibold">{n}</div>
              <div className="text-sm text-slate-500">{r}</div>
            </div>
          ))}
        </div>
        <SampleNote />
      </Section>
      <CtaBand />
    </>
  );
}
