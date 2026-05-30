import { Search, Wrench, ShieldCheck, TrendingUp } from "lucide-react";

const phases = [
  {
    icon: Search,
    phase: "Crawl",
    title: "Know where you stand",
    description:
      "An honest audit of where AI can save time in your firm today — no transformation required. Use our 251-control ASIMOV framework simplified for firms without an IT department.",
    timeframe: "Week 1–2",
    colour: "from-ink-800 to-ink-700",
  },
  {
    icon: Wrench,
    phase: "Walk",
    title: "Pick the right tools",
    description:
      "Vetted, peer-tested tool recommendations for your sector. Every tool in the library has been reviewed for your regulator's compliance implications before it's listed.",
    timeframe: "Month 1–2",
    colour: "from-ink-700 to-ink-600",
  },
  {
    icon: ShieldCheck,
    phase: "Run",
    title: "Operate with confidence",
    description:
      "Build internal policies, client disclosures, and governance habits your regulator expects. Our templates are written for professional services — not copy-pasted from tech boilerplate.",
    timeframe: "Month 3–6",
    colour: "from-ink-600 to-gold-700",
  },
  {
    icon: TrendingUp,
    phase: "Fly",
    title: "Compete on AI capability",
    description:
      "Use AI for advice, business development, and service differentiation. Case studies from the community — not vendor press releases. Real firms. Named outcomes.",
    timeframe: "Month 6+",
    colour: "from-gold-700 to-gold-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 bg-parchment-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink-900 mb-4 text-balance">
            Crawl. Walk. Run. Fly.
          </h2>
          <p className="text-lg text-ink-500 max-w-xl mx-auto">
            A four-phase model designed for firms who need results, not roadmaps.
            Start where you are. Move at your pace.
          </p>
        </div>

        {/* Timeline — vertical on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Horizontal connector — desktop */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-ink-300 via-gold-400 to-gold-500 z-0" />

          <div className="grid md:grid-cols-4 gap-6 relative z-10">
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div key={phase.phase} className="flex flex-col">
                  <div className="flex flex-col items-center mb-5">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${phase.colour} flex flex-col items-center justify-center shadow-lg mb-2`}
                    >
                      <Icon size={22} className="text-white mb-1" />
                      <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                        {phase.phase}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-ink-100 p-5 flex-1 flex flex-col shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif font-bold text-ink-900 leading-tight">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gold-600 font-semibold mb-3">{phase.timeframe}</p>
                    <p className="text-sm text-ink-500 leading-relaxed flex-1">
                      {phase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
