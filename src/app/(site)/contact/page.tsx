"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { PageHero, Section } from "@/components/site/blocks";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function Page() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Talk to" accent="our team." desc="Book a demo, ask a question or request a security review." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(79,70,229,0.07)]">
            {sent ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-4 text-2xl font-bold">Thanks — we'll be in touch</h3>
                <p className="mt-2 text-slate-600">Our team usually replies within one business day.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-5 sm:grid-cols-2">
                <input required placeholder="Full name" className={inputCls} />
                <input required type="email" placeholder="Work email" className={inputCls} />
                <input placeholder="Company" className={inputCls} />
                <select className={inputCls} defaultValue="">
                  <option value="" disabled>Company size</option>
                  <option>1–100</option><option>101–1,000</option><option>1,001–10,000</option><option>10,000+</option>
                </select>
                <textarea required rows={5} placeholder="How can we help?" className={`${inputCls} sm:col-span-2`} />
                <button className="rounded-full bg-[#0B1437] px-8 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 sm:col-span-2 sm:w-fit">
                  Request a Demo
                </button>
              </form>
            )}
          </div>
          <div className="space-y-5">
            {[
              [Mail, "Email", "hello@traceagentrix.com"],
              [Phone, "Phone", "+1 (555) 010-2030"],
              [MapPin, "Office", "100 Example Street, Suite 400, San Francisco, CA"],
            ].map(([I, t, v]) => {
              const Icon = I as typeof Mail;
              return (
                <div key={t as string} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><Icon className="h-5 w-5" /></span>
                  <div><div className="font-semibold">{t as string}</div><div className="text-sm text-slate-600">{v as string}</div></div>
                </div>
              );
            })}
            <p className="text-xs text-slate-400">Sample contact details for design preview only.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
