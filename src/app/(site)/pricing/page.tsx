import { Check } from "lucide-react";
import Link from "next/link";
import { PageHero, Section, CtaBand, SampleNote } from "@/components/site/blocks";

export const metadata = { title: "Pricing – TraceAgentrix" };

const plans = [
  { n: "Starter", p: "$4", u: "/device/mo", d: "For small teams starting with AI visibility.", f: ["AI app discovery","Usage analytics","Email alerts","Up to 250 devices"], cta: "Start free trial" },
  { n: "Business", p: "$9", u: "/device/mo", d: "Full tracing and blocking for growing companies.", f: ["Everything in Starter","Data flow tracing","Real-time blocking","MCP security","Slack & SIEM integrations"], cta: "Request a Demo", hot: true },
  { n: "Enterprise", p: "Custom", u: "", d: "Advanced controls, SSO and dedicated support.", f: ["Everything in Business","SSO / SCIM","Custom policies","Dedicated CSM","On-prem option"], cta: "Contact sales" },
];

const faq = [
  ["Is there a free trial?", "Yes — 14 days with full Business features, no credit card required."],
  ["Which platforms are supported?", "Windows 10/11 and macOS 12+, deployed via Intune, Jamf or Kandji."],
  ["Can we pay annually?", "Annual billing is available with a 15% discount."],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple pricing" accent="that scales." desc="Pay per protected device. Upgrade as your AI usage grows." />
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.n} className={`flex flex-col rounded-2xl bg-white p-8 ${p.hot ? "border-2 border-indigo-500 shadow-[0_20px_50px_-10px_rgba(79,70,229,0.35)]" : "border border-slate-200"}`}>
              {p.hot && <span className="mb-3 w-fit rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
              <h3 className="text-xl font-bold">{p.n}</h3>
              <p className="mt-1 text-sm text-slate-500">{p.d}</p>
              <div className="mt-5"><span className="text-4xl font-extrabold">{p.p}</span><span className="text-slate-500">{p.u}</span></div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.f.map((x) => <li key={x} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{x}</li>)}
              </ul>
              <Link href="/contact" className={`mt-8 rounded-full py-3 text-center text-sm font-semibold ${p.hot ? "bg-[#0B1437] text-white hover:bg-indigo-700" : "border border-slate-300 hover:border-indigo-400"}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
        <SampleNote />
      </Section>
      <Section tint title="Frequently asked questions">
        <div className="mx-auto max-w-2xl space-y-3">
          {faq.map(([q, a]) => (
            <details key={q} className="group rounded-xl bg-white p-5 ring-1 ring-slate-100">
              <summary className="cursor-pointer list-none font-semibold">{q}</summary>
              <p className="mt-2 text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
