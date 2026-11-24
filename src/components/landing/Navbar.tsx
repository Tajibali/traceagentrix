"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Shield,
  Activity,
  Lock,
  Cpu,
  BookOpen,
  FileText,
  Sparkles,
  Building2,
  Users,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "./Logo";

export const navMenus = [
  {
    label: "Product",
    items: [
      {
        title: "AI Agent Gateway",
        desc: "Inspect & govern autonomous MCP and LLM tool calls",
        href: "#capabilities",
        icon: Cpu,
      },
      {
        title: "Real-Time Data Mesh",
        desc: "Trace sensitive data flows across endpoints & cloud",
        href: "#capabilities",
        icon: Activity,
      },
      {
        title: "Shadow AI Discovery",
        desc: "Detect unapproved AI apps, extensions & OAuth grants",
        href: "#capabilities",
        icon: Shield,
      },
      {
        title: "Zero-Leak DLP Policy",
        desc: "Redact API secrets, PII & source code in milliseconds",
        href: "#capabilities",
        icon: Lock,
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        title: "Enterprise AI Security Guide",
        desc: "Best practices for securing Copilot & Claude Code",
        href: "#comparison",
        icon: BookOpen,
      },
      {
        title: "Compliance & Audit Docs",
        desc: "SOC2, ISO 27001 & HIPAA immutable audit trails",
        href: "#comparison",
        icon: FileText,
      },
      {
        title: "Live Threat Feed",
        desc: "Latest prompt-injection & MCP vulnerability research",
        href: "#capabilities",
        icon: Sparkles,
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        title: "About TraceAgentrix",
        desc: "Our mission to secure the agentic enterprise",
        href: "#footer",
        icon: Building2,
      },
      {
        title: "Customers & Case Studies",
        desc: "How global teams prevent AI data exfiltration",
        href: "#trusted",
        icon: Users,
      },
      {
        title: "Contact Security Team",
        desc: "Book a custom architecture walkthrough",
        href: "/register",
        icon: Mail,
      },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "border-b border-indigo-100/80 bg-white/90 py-3 shadow-[0_8px_30px_rgba(11,20,55,0.06)] backdrop-blur-md"
          : "bg-transparent py-4 sm:py-5"
        }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* LEFT SIDE: Mobile/Tablet Hamburger Button + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="group flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: [0, -6, 6, 0], scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <Logo />
            </motion.div>
          </Link>
        </div>

        {/* CENTER: Desktop Nav Links (Laptop & Large Screens) */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <Link
            href="/"
            className="relative py-1.5 text-sm font-semibold text-indigo-600"
          >
            Home
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-indigo-600"
            />
          </Link>

          {navMenus.map((menu) => {
            const isOpen = openMenu === menu.label;
            return (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(menu.label)}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                  className={`flex items-center gap-1 py-1.5 text-sm font-medium transition-colors ${isOpen
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-indigo-600"
                    }`}
                >
                  {menu.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full pt-3 -translate-x-1/2"
                    >
                      <div className="w-[330px] rounded-2xl border border-indigo-100 bg-white/95 p-2.5 shadow-[0_20px_50px_rgba(11,20,55,0.14)] backdrop-blur-xl">
                        {menu.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setOpenMenu(null)}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-indigo-50/80"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                <Icon className="h-4 w-4" />
                              </span>
                              <div>
                                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                                  {item.title}
                                </div>
                                <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* RIGHT SIDE: Action Buttons (Tablet + Laptop cleanly responsive) */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/login"
            className="group relative hidden py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-[#0B1437] sm:inline-block"
          >
            Sign in
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-[#0B1437] px-4 py-2 text-xs font-semibold text-white shadow-[0_6px_20px_-4px_rgba(11,20,55,0.35)] transition-all duration-300 hover:bg-indigo-600 sm:gap-2 sm:px-6 sm:py-2.5 sm:text-sm"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span>Request a Demo</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mobile & Tablet Slide-Down Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-slate-100 bg-white/95 px-5 pb-6 pt-3 shadow-lg backdrop-blur-md lg:hidden"
          >
            <div className="space-y-3">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block py-1.5 text-sm font-bold text-indigo-600"
              >
                Home
              </Link>
              {navMenus.map((m) => (
                <div key={m.label} className="space-y-1.5 pt-1">
                  <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    {m.label}
                  </div>
                  {m.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg py-1 pl-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-800"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full bg-[#0B1437] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  Request a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}