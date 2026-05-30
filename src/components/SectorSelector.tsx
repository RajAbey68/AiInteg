import { useState } from "react";
import { Scale, Calculator, TrendingUp, Building2, Ruler, Briefcase, ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity";

const sectors = [
  {
    id: "legal",
    icon: Scale,
    label: "Solicitors",
    subtitle: "1–50 fee earners",
    regulator: "SRA",
    pain: "You know AI is coming. You don't know where to start — and you can't afford to get SRA compliance wrong.",
    gain: "SRA-safe tool recommendations, peer-tested policies, and a community of solicitors who've navigated the same decisions.",
    urgencies: ["SRA Principle 7 — client best interests", "Confidentiality & data residency", "Duty of competence in AI era"],
    example: "A 6-partner conveyancing firm in Birmingham reduced document review time by 40% while remaining SRA-compliant — and shared exactly how in the community.",
  },
  {
    id: "accounting",
    icon: Calculator,
    label: "Accountants",
    subtitle: "Practice to mid-size",
    regulator: "ICAEW / ACCA",
    pain: "AI-powered competitors are undercutting your compliance and advisory work. Your clients are asking whether you use AI.",
    gain: "Tools reviewed against ISQM 1 and ICAEW ethical standards. Case studies from firms like yours.",
    urgencies: ["ISQM 1 quality management", "ACCA ethical standards", "MTD and digital requirements"],
    example: "A 12-person regional accountancy firm automated 70% of routine advisory emails — with an ICO-compliant policy built from the AI Integrity template library.",
  },
  {
    id: "financial",
    icon: TrendingUp,
    label: "Financial Advisers",
    subtitle: "IFAs and wealth managers",
    regulator: "FCA",
    pain: "Consumer Duty and SM&CR make every AI tool decision a named individual's responsibility. The stakes are real.",
    gain: "FCA Consumer Duty-aligned implementation guidance. SM&CR accountability frameworks. Peer IFAs who've already tested the tools.",
    urgencies: ["Consumer Duty — good outcomes", "SM&CR named accountability", "FCA: no new AI rules, existing frameworks apply"],
    example: "An independent IFA in Edinburgh implemented an AI-assisted suitability review workflow — reviewed by the community's FCA compliance group before going live.",
  },
  {
    id: "architecture",
    icon: Building2,
    label: "Architects",
    subtitle: "RIBA registered practices",
    regulator: "ARB / RIBA",
    pain: "AI is reshaping design, specification, and project management — but the professional liability questions aren't answered anywhere.",
    gain: "Implementation guidance for ARB-registered practices. Design AI tools reviewed for PI insurance implications.",
    urgencies: ["ARB Code of Conduct", "Professional indemnity implications", "BIM and AI integration"],
    example: "A 20-person architecture practice introduced AI-assisted specification writing — reducing first-draft time by 60% while maintaining professional sign-off protocols.",
  },
  {
    id: "surveying",
    icon: Ruler,
    label: "Surveyors",
    subtitle: "Chartered and commercial",
    regulator: "RICS",
    pain: "Valuation, compliance reporting, and client-facing documents are all ripe for AI — but RICS professional standards create complexity.",
    gain: "RICS-aware implementation guidance. AI tools tested against the Red Book and professional standards.",
    urgencies: ["RICS professional standards", "Valuation ethics", "AML obligations"],
    example: "A chartered surveying practice in Manchester automated AML client screening documentation — cutting preparation time from 3 hours to 20 minutes per client.",
  },
  {
    id: "consulting",
    icon: Briefcase,
    label: "Consultants",
    subtitle: "Management and specialist",
    regulator: "Sector-dependent",
    pain: "You're advising clients on AI but your own practice isn't using it effectively. That gap is widening every month.",
    gain: "Practical implementation without the vendor hype. Peer benchmarking across consulting disciplines.",
    urgencies: ["Client data confidentiality", "Deliverable quality standards", "Sector-specific regulatory requirements"],
    example: "An independent management consultant used AI Integrity's prompt library to cut report drafting time in half — without compromising client confidentiality.",
  },
];

export default function SectorSelector() {
  const [active, setActive] = useState("legal");
  const sector = sectors.find((s) => s.id === active)!;
  const Icon = sector.icon;

  return (
    <section id="sectors" className="py-24 px-6 bg-parchment-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mb-3">
            Your sector
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink-900 mb-4 text-balance">
            Designed for your profession
          </h2>
          <p className="text-lg text-ink-500 max-w-xl mx-auto">
            The compliance questions, the regulator, and the peer community are
            different in every regulated profession. AI Integrity treats them that way.
          </p>
        </div>

        {/* Sector tab strip */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {sectors.map((s) => {
            const SIcon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  active === s.id
                    ? "bg-ink-900 border-ink-900 text-white shadow-md"
                    : "bg-white border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-900"
                }`}
              >
                <SIcon size={15} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Active sector card */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-ink-200 shadow-xl shadow-ink-900/5">
          {/* Left — dark panel */}
          <div className="bg-ink-900 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                  <Icon size={22} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">{sector.label}</h3>
                  <p className="text-ink-400 text-sm">{sector.subtitle} · {sector.regulator}</p>
                </div>
              </div>

              <p className="text-ink-300 text-sm leading-relaxed mb-6">{sector.pain}</p>

              <div className="space-y-2 mb-8">
                <p className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">
                  Compliance considerations
                </p>
                {sector.urgencies.map((u) => (
                  <div key={u} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                    <span className="text-ink-300 text-sm">{u}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-gold-500 text-gold-400 text-sm font-semibold hover:bg-gold-500 hover:text-ink-900 transition-all self-start"
            >
              Join the {sector.label} group
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Right — light panel */}
          <div className="bg-white p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider mb-4">
                What you get
              </p>
              <p className="text-ink-700 leading-relaxed mb-8">{sector.gain}</p>

              {/* Peer example */}
              <div className="rounded-xl bg-parchment-100 border border-parchment-300 p-5">
                <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2">
                  From the community
                </p>
                <p className="text-sm text-ink-700 leading-relaxed italic">
                  "{sector.example}"
                </p>
              </div>
            </div>

            {/* Regulator badge */}
            <div className="mt-8 flex items-center gap-2 text-xs text-ink-400">
              <span className="px-2 py-0.5 rounded bg-ink-100 font-semibold text-ink-600">
                {sector.regulator}
              </span>
              <span>All guidance aligned to current {sector.regulator} requirements</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
