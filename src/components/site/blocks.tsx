import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  accent,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  desc: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-[radial-gradient(ellipse_at_80%_0%,#E0E7FF_0%,transparent_55%),radial-gradient(ellipse_at_0%_60%,#EEF2FF_0%,transparent_50%)] px-6 pb-20 pt-10 lg:px-10">
      <div className="mx-auto max-w-[1100px] text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 px-4 py-1.5 text-sm font-medium text-indigo-700">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          {eyebrow}
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {title}{" "}
          {accent && (
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text italic text-transparent">
              {accent}
            </span>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">{desc}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  title,
  desc,
  children,
  tint,
}: {
  title?: string;
  desc?: string;
  children: ReactNode;
  tint?: boolean;
}) {
  return (
    <section className={`px-6 py-20 lg:px-10 ${tint ? "bg-slate-50" : ""}`}>
      <div className="mx-auto max-w-[1100px]">
        {title && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {desc && <p className="mt-3 text-slate-600">{desc}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Pill({
  href,
  children,
  light,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition ${
        light
          ? "border border-slate-300 bg-white text-[#0B1437] hover:border-indigo-400"
          : "bg-[#0B1437] text-white hover:bg-indigo-700"
      }`}
    >
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function CtaBand({
  title = "Ready to see every AI data flow?",
}: {
  title?: string;
}) {
  return (
    <section className="px-6 pb-24 pt-10 lg:px-10">
      <div className="mx-auto max-w-[1100px] rounded-3xl bg-[#050B24] bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.4),transparent_60%)] px-8 py-14 text-center">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          Book a 30-minute walkthrough with our security engineers.
        </p>
        <div className="mt-7">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0B1437] hover:bg-indigo-100"
          >
            Request a Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SampleNote() {
  return (
    <p className="mt-10 text-center text-xs text-slate-400">
      Sample content for design preview only.
    </p>
  );
}
