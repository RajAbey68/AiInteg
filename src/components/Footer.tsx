const year = new Date().getFullYear();

const sectors = ["Solicitors", "Accountants", "IFAs", "Architects", "Surveyors", "Consultants"];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-400 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-gold-500 flex items-center justify-center">
                <span className="text-ink-900 font-serif font-bold text-sm">AI</span>
              </div>
              <span className="text-white font-serif font-semibold text-lg">AI Integrity</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-4">
              Practical AI implementation for high street and regional professional services
              firms. Built by practitioners, for practitioners.
            </p>
            <p className="text-xs text-ink-600">
              Grounded in The Digital Law Firm — Law Society Publishing, Q4 2026.
            </p>
          </div>

          {/* Sectors */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Sectors</p>
            <ul className="space-y-2 text-sm">
              {sectors.map((s) => (
                <li key={s}>
                  <a href="#sectors" className="hover:text-gold-400 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Ecosystem</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://asimov-ai.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors"
                >
                  ASIMOV-AI — enterprise audit →
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-gold-400 transition-colors">
                  The Digital Law Firm
                </a>
              </li>
              <li>
                <a
                  href="mailto:raj@ai-integrity.com"
                  className="hover:text-gold-400 transition-colors"
                >
                  Contact Rajiv
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-5 border-t border-ink-800">
              <p className="text-xs text-ink-600">
                Need a formal AI governance audit?
              </p>
              <a
                href="https://asimov-ai.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold-500 hover:text-gold-400 transition-colors"
              >
                ASIMOV-AI — 251-control framework →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ink-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} AI Integrity. All rights reserved.</p>
          <p className="text-ink-600">
            Regulated professionals · UK · High street and regional
          </p>
        </div>
      </div>
    </footer>
  );
}
