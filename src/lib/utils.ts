import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function getRiskColor(level: string) {
  switch (level?.toLowerCase()) {
    case "high":
    case "critical":
      return "text-risk-high";
    case "medium":
      return "text-risk-medium";
    default:
      return "text-risk-low";
  }
}

export function getRiskBg(level: string) {
  switch (level?.toLowerCase()) {
    case "high":
    case "critical":
      return "bg-risk-high/10 text-risk-high border-risk-high/20";
    case "medium":
      return "bg-risk-medium/10 text-risk-medium border-risk-medium/20";
    default:
      return "bg-risk-low/10 text-risk-low border-risk-low/20";
  }
}
