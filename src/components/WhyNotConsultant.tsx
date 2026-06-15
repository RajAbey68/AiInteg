import { X, CheckCircle2 } from "lucide-react";

// Pricing range sourced from theaiconsultancy.ai (verified May 2026):
// "from £1,500" single-solution, "typically £3,000 to £8,000" multi-solution.
const before = [
  { text: "Project fees from £1,500 for a single tool deployment¹" },
  { text: "Some offer retainers — but most engagements end at deployment" },
  { text: "Limited ongoing guidance as your regulator's AI position evolves" },
  { text: "No peer network to ask: 'what did you do when this happened?'" },
  { text: "Recommendations shaped by the consultant's partnerships, not peer evidence" },
];

const after = [
  { text: "Free community entry; paid membership from £49/month" },
  { text: "Ongoing — the community continues as the AI technology shifts" },
  { text: "Compliance updates as FCA, ICO, and professional body guidance evolves" },
  { text: "Peer Q&A with solicitors, accountants, IFAs, and architects at similar firms" },
  { text: "Vetted tool library built by practitioners, reviewed for your regulator" },
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
                ¹ Source: theaiconsultancy.ai published pricing, verified May 2026.
                "From £1,500" single-solution; "typically £3,000 to £8,000" multi-solution.
                This is the only UK firm in our verified research set with published SME pricing.
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
                Free to join. AI technology shifts every quarter.
                That's not a problem a one-off engagement was ever going to solve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
