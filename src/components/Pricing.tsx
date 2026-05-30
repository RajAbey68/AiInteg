import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";

const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "Start here. Everything you need to take the first step.",
    cta: "Join the founding cohort",
    primary: false,
    features: [
      "Sector working group (law / accounting / IFA / architecture)",
      "Vetted tool library access",
      "AI usage policy template",
      "Monthly implementation call recording",
      "Peer Q&A forum",
    ],
  },
  {
    name: "Member",
    price: "£49",
    period: "/month",
    annual: "£470/year (save £118)",
    description: "For firms actively implementing and wanting structured support.",
    cta: "Join as a founding member",
    primary: true,
    badge: "Most popular",
    features: [
      "Everything in Community",
      "Full Crawl → Walk → Run → Fly course library",
      "Compliance template pack (12 documents)",
      "Direct Q&A with The Digital Law Firm authors",
      "Early access to book chapters",
      "Monthly group coaching call",
      "Priority tool review requests",
    ],
  },
  {
    name: "Firm",
    price: "£299",
    period: "/month",
    description: "For firms wanting an implementation partner, not just a community.",
    cta: "Talk to us",
    ctaHref: "mailto:raj@ai-integrity.com",
    primary: false,
    features: [
      "Everything in Member",
      "5 team seats",
      "Quarterly strategy call with Rajiv",
      "Bespoke tool selection review",
      "Custom staff training template",
      "Referral to ASIMOV formal audit if needed",
    ],
  },
];

export default function Pricing() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <section id="pricing" className="py-24 px-6 bg-ink-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              Start free. Scale when ready.
            </h2>
            <p className="text-lg text-ink-300 max-w-xl mx-auto">
              Most firms get everything they need from the free community. Paid tiers
              exist for firms that want structure, accountability, and direct author access.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-7 flex flex-col relative ${
                  tier.primary
                    ? "bg-gold-500 border-gold-400 shadow-2xl shadow-gold-500/20 scale-[1.02]"
                    : "bg-ink-800 border-ink-700"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ink-900 border border-gold-500 text-gold-400 text-xs font-bold whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <p className={`font-semibold text-xs uppercase tracking-wider mb-1 ${tier.primary ? "text-gold-700" : "text-ink-400"}`}>
                    {tier.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl font-serif font-bold ${tier.primary ? "text-ink-900" : "text-white"}`}>
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className={`text-sm ${tier.primary ? "text-gold-700" : "text-ink-400"}`}>
                        {tier.period}
                      </span>
                    )}
                  </div>
                  {tier.annual && (
                    <p className={`text-xs mb-2 ${tier.primary ? "text-gold-700" : "text-ink-500"}`}>
                      {tier.annual}
                    </p>
                  )}
                  <p className={`text-sm leading-relaxed ${tier.primary ? "text-gold-800" : "text-ink-400"}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={14}
                        className={`shrink-0 mt-0.5 ${tier.primary ? "text-ink-900" : "text-gold-500"}`}
                      />
                      <span className={`text-sm ${tier.primary ? "text-ink-900" : "text-ink-300"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {tier.ctaHref ? (
                  <a
                    href={tier.ctaHref}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-ink-900`}
                  >
                    {tier.cta}
                    <ArrowRight size={14} />
                  </a>
                ) : (
                  <button
                    onClick={() => setModal(true)}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all ${
                      tier.primary
                        ? "bg-ink-900 text-white hover:bg-ink-700"
                        : "border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-ink-900"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaitlistModal open={modal} onClose={() => setModal(false)} source="pricing" />
    </>
  );
}
