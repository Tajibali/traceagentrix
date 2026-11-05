"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Twitter, Github } from "lucide-react";
import { Logo } from "./Logo";
import { navMenus } from "./Navbar";

const footerCols = navMenus.map((m) => ({
  title: m.label,
  links: m.items.map((i) => ({ label: i.title, href: i.href })),
}));

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function Footer({ cta = true }: { cta?: boolean }) {
  return (
      <footer className="bg-[#050B24] text-slate-300">
        {cta && (
        <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.35),transparent_60%)] px-6 py-24 text-center">
          <motion.div {...fade}>
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white">
              Run AI without blind spots.
            </h2>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#0B1437] transition hover:bg-indigo-100"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        )}

        <div className="mx-auto grid max-w-[1280px] gap-10 border-t border-white/10 px-6 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-10">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              See every AI data flow. Stop every risk.
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Twitter, Github].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-indigo-500"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {footerCols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-slate-400 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TraceAgentrix. All rights reserved.
        </div>
      </footer>
  );
}
