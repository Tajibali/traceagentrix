import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TraceAgentriX – AI Security & Control Platform",
  description:
    "See. Secure. Control every AI agent on every device. Enterprise AI security platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-deep text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
