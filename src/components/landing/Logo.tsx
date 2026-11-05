import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" className={cn("h-10 w-9", className)} fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="44">
          <stop offset="0" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <path
        d="M20 2 36 8v14c0 10-7 17-16 20C11 39 4 32 4 22V8L20 2Z"
        fill="url(#lg1)"
      />
      <path
        d="M20 6.5 32 11v11c0 7.6-5.2 12.9-12 15.4C13.2 34.9 8 29.6 8 22V11l12-4.5Z"
        fill="#fff"
        fillOpacity=".12"
      />
      <path
        d="M12.5 15h15M20 15v14M14 22v3.5a3 3 0 0 0 3 3M26 22v3.5a3 3 0 0 1-3 3"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span
        className={cn(
          "text-[26px] font-bold tracking-tight",
          dark ? "text-white" : "text-[#0B1437]"
        )}
      >
        Trace<span className="text-indigo-500">Agentrix</span>
      </span>
    </span>
  );
}
