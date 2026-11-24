import { FileText, ScrollText, Database, BadgeCheck } from "lucide-react";
import { PageHero, Section, CtaBand, SampleNote } from "@/components/site/blocks";

export const metadata = { title: "Legal – TraceAgentrix" };

const docs = [
  { icon: FileText, t: "Privacy Policy", d: "How we collect, use and protect personal and device data.", u: "Updated Oct 1, 2026" },
  { icon: ScrollText, t: "Terms of Service", d: "The agreement governing use of the TraceAgentrix platform.", u: "Updated Oct 1, 2026" },
  { icon: Database, t: "Data Processing Addendum", d: "GDPR-ready DPA with standard contractual clauses.", u: "Updated Aug 15, 2026" },
  { icon: BadgeCheck, t: "Compliance", d: "ISO 27001 and SOC 2 Type II reports available under NDA.", u: "Audited 2026" },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Policies, terms," accent="and compliance." desc="Transparent documentation on how we handle your data and run our business." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {docs.map((d) => (
            <div key={d.t} className="flex gap-5 rounded-2xl border border-slate-100 p-7 shadow-[0_8px_30px_rgba(79,70,229,0.07)]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><d.icon className="h-6 w-6" /></span>
              <div>
                <h3 className="text-lg font-bold">{d.t}</h3>
                <p className="mt-1 text-slate-600">{d.d}</p>
                <p className="mt-3 text-xs text-slate-400">{d.u}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {["ISO 27001", "SOC 2 Type II", "GDPR"].map((b) => (
            <span key={b} className="rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700">{b}</span>
          ))}
        </div>
        <SampleNote />
      </Section>
      <CtaBand title="Questions about compliance?" />
    </>
  );
}
