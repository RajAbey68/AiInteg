const authors = [
  {
    initials: "RA",
    name: "Rajiv Abeysinghe",
    role: "AI Strategy & Automation",
    detail: "AWS Solutions Architect. Enterprise RPA and AI delivery across UK and EU. AI governance adviser.",
  },
  {
    initials: "NL",
    name: "Nick Lockett",
    role: "Legal Tech Governance",
    detail: "Legal technology governance specialist. Trusted by firms navigating SRA AI guidance.",
  },
  {
    initials: "DS",
    name: "Darren Sylvester",
    role: "Practice Management",
    detail: "Practice management expert. Knows what tools actually survive contact with a real firm.",
  },
  {
    initials: "SN",
    name: "Sushila Nair",
    role: "CISSP · Cybersecurity & Standards",
    detail: "Independent Cybersecurity Adviser. ICO, GDPR, and ISO compliance in practice.",
  },
];

export default function BookCredibility() {
  return (
    <section id="book" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Top rule */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent mb-16" />

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — editorial block */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-ink-200 text-xs text-ink-500 font-medium mb-6">
              Law Society Publishing · Q4 2026
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink-900 mb-5 text-balance leading-tight">
              Grounded in{" "}
              <span className="italic text-gold-600">The Digital Law Firm</span>
            </h2>
            <p className="text-lg text-ink-600 mb-5 leading-relaxed">
              The frameworks, checklists, and compliance guidance in this community are
              drawn from the 12-chapter manuscript under editorial review by the Law Society.
              Not vendor content. Not thought leadership.
            </p>
            <p className="text-ink-500 leading-relaxed mb-8">
              Practitioner knowledge under editorial scrutiny — the same standard
              that applies to any Law Society publication.
            </p>
            <p className="text-sm font-semibold text-ink-700 border-l-2 border-gold-400 pl-4">
              Community members receive early access to chapter summaries, the
              251-control AI audit framework, and implementation tools developed
              during the writing process.
            </p>
          </div>

          {/* Right — author cards */}
          <div className="grid grid-cols-2 gap-4">
            {authors.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-ink-100 bg-parchment-50 p-5 hover:border-gold-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-ink-900 flex items-center justify-center mb-3">
                  <span className="text-gold-400 font-serif font-bold text-sm">
                    {a.initials}
                  </span>
                </div>
                <p className="font-serif font-bold text-ink-900 text-sm mb-0.5">{a.name}</p>
                <p className="text-gold-600 text-xs font-semibold mb-2">{a.role}</p>
                <p className="text-ink-500 text-xs leading-relaxed">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent mt-16" />
      </div>
    </section>
  );
}
