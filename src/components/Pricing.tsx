import { CheckCircle2, ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity";

const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "Start here. Everything you need to get moving.",
    cta: "Join free on Skool",
    ctaHref: SKOOL_URL,
    primary: false,
    features: [
      "Community forum (all sectors)",
      "Vetted tool library access",
      "AI usage policy template",
      "Monthly implementation call (recording)",
      "Sector working groups",
    ],
  },
  {
    name: "Member",
    price: "£49",
    period: "/month",
    description: "For firms actively implementing AI and wanting guided support.",
    cta: "Start implementing",
    ctaHref: SKOOL_URL,
    primary: true,
    badge: "Most popular",
    features: [
      "Everything in Community",
      "Full course library (Crawl → Fly)",
      "Direct Q&A with the authors",
      "Compliance template pack (12 documents)",
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
      "Up to 5 team seats",
      "Quarterly strategy call with Rajiv",
      "Bespoke tool selection review",
      "Custom staff training template",
      "Referral to ASIMOV audit if needed",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance">
            Start free. Scale when you're ready.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Most firms get everything they need from the free community.
            Paid tiers exist for firms that want structure and accountability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-7 flex flex-col relative ${
                tier.primary
                  ? "bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-200"
                  : "bg-white border-slate-200"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <p className={`font-semibold text-sm mb-1 ${tier.primary ? "text-brand-200" : "text-slate-500"}`}>
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-bold ${tier.primary ? "text-white" : "text-slate-900"}`}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className={`text-sm ${tier.primary ? "text-brand-200" : "text-slate-400"}`}>
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${tier.primary ? "text-brand-100" : "text-slate-500"}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2
                      size={15}
                      className={`shrink-0 mt-0.5 ${tier.primary ? "text-brand-200" : "text-brand-400"}`}
                    />
                    <span className={`text-sm ${tier.primary ? "text-brand-50" : "text-slate-600"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.ctaHref}
                target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-colors ${
                  tier.primary
                    ? "bg-white text-brand-600 hover:bg-brand-50"
                    : "bg-brand-500 text-white hover:bg-brand-600"
                }`}
              >
                {tier.cta}
                <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
