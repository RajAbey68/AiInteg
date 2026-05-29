import { ArrowRight, CheckCircle2 } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity";

const proof = [
  "SRA · ICO · FCA compliant frameworks",
  "Built for high street and regional firms",
  "Grounded in The Digital Law Firm",
];

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-brand-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          For law firms · accountants · consultants
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6 text-balance">
          AI that works for{" "}
          <span className="text-brand-500">your firm</span>,
          <br />
          not just the big four
        </h1>

        {/* Sub */}
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          A practical community for high street and regional professional services firms
          implementing AI — without the enterprise price tag, the consultancy jargon,
          or the compliance risk.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-base hover:bg-brand-600 transition-colors shadow-md shadow-brand-200"
          >
            Join the community free
            <ArrowRight size={18} />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-base border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Proof strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {proof.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-sm text-slate-500">
              <CheckCircle2 size={15} className="text-brand-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
