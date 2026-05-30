/** Placeholder testimonials — replace with real quotes before public launch */
const testimonials = [
  {
    quote:
      "I spent six months paralysed by SRA compliance anxiety before joining. Two community calls later I had a policy in place and three tools trialled. The peers here have done the hard work so you don't have to.",
    name: "Managing Partner",
    firm: "4-partner conveyancing firm, West Midlands",
    metric: "Policy live in 2 weeks",
    initials: "MP",
  },
  {
    quote:
      "The tool library alone is worth joining for. Every tool is tagged by sector and flagged if there are compliance considerations. I've stopped reading vendor blogs entirely.",
    name: "Practice Manager",
    firm: "Regional accountancy firm, South West",
    metric: "3 tools trialled, 1 adopted",
    initials: "PM",
  },
  {
    quote:
      "As a sole practitioner I couldn't afford to get this wrong. The AI usage policy template took 20 minutes to adapt and it's exactly what my PI insurer asked for.",
    name: "Sole Practitioner",
    firm: "Employment law, London",
    metric: "PI insurer satisfied",
    initials: "SP",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-parchment-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mb-3">
            Member stories
          </p>
          <h2 className="font-serif text-4xl font-bold text-ink-900 text-balance">
            Firms like yours, implementing AI
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-white border border-ink-100 p-7 flex flex-col shadow-sm"
            >
              {/* Gold quote mark */}
              <div className="font-serif text-5xl text-gold-300 leading-none mb-4">"</div>
              <p className="text-ink-700 text-sm leading-relaxed flex-1 mb-6">{t.quote}</p>

              {/* Outcome metric */}
              <div className="rounded-lg bg-parchment-100 px-3 py-2 mb-5 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span className="text-xs font-semibold text-gold-700">{t.metric}</span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
                <div className="w-9 h-9 rounded-full bg-ink-900 flex items-center justify-center shrink-0">
                  <span className="text-gold-400 text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                  <p className="text-xs text-ink-400">{t.firm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
