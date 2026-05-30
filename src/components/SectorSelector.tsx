import { useState } from "react";
import { Scale, Calculator, TrendingUp, Building2, Ruler, Briefcase, ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import { CTA_LABEL } from "@/lib/waitlist";

const sectors = [
  {
    id: "legal",
    icon: Scale,
    label: "Solicitors",
    subtitle: "3–100 fee earners",
    regulator: "SRA",
    pain: "You know AI is coming. You don't know where to start — and you can't afford to get your legal regulator compliance wrong.",
    gain: "Regulator-aware tool recommendations, peer-tested policies, and a community of solicitors who've navigated the same decisions.",
    urgencies: ["Duty of competence in the AI era", "Confidentiality & data residency", "Client best interests obligations"],
    example: "[COMMUNITY CASE STUDY — to be added from member submissions after launch]",
  },
  {
    id: "accounting",
    icon: Calculator,
    label: "Accountants",
    subtitle: "3–100 professionals",
    regulator: "ICAEW / ACCA / AAT",
    pain: "AI-powered competitors are undercutting your compliance and advisory work. Your clients are asking whether you use it.",
    gain: "Tools reviewed against your professional body's ethical standards. Implementation guidance from practices of the same size.",
    urgencies: ["Professional body ethical standards", "Quality management obligations", "Client data and confidentiality"],
    example: "[COMMUNITY CASE STUDY — to be added from member submissions after launch]",
  },
  {
    id: "financial",
    icon: TrendingUp,
    label: "Financial Advisers",
    subtitle: "3–100 professionals",
    regulator: "FCA",
    pain: "Consumer Duty and SM&CR make every AI tool decision a named individual's responsibility. The FCA has no new AI rules — which means your existing obligations apply directly.",
    gain: "Consumer Duty-aligned implementation guidance. SM&CR accountability frameworks. Peer IFAs and wealth managers who've already worked through the same questions.",
    urgencies: ["Consumer Duty — demonstrable good outcomes", "SM&CR named accountability for AI decisions", "FCA: existing frameworks govern AI (confirmed Feb 2026)"],
    example: "[COMMUNITY CASE STUDY — to be added from member submissions after launch]",
  },
  {
    id: "architecture",
    icon: Building2,
    label: "Architects",
    subtitle: "3–100 professionals",
    regulator: "ARB / RIBA",
    pain: "AI is reshaping design, specification, and project management — but the professional liability questions aren't answered anywhere.",
    gain: "Implementation guidance for ARB-registered practices. AI tools reviewed for professional indemnity and PI insurance implications.",
    urgencies: ["ARB Code of Conduct obligations", "Professional indemnity insurance implications", "BIM and AI workflow integration"],
    example: "[COMMUNITY CASE STUDY — to be added from member submissions after launch]",
  },
  {
    id: "surveying",
    icon: Ruler,
    label: "Surveyors",
    subtitle: "3–100 professionals",
    regulator: "RICS",
    pain: "Valuation, compliance reporting, and client-facing documents are all ripe for AI — but RICS professional standards create complexity.",
    gain: "RICS-aware implementation guidance. AI tools reviewed against RICS professional standards and AML obligations.",
    urgencies: ["RICS professional standards compliance", "Red Book valuation ethics", "AML and client due diligence"],
    example: "[COMMUNITY CASE STUDY — to be added from member submissions after launch]",
  },
  {
    id: "consulting",
    icon: Briefcase,
    label: "Consultants",
    subtitle: "3–100 professionals",
    regulator: "Sector-dependent",
    pain: "You're advising clients on AI but your own practice isn't using it effectively. That gap is widening every month.",
    gain: "Practical implementation guidance without vendor hype. Peer benchmarking across consulting disciplines.",
    urgencies: ["Client data confidentiality obligations", "Deliverable quality and professional standards", "Sector-specific regulatory requirements"],
    example: "[COMMUNITY CASE STUDY — to be added from member submissions after launch]",
  },
];

export default function SectorSelector() {
  const [active, setActive] = useState("legal");
  const [modal, setModal] = useState(false);
  const sector = sectors.find((s) => s.id === active)!;
  const Icon = sector.icon;

  return (
    <>
      <section id="sectors" className="py-24 px-6 bg-parchment-50">
        <div className="max-w-6xl mx-auto">
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

          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-ink-200 shadow-xl shadow-ink-900/5">
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

              <button
                onClick={() => setModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded border border-gold-500 text-gold-400 text-sm font-semibold hover:bg-gold-500 hover:text-ink-900 transition-all self-start"
              >
                {CTA_LABEL}
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="bg-white p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider mb-4">
                  What you get
                </p>
                <p className="text-ink-700 leading-relaxed mb-8">{sector.gain}</p>

                <div className="rounded-xl bg-parchment-100 border border-parchment-300 p-5">
                  <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2">
                    From the community
                  </p>
                  <p className="text-sm text-ink-700 leading-relaxed italic">
                    "{sector.example}"
                  </p>
                </div>
              </div>

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

      <WaitlistModal open={modal} onClose={() => setModal(false)} source={`sector-${active}`} />
    </>
  );
}
