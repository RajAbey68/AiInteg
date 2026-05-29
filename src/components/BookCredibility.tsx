export default function BookCredibility() {
  const authors = [
    {
      name: "Rajiv Abeysinghe",
      role: "AI Strategy & Automation",
      detail: "AWS Solutions Architect. Enterprise RPA and AI delivery across UK and EU.",
    },
    {
      name: "Nick Lockett",
      role: "Legal Tech Governance",
      detail: "Legal technology governance specialist. Trusted by firms navigating SRA AI guidance.",
    },
    {
      name: "Darren Sylvester",
      role: "Practice Management",
      detail: "Practice management expert. Knows what tools actually survive contact with a real firm.",
    },
    {
      name: "Sushila Nair",
      role: "Cybersecurity & Standards",
      detail: "CISSP, Independent Cybersecurity Adviser. ICO, GDPR, and ISO compliance in practice.",
    },
  ];

  return (
    <section id="book" className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Book block */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs font-medium mb-6">
              Law Society Publishing · Q4 2026
            </div>
            <h2 className="text-4xl font-bold mb-5 text-balance leading-tight">
              Grounded in{" "}
              <span className="text-brand-400">The Digital Law Firm</span>
            </h2>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              The frameworks, checklists, and compliance guidance in this community are
              drawn directly from the 12-chapter manuscript being published by the Law Society.
              Not vendor content. Not thought leadership. Practitioner knowledge under editorial review.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Community members get early access to chapter summaries, the 251-control AI audit
              framework, and the implementation tools developed during the writing process.
            </p>
          </div>

          {/* Authors */}
          <div className="grid sm:grid-cols-2 gap-4">
            {authors.map((author) => (
              <div
                key={author.name}
                className="rounded-xl bg-slate-800 border border-slate-700 p-5"
              >
                <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">
                    {author.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <p className="font-semibold text-white text-sm">{author.name}</p>
                <p className="text-brand-400 text-xs font-medium mb-2">{author.role}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{author.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
