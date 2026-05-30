import { useState } from "react";
import { ExternalLink, ZoomIn } from "lucide-react";

const frameworks = [
  {
    id: "maturity",
    title: "Professional Services AI Maturity Model",
    subtitle: "The Crawl-Walk-Run-Fly framework",
    description:
      "Every implementation path in the AI Integrity community is mapped to this four-phase maturity model. Developed by the ASIMOV-AI team and applied across enterprise and SME engagements. It tells you where your firm is today and exactly what to do next — without skipping stages that create compliance exposure.",
    image: "/frameworks/professional_services_ai_maturity_model.png",
    alt: "Professional Services AI Maturity Model — Crawl, Walk, Run, Fly four-phase framework showing progression from initial AI awareness through compliant, optimised deployment",
    badge: "Crawl · Walk · Run · Fly",
  },
  {
    id: "governance",
    title: "Three Lines of Defence for AI Governance",
    subtitle: "Operationalising AI governance in professional services",
    description:
      "The governance structure that underpins the 251-control ASIMOV audit framework. Line 1 is your delivery and operations team. Line 2 is risk management and oversight — the ASIMOV function. Line 3 is independent audit and assurance. Understanding where your firm sits in this model determines which AI tools you can adopt and which require a formal risk assessment first.",
    image: "/frameworks/operationalizing_ai_governance_framework.png",
    alt: "Three Lines of Defence for AI Governance — Line 1 Delivery and Operations, Line 2 ASIMOV Risk Management and Governance, Line 3 Audit and Assurance",
    badge: "3LoD · 251 Controls · EU AI Act",
  },
];

export default function Methodology() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mb-3">
              The methodology
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink-900 mb-4 text-balance">
              Built on frameworks used by
              <br />
              enterprise and SME alike
            </h2>
            <p className="text-lg text-ink-500 max-w-2xl mx-auto">
              AI Integrity is the community entry point. The frameworks behind it —
              the maturity model and Three Lines of Defence — are the same ones
              used in formal{" "}
              <a
                href="https://asimov-ai.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 font-semibold hover:text-gold-700 transition-colors"
              >
                ASIMOV-AI
              </a>{" "}
              governance audits. You get the methodology. The community helps you apply it.
            </p>
          </div>

          {/* Framework cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {frameworks.map((fw) => (
              <div
                key={fw.id}
                className="rounded-2xl border border-ink-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Image — clickable for lightbox */}
                <div
                  className="relative bg-ink-50 cursor-zoom-in group"
                  onClick={() => setLightbox(fw.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setLightbox(fw.id)}
                  aria-label={`Enlarge: ${fw.title}`}
                >
                  <img
                    src={fw.image}
                    alt={fw.alt}
                    className="w-full h-auto block"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-ink-900/20">
                    <div className="bg-white/90 rounded-full p-3 shadow-lg">
                      <ZoomIn size={20} className="text-ink-700" />
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-ink-900/80 text-gold-400 text-xs font-bold backdrop-blur-sm">
                      {fw.badge}
                    </span>
                  </div>
                </div>

                {/* Copy */}
                <div className="p-6">
                  <h3 className="font-serif font-bold text-ink-900 text-lg mb-1">
                    {fw.title}
                  </h3>
                  <p className="text-gold-600 text-xs font-semibold mb-3">{fw.subtitle}</p>
                  <p className="text-ink-600 text-sm leading-relaxed">{fw.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ASIMOV bridge */}
          <div className="mt-10 rounded-2xl bg-ink-900 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-white font-serif font-bold text-lg mb-1">
                Need the full 251-control audit?
              </p>
              <p className="text-ink-300 text-sm leading-relaxed max-w-xl">
                AI Integrity gives you the community and the frameworks. When your firm
                needs a formal, evidenced AI governance audit — for board sign-off, a
                client requirement, or EU AI Act compliance — that's ASIMOV-AI.
              </p>
            </div>
            <a
              href="https://asimov-ai.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-gold-500 text-gold-400 text-sm font-bold hover:bg-gold-500 hover:text-ink-900 transition-all whitespace-nowrap shrink-0"
            >
              Visit ASIMOV-AI
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink-950/90 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Framework enlarged view"
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {frameworks.filter((fw) => fw.id === lightbox).map((fw) => (
              <div key={fw.id}>
                <img
                  src={fw.image}
                  alt={fw.alt}
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                <p className="text-center text-ink-300 text-sm mt-4">{fw.title}</p>
              </div>
            ))}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-ink-700 text-white flex items-center justify-center text-lg hover:bg-ink-500 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
