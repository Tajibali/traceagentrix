"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * TraceAgentrix mark, option B: "Sentinel Eye"
 * - Eye           -> see every AI data flow (visibility)
 * - Iris ring     -> the policy engine, always scanning
 * - Line + dot    -> data passing through: cyan going in, green once cleared
 * Same exports as Logo.tsx, so either file can be swapped in.
 */
export function LogoMark({
    className,
    animated = true,
}: {
    className?: string;
    animated?: boolean;
}) {
    const uid = useId().replace(/:/g, "");
    const tile = `${uid}-tile`;
    const rim = `${uid}-rim`;
    const iris = `${uid}-iris`;
    const trace = `${uid}-trace`;

    return (
        <svg viewBox="0 0 48 48" className={cn("h-10 w-10", className)} fill="none" aria-hidden>
            <defs>
                <linearGradient id={tile} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#1E1B4B" />
                    <stop offset="1" stopColor="#0B1437" />
                </linearGradient>
                <linearGradient id={rim} x1="6" y1="24" x2="42" y2="24" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#22D3EE" />
                    <stop offset="0.5" stopColor="#818CF8" />
                    <stop offset="1" stopColor="#34D399" />
                </linearGradient>
                <radialGradient id={iris} cx="24" cy="24" r="9" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#6366F1" stopOpacity=".95" />
                    <stop offset="1" stopColor="#312E81" stopOpacity=".6" />
                </radialGradient>
                <path id={trace} d="M10 24H38" />
            </defs>

            {/* app-icon tile */}
            <rect x="1" y="1" width="46" height="46" rx="13" fill={`url(#${tile})`} />
            <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke="#fff" strokeOpacity=".14" />

            {/* eye */}
            <path
                d="M5 24C11 14 17.5 10.5 24 10.5S37 14 43 24C37 34 30.5 37.5 24 37.5S11 34 5 24Z"
                fill="#6366F1"
                fillOpacity=".12"
                stroke={`url(#${rim})`}
                strokeWidth="2.2"
                strokeLinejoin="round"
            />

            {/* iris */}
            <circle cx="24" cy="24" r="8.6" fill={`url(#${iris})`} />
            <circle cx="24" cy="24" r="8.6" stroke="#A5B4FC" strokeWidth="1.4" strokeDasharray="3.2 2.6">
                {animated && (
                    <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="12s" repeatCount="indefinite" />
                )}
            </circle>

            {/* trace line through the eye */}
            <use href={`#${trace}`} stroke="#fff" strokeOpacity=".35" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 24H20" stroke="#67E8F9" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M28 24H38" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" />

            {/* pupil */}
            <circle cx="24" cy="24" r="3.6" fill="#fff" />
            <circle cx="24" cy="24" r="1.5" fill="#312E81" />

            {animated && (
                <>
                    <circle r="2.2" fill="#ECFEFF">
                        <animateMotion dur="2.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                            <mpath href={`#${trace}`} />
                        </animateMotion>
                        <animate attributeName="fill" values="#67E8F9;#ECFEFF;#6EE7B7" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="24" cy="24" r="3.6" stroke="#fff" strokeOpacity=".7" strokeWidth="1">
                        <animate attributeName="r" values="3.6;8" dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                </>
            )}
        </svg>
    );
}

export function Logo({
    dark = false,
    tagline = true,
    className,
}: {
    dark?: boolean;
    tagline?: boolean;
    className?: string;
}) {
    return (
        <span className={cn("flex items-center gap-3", className)}>
            <LogoMark className="h-11 w-11 drop-shadow-[0_6px_16px_rgba(99,102,241,0.5)]" />
            <span className="flex flex-col leading-none">
                <span className="flex items-baseline text-[24px] tracking-tight">
                    <span className={cn("font-semibold", dark ? "text-white" : "text-[#0B1437]")}>Trace</span>
                    <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 bg-clip-text font-black text-transparent">
                        Agentrix
                    </span>
                </span>
                {tagline && (
                    <span className={cn("mt-1.5 text-[10.5px] font-medium", dark ? "text-slate-400" : "text-slate-500")}>
                        See every AI data flow
                    </span>
                )}
            </span>
        </span>
    );
}




// import { cn } from "@/lib/utils";

// export function LogoMark({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 40 44" className={cn("h-10 w-9", className)} fill="none">
//       <defs>
//         <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="44">
//           <stop offset="0" stopColor="#4F46E5" />
//           <stop offset="1" stopColor="#7C3AED" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M20 2 36 8v14c0 10-7 17-16 20C11 39 4 32 4 22V8L20 2Z"
//         fill="url(#lg1)"
//       />
//       <path
//         d="M20 6.5 32 11v11c0 7.6-5.2 12.9-12 15.4C13.2 34.9 8 29.6 8 22V11l12-4.5Z"
//         fill="#fff"
//         fillOpacity=".12"
//       />
//       <path
//         d="M12.5 15h15M20 15v14M14 22v3.5a3 3 0 0 0 3 3M26 22v3.5a3 3 0 0 1-3 3"
//         stroke="#fff"
//         strokeWidth="2.4"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// export function Logo({ dark = false }: { dark?: boolean }) {
//   return (
//     <span className="flex items-center gap-2.5">
//       <LogoMark />
//       <span
//         className={cn(
//           "text-[26px] font-bold tracking-tight",
//           dark ? "text-white" : "text-[#0B1437]"
//         )}
//       >
//         Trace<span className="text-indigo-500">Agentrix</span>
//       </span>
//     </span>
//   );
// }
