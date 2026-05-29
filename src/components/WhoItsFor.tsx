import { Scale, Calculator, Briefcase, Users } from "lucide-react";

const personas = [
  {
    icon: Scale,
    title: "Law firms",
    size: "1–50 fee earners",
    pain: "You know AI is coming. You don't know where to start — and you can't afford to get SRA compliance wrong.",
    gain: "Clear first steps, SRA-safe tool recommendations, and peers who've done it already.",
  },
  {
    icon: Calculator,
    title: "Accountants",
    size: "Practice to mid-size",
    pain: "AI-powered competitors are undercutting your compliance and advisory work. Your clients are starting to ask questions.",
    gain: "Tools that work with your workflows, not against them. ICAEW and FRC guidance baked in.",
  },
  {
    icon: Briefcase,
    title: "Consultants",
    size: "Independent to boutique",
    pain: "You're advising clients on AI but your own practice isn't using it. That credibility gap is widening.",
    gain: "A peer network that shares what's actually working, not what looks good in a conference deck.",
  },
  {
    icon: Users,
    title: "Practice managers",
    size: "Any firm size",
    pain: "Admin, billing, and compliance work is eating your day. You need tools that reduce load, not add to it.",
    gain: "Vetted, practical tools ranked by actual time saving. No jargon, no implementation projects.",
  },
];

export default function WhoItsFor() {
  return (
    <section id="who" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
            Who it's for
          </p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance">
            Built for the firms that don't make the headlines
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            High street. Regional. Specialist boutiques. The firms where one wrong tool
            choice affects real clients, not a board presentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 hover:border-brand-200 hover:bg-brand-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={20} className="text-brand-600" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 text-lg">{p.title}</h3>
                      <span className="text-xs text-slate-400">{p.size}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3 leading-relaxed">{p.pain}</p>
                    <p className="text-sm text-brand-700 font-medium leading-relaxed">
                      → {p.gain}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
