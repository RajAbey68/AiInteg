import { X, CheckCircle2 } from "lucide-react";

const consultantProblems = [
  "Deploys one tool, charges £1,500–£8,000, and walks away",
  "No answer when SRA/FCA guidance changes next quarter",
  "No peers to ask 'what did you do when this happened?'",
  "Tells you what to implement — not what others tried and rejected",
];

const communityGains = [
  "Peers who've navigated the same compliance questions at the same firm size",
  "Ongoing: compliance updates, new tool reviews, policy template revisions",
  "A solicitor in Cardiff who solved your exact problem six months ago",
  "What works across law, accounting, and IFA practices — not generic AI advice",
];

export default function WhyNotConsultant() {
  return (
    <section className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-3">
            Why not just hire a consultant?
          </p>
          <h2 className="text-4xl font-bold text-balance mb-4">
            A consultant deploys the tool.
            <br />A community runs it.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The software licence is the easy part. The cost barrier for small firms is
            everything around it — training, policy, ongoing support. That's what
            AI Integrity provides, at a fraction of the project cost.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Consultant column */}
          <div className="rounded-2xl bg-slate-800 border border-slate-700 p-7">
            <p className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-5">
              Traditional AI consultancy
            </p>
            <ul className="space-y-3">
              {consultantProblems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <X size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-slate-700">
              <p className="text-slate-500 text-xs">
                Reference: UK AI consultancy project pricing £1,500–£8,000
                per engagement. Source: verified market research, May 2026.
              </p>
            </div>
          </div>

          {/* Community column */}
          <div className="rounded-2xl bg-brand-500 border border-brand-400 p-7">
            <p className="text-brand-200 font-semibold text-sm uppercase tracking-wider mb-5">
              AI Integrity community
            </p>
            <ul className="space-y-3">
              {communityGains.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                  <span className="text-brand-50 text-sm leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-brand-400">
              <p className="text-brand-200 text-xs">
                Free to join. Ongoing for as long as AI keeps changing — which is
                not a problem that a one-off engagement was ever going to solve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
