import { Search, Wrench, ShieldCheck, TrendingUp } from "lucide-react";

const phases = [
  {
    icon: Search,
    phase: "Crawl",
    title: "Know where you stand",
    description:
      "Start with an honest audit of where AI can save time in your firm today. No transformation required. We give you a checklist built from the 251-control ASIMOV framework — simplified for firms without an IT department.",
    timeframe: "Week 1–2",
  },
  {
    icon: Wrench,
    phase: "Walk",
    title: "Pick the right tools",
    description:
      "Get vetted, peer-tested tool recommendations for your sector. Every tool in our library has been reviewed for SRA, ICO, and FCA compliance implications. You choose what fits your budget and workflow.",
    timeframe: "Month 1–2",
  },
  {
    icon: ShieldCheck,
    phase: "Run",
    title: "Operate with confidence",
    description:
      "Build the internal policies, client disclosures, and governance habits that regulators expect. Our templates are ready to adapt — not generic GDPR boilerplate but guidance written for professional services.",
    timeframe: "Month 3–6",
  },
  {
    icon: TrendingUp,
    phase: "Fly",
    title: "Compete on AI capability",
    description:
      "Once your foundation is solid, learn how leading firms are using AI for advice, business development, and service differentiation. Case studies from the community, not vendor press releases.",
    timeframe: "Month 6+",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
            How it works
          </p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance">
            Crawl. Walk. Run. Fly.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A four-phase implementation model designed for firms who need results,
            not roadmaps. Start where you are. Move at your pace.
          </p>
        </div>

        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-8 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-0.5 bg-brand-100 z-0" />

          <div className="grid md:grid-cols-4 gap-6 relative z-10">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={phase.phase} className="flex flex-col">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center shadow-md shadow-brand-200 mb-2">
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
                      {phase.phase}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-100 p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{phase.title}</h3>
                      <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{phase.timeframe}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{phase.description}</p>
                  </div>

                  {i < phases.length - 1 && (
                    <div className="md:hidden flex justify-center my-4 text-brand-300">▼</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
