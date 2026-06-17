import { X, CheckCircle2 } from "lucide-react";

// Pricing range sourced from typical UK AI consultancy published rates (verified May 2025):
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
    <section id="why" className="py-24 px-6 bg-zinc-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-teal)" }}>
            Why community beats a consultant
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            A consultant deploys the tool.
            <br />
            <span style={{ color: "var(--color-teal)" }}>A community runs it.</span>
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            The software licence costs £25/month. The real cost is the training, the policy,
            and someone to answer questions at 9am on a Tuesday. That's what a community absorbs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded border border-white/5 p-7 bg-zinc-900/10">
            <p className="text-zinc-500 font-mono text-[10px] font-bold uppercase tracking-widest mb-1">
              Traditional AI consultancy
            </p>
            <p className="text-zinc-300 text-lg font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              One project. One invoice. Gone.
            </p>
            <ul className="space-y-3">
              {before.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <X size={14} className="text-red-400 shrink-0 mt-1" />
                  <span className="text-zinc-400 text-xs leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/5">
              <p className="text-zinc-500 text-[10px] leading-relaxed">
                ¹ Source: Typical UK AI consultancy published pricing, verified May 2025.
                "From £1,500" single-solution; "typically £3,000 to £8,000" multi-solution.
                This is representative of standard UK SME AI consulting rates.
              </p>
            </div>
          </div>

          {/* After */}
          <div className="rounded border p-7 bg-zinc-900/40" style={{ borderColor: "var(--color-teal)" }}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-teal)" }}>
              AI Integrity community
            </p>
            <p className="text-white text-lg font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Ongoing. Peer-led. Built for your sector.
            </p>
            <ul className="space-y-3">
              {after.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="shrink-0 mt-1" style={{ color: "var(--color-teal)" }} />
                  <span className="text-zinc-300 text-xs leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/5">
              <p className="text-zinc-400 text-[10px] leading-relaxed">
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
