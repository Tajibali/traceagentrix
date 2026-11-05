"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  LayoutGrid,
  BookOpen,
  Users,
  Newspaper,
  ShieldAlert,
  Tag,
  Info,
  Scale,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";

type Item = { icon: LucideIcon; title: string; desc: string; href: string };

export const navMenus: { label: string; items: Item[] }[] = [
  {
    label: "Product",
    items: [
      {
        icon: LayoutGrid,
        title: "Platform Overview",
        desc: "AI security and control platform.",
        href: "/product-overview",
      },
      {
        icon: BookOpen,
        title: "Docs",
        desc: "Technical guides and references.",
        href: "/docs",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        icon: Users,
        title: "Customer Stories",
        desc: "Real-world TraceAgentrix success stories.",
        href: "/customer-stories",
      },
      {
        icon: Newspaper,
        title: "Blogs",
        desc: "Insights on AI security.",
        href: "/blogs",
      },
      {
        icon: ShieldAlert,
        title: "Security Advisories",
        desc: "Vulnerability research and CVEs.",
        href: "/security-advisories",
      },
      {
        icon: Tag,
        title: "Pricing",
        desc: "Simple pricing that scales.",
        href: "/pricing",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        icon: Info,
        title: "About Us",
        desc: "The team behind TraceAgentrix.",
        href: "/about",
      },
      {
        icon: Scale,
        title: "Legal",
        desc: "Policies, terms, and compliance.",
        href: "/legal",
      },
      {
        icon: Mail,
        title: "Contact Us",
        desc: "Talk to our team.",
        href: "/contact",
      },
    ],
  },
];

function Dropdown({ menu }: { menu: (typeof navMenus)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget))
            setOpen(false);
        }}
        className={`flex items-center gap-1 pb-2 text-[15px] leading-normal font-medium transition-colors ${
          open ? "text-indigo-600" : "text-[#0B1437] hover:text-indigo-600"
        }`}
      >
        {menu.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-2 transition duration-150 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_50px_-10px_rgba(49,46,129,0.25)]">
          {menu.items.map((it) => (
            <Link
              key={it.title}
              href={it.href}
              onClick={() => setOpen(false)}
              className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-indigo-50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <it.icon className="h-5 w-5" />
              </span>
              <span className="leading-snug">
                <span className="block text-[15px] font-semibold text-[#0B1437]">
                  {it.title}
                </span>
                <span className="block text-sm text-slate-500">{it.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Navbar() {
  const [mobile, setMobile] = useState(false);
  return (
    <nav className="relative z-30 mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-10">
      <Link href="/">
        <Logo />
      </Link>

      <ul className="hidden items-center gap-9 lg:flex">
        <li>
          <Link
            href="/"
            className="relative block pb-2 text-[15px] leading-normal font-medium text-indigo-600 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-indigo-600"
          >
            Home
          </Link>
        </li>
        {navMenus.map((m) => (
          <Dropdown key={m.label} menu={m} />
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden text-sm font-medium text-slate-600 hover:text-indigo-600 sm:block"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="hidden items-center gap-2 rounded-full bg-[#0B1437] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:inline-flex"
        >
          Request a Demo <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobile((m) => !m)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 lg:hidden"
        >
          {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobile && (
        <div className="absolute inset-x-4 top-full z-50 max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl lg:hidden">
          {navMenus.map((m) => (
            <div key={m.label} className="mb-3">
              <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {m.label}
              </div>
              {m.items.map((it) => (
                <Link
                  key={it.title}
                  href={it.href}
                  onClick={() => setMobile(false)}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-indigo-50"
                >
                  <it.icon className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-medium">{it.title}</span>
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/register"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0B1437] py-3 text-sm font-semibold text-white"
          >
            Request a Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
