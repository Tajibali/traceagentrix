import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1437]">
      <div className="bg-[radial-gradient(ellipse_at_80%_0%,#E0E7FF_0%,transparent_55%),radial-gradient(ellipse_at_0%_60%,#EEF2FF_0%,transparent_50%)]">
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer cta={false} />
    </div>
  );
}
