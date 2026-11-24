import { PageHero, Section, CtaBand, SampleNote } from "@/components/site/blocks";

export const metadata = { title: "Customer Stories – TraceAgentrix" };

const stories = [
  { co: "Northwind Energy", ind: "Energy", q: "We went from zero visibility to a full AI inventory in a single afternoon.", who: "CISO", stats: [["4,200","devices covered"],["312","unsanctioned AI apps found"]] },
  { co: "Helio Financial", ind: "Banking", q: "Blocking sensitive data before it reaches public AI tools changed our risk posture.", who: "Head of Security", stats: [["96%","fewer risky uploads"],["2 days","to enforce policy"]] },
  { co: "Meridian Health", ind: "Healthcare", q: "TraceAgentrix gave our compliance team the audit trail they were missing.", who: "VP Compliance", stats: [["100%","MCPs inventoried"],["0","PHI leaks since rollout"]] },
  { co: "Arcadia Logistics", ind: "Logistics", q: "Deployment through our MDM was trivial, and developers barely noticed the agent.", who: "IT Director", stats: [["15 min","pilot rollout"],["1,800","endpoints"]] },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Customer Stories" title="Real-world" accent="success stories." desc="See how security teams use TraceAgentrix to adopt AI safely." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((s) => (
            <div key={s.co} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(79,70,229,0.07)]">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{s.co}</h3>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">{s.ind}</span>
              </div>
              <p className="mt-5 flex-1 text-lg italic text-slate-700">“{s.q}”</p>
              <p className="mt-3 text-sm text-slate-500">— {s.who}, {s.co}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                {s.stats.map(([v, l]) => (
                  <div key={l}>
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-extrabold text-transparent">{v}</div>
                    <div className="text-sm text-slate-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <SampleNote />
      </Section>
      <CtaBand />
    </>
  );
}
