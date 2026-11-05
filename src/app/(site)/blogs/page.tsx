import { PageHero, Section, CtaBand, SampleNote } from "@/components/site/blocks";

export const metadata = { title: "Blogs – TraceAgentrix" };

const posts = [
  { c: "Research", t: "Shadow AI: the data leak you can't see", d: "Why traditional DLP misses prompts, uploads and agent tool calls.", date: "Oct 28, 2026", r: "6 min" },
  { c: "Engineering", t: "Inside the TraceAgentrix on-device agent", d: "How we observe AI traffic with under 1% CPU overhead.", date: "Oct 14, 2026", r: "8 min" },
  { c: "Guides", t: "A practical policy framework for AI usage", d: "Start with warn, graduate to block — a rollout playbook.", date: "Sep 30, 2026", r: "5 min" },
  { c: "Research", t: "Auditing 1,000 MCP servers", d: "What we found when we risk-scored the public MCP ecosystem.", date: "Sep 12, 2026", r: "9 min" },
  { c: "Product", t: "Introducing real-time exfiltration blocking", d: "Stop sensitive transfers to unapproved AI apps instantly.", date: "Aug 25, 2026", r: "4 min" },
  { c: "Compliance", t: "Mapping AI controls to ISO 27001", d: "Which Annex A controls AI discovery and tracing help satisfy.", date: "Aug 06, 2026", r: "7 min" },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Blogs" title="Insights on" accent="AI security." desc="Research, guides and product updates from the TraceAgentrix team." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <article key={p.t} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(79,70,229,0.07)] transition hover:-translate-y-0.5">
              <div className={`h-36 ${["bg-gradient-to-br from-indigo-500 to-violet-500","bg-gradient-to-br from-sky-400 to-indigo-500","bg-gradient-to-br from-violet-500 to-fuchsia-400"][i % 3]}`} />
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">{p.c}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug">{p.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.d}</p>
                <p className="mt-4 text-xs text-slate-400">{p.date} · {p.r} read</p>
              </div>
            </article>
          ))}
        </div>
        <SampleNote />
      </Section>
      <CtaBand />
    </>
  );
}
