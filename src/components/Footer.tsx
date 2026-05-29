export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <span className="text-white font-semibold">AI Integrity</span>
            </div>
            <p className="text-sm leading-relaxed">
              Practical AI implementation for high street and regional professional services firms.
              Built by practitioners, for practitioners.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-semibold text-sm mb-3">Navigate</p>
            <ul className="space-y-2 text-sm">
              {["Who it's for", "How it works", "Community", "The Book", "Pricing"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related */}
          <div>
            <p className="text-white font-semibold text-sm mb-3">Ecosystem</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://asimov-ai.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  ASIMOV-AI — enterprise audit →
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="hover:text-white transition-colors"
                >
                  The Digital Law Firm (book)
                </a>
              </li>
              <li>
                <a
                  href="mailto:raj@ai-integrity.com"
                  className="hover:text-white transition-colors"
                >
                  Contact Rajiv
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} AI Integrity. All rights reserved.</p>
          <p>
            Need a formal AI governance audit?{" "}
            <a
              href="https://asimov-ai.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300"
            >
              ASIMOV-AI →
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
