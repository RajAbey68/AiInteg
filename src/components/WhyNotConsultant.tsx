import { X, CheckCircle2 } from "lucide-react";

const before = [
  { text: "Pays £1,500–£8,000 for a single tool deployment" },
  { text: "Consultant deploys, invoices, and disappears" },
  { text: "No answer when SRA or FCA guidance changes" },
  { text: "No peers to ask: 'what did you do when this happened?'" },
  { text: "Buys what the consultant sells, not what peers have tested" },
];

const after = [
  { text: "Free community entry; paid membership from £49/month" },
  { text: "Ongoing — the community runs as the AI landscape changes" },
  { text: "Monthly compliance updates as SRA, FCA, ICAEW guidance evolves" },
  { text: "Direct peer Q&A with solicitors, accountants, IFAs in similar firms" },
  { text: "Vetted tool library built by practitioners, not vendors" },
];

export default function WhyNotConsultant() {
  return (
    <section id="why" className="py-24 px-6 bg-ink-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-3">
            Why community beats a consultant
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5 text-balance">
            A consultant deploys the tool.
            <br />
            <span className="text-gold-400">A community runs it.</span>
          </h2>
          <p className="text-lg text-ink-300 max-w-2xl mx-auto">
            The software licence costs £25/month. The real cost is the training, the policy,
            and someone to answer questions at 9am on a Tuesday. That's what a community absorbs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-2xl bg-ink-800 border border-ink-700 p-7">
            <p className="text-ink-400 font-semibold text-xs uppercase tracking-widest mb-1">
              Traditional AI consultancy
            </p>
            <p className="text-ink-200 font-serif text-lg font-semibold mb-6">
              One project. One invoice. Gone.
            </p>
            <ul className="space-y-3">
              {before.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <span className="text-ink-300 text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-ink-700">
              <p className="text-ink-500 text-xs">
                Source: UK AI consultancy SME project pricing — £1,500 single-solution,
                £3,000–£8,000 multi-solution. Verified May 2026.
              </p>
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl bg-gold-500 border border-gold-400 p-7">
            <p className="text-gold-700 font-semibold text-xs uppercase tracking-widest mb-1">
              AI Integrity community
            </p>
            <p className="text-ink-900 font-serif text-lg font-semibold mb-6">
              Ongoing. Peer-led. Built for your sector.
            </p>
            <ul className="space-y-3">
              {after.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="text-ink-900 shrink-0 mt-0.5" />
                  <span className="text-ink-800 text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-gold-400">
              <p className="text-gold-700 text-xs">
                Free to join. The AI landscape changes every quarter.
                That's not a problem a one-off engagement was ever going to solve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
