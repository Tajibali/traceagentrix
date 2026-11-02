"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-white/10 bg-elevated px-3 py-2 text-sm text-white placeholder:text-slate-500",
            "transition-all duration-200",
            "focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30",
            "hover:border-white/20",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
