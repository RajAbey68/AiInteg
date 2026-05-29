/** Placeholder testimonials — replace with real quotes before launch */
const testimonials = [
  {
    quote:
      "I spent six months worried about SRA compliance before joining. Two community calls later I had a policy in place and three tools trialled. The peers here have done the hard work so you don't have to.",
    name: "Managing Partner",
    firm: "4-partner law firm, West Midlands",
    initials: "MP",
  },
  {
    quote:
      "The tool library alone is worth it. Every tool is tagged by what it's actually useful for and flagged if there are compliance considerations. I've stopped reading vendor blogs entirely.",
    name: "Practice Manager",
    firm: "Regional accountancy firm, South West",
    initials: "PM",
  },
  {
    quote:
      "As a sole practitioner I couldn't afford to get this wrong. The AI usage policy template took me 20 minutes to adapt and it's exactly what my PI insurer asked for.",
    name: "Sole Practitioner",
    firm: "Employment law, London",
    initials: "SP",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
            From the community
          </p>
          <h2 className="text-4xl font-bold text-slate-900 text-balance">
            Firms like yours, implementing AI
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-slate-50 border border-slate-100 p-7 flex flex-col"
            >
              {/* Quote mark */}
              <div className="text-4xl text-brand-200 font-serif leading-none mb-4">"</div>
              <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-6">{t.quote}</p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.firm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
