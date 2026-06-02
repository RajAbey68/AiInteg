import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import { CTA_LABEL } from "@/lib/waitlist";

// H2 fix: SRA source cited properly
// Source: SRA, "Technology, AI and the legal market" (2025), Section 3 — adoption rates
// URL: https://www.sra.org.uk/sra/research-publications/artificial-intelligence-legal-market/
const stats = [
  { value: "~14%", label: "Sole practitioner AI adoption (SRA Technology & AI report, 2025)" },
  { value: "Aug 2026", label: "EU AI Act high-risk deadline — for new systems placed on the market" },
  { value: "Free", label: "Cost to join the founding cohort — no credit card required" },
];

export default function Hero() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <section className="relative min-h-screen bg-ink-900 flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            For regulated professional services firms · UK
          </div>

          {/* H1 fix: headline now carries the value prop in 5 seconds */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 text-balance">
            AI governance
            <br />
            for your practice.
            <br />
            <span className="text-gold-400">Peer-led. Regulator-ready.</span>
          </h1>

          {/* H3 fix: "for new systems" qualifier. H4 fix: "expected to report" */}
          <p className="text-xl md:text-2xl text-ink-300 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
            The EU AI Act high-risk deadline for new systems is August 2026.
            The FCA Mills Review is expected to report late 2026.
          </p>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            AI Integrity is the community where high street and regional professional
            services firms get compliant, get confident, and get ahead —
            before the window closes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {["Solicitors", "Accountants", "IFAs", "Architects", "Surveyors", "Consultants"].map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full border border-ink-600 text-ink-300 text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setModal(true)}
              className="inline-flex items-center gap-2 px-7 py-4 rounded bg-gold-500 text-ink-900 font-bold text-base hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
            >
              {CTA_LABEL}
              <ArrowRight size={18} />
            </button>
            <a
              href="#sectors"
              className="inline-flex items-center gap-2 px-7 py-4 rounded border border-ink-600 text-ink-200 font-semibold text-base hover:border-gold-500/50 hover:text-white transition-colors"
            >
              Find your sector
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink-700 rounded-xl overflow-hidden max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.value} className="bg-ink-800 px-6 py-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold-400 mb-1">{s.value}</p>
                <p className="text-xs text-ink-400 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment-50 to-transparent" />
      </section>

      <WaitlistModal open={modal} onClose={() => setModal(false)} source="hero" />
    </>
  );
}
