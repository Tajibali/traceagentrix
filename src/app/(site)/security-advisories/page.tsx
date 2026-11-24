import { PageHero, Section, CtaBand, SampleNote } from "@/components/site/blocks";

export const metadata = { title: "Security Advisories – TraceAgentrix" };

const tone: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

const rows = [
  ["TA-2026-014", "Critical", "Prompt injection leading to tool-call hijack in popular MCP server", "Oct 30, 2026", "Patched"],
  ["TA-2026-013", "High", "Credential exposure in AI coding assistant config files", "Oct 21, 2026", "Mitigated"],
  ["TA-2026-012", "High", "Unauthenticated MCP endpoint exposes local filesystem", "Oct 08, 2026", "Patched"],
  ["TA-2026-011", "Medium", "Clipboard data forwarded to third-party AI plugin", "Sep 24, 2026", "Monitoring"],
  ["TA-2026-010", "Medium", "Over-permissive OAuth scopes in AI browser extension", "Sep 09, 2026", "Patched"],
  ["TA-2026-009", "Low", "Verbose telemetry in desktop AI client leaks file paths", "Aug 19, 2026", "Patched"],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Security Advisories" title="Vulnerability research" accent="and advisories." desc="Findings from the TraceAgentrix research team on AI apps, agents and MCP servers." />
      <Section>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(79,70,229,0.07)]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>{["ID","Severity","Title","Published","Status"].map((h) => <th key={h} className="px-6 py-4 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r[0]} className="hover:bg-indigo-50/40">
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-xs">{r[0]}</td>
                  <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[r[1]]}`}>{r[1]}</span></td>
                  <td className="px-6 py-4 font-medium">{r[2]}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-500">{r[3]}</td>
                  <td className="px-6 py-4 text-slate-600">{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SampleNote />
      </Section>
      <CtaBand />
    </>
  );
}
