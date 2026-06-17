export const homepageCopy = {
  hero: {
    h1: "We build the AI system. We own what ships.",
    subhead:
      "You get a working system in production — tested, documented, handed over with the skills to run it. Not a slide deck. Not a proof of concept that dies in staging.",
    primaryCta: { label: "Scope your project", href: "/scope" },
    secondaryCta: { label: "See how the programme works", href: "/programme" },
  },
  differentiator:
    "A consultancy hands you a plan and invoices you for the thinking. We hand you a system and invoice you for the delivery. If it does not run in production, we have not finished. Every engagement ends with something your team can operate, extend, and own — not a recommendation that sits in a folder.",
  hooks: [
    {
      id: "outcome-contrast",
      headline: "We don't sell powerpoints. We don't deliver speculative pilots.",
      body: "A consultancy hands you a plan and invoices you for the thinking. We hand you a system and invoice you for the delivery. We engineer resilient, production-ready AI pipelines that own business outcomes. If it does not run in production, we have not finished.",
      subhook: "Resilient, production-ready AI. We own what ships.",
    },
    {
      id: "workflow-reality",
      headline: "Your team spends up to 20% of their billable week hunting for information.",
      body: "Professional services firms are drowning in fragmented data silos, emails, and PDFs. We build the private, secure semantic search and document reasoning systems that return those hours to your bottom line safely, without exposing your data to public models.",
      subhook: "Private semantic search. Safe retrieval. Billable hours saved.",
    },
    {
      id: "value-paradox",
      headline: "If you deploy AI within an hourly-billing model, efficiency erodes your revenue.",
      body: "Many firms fear that automation will reduce their billable hours and damage their top-line. We build the operational multiplier and pricing structures that let your firm transition to highly profitable, value-based pricing, capturing the margin instead of losing it.",
      subhook: "Transition from hourly billing to high-margin value pricing.",
    },
  ],
  programme: {
    headline: "The AI Integ Programme",
    phases: [
      {
        name: "Phase 1 — Discovery",
        duration: "2 weeks",
        deliverable:
          "A scoped technical specification with defined data sources, integration points, and acceptance criteria. Your team and ours agree exactly what 'done' looks like before a line of code is written.",
      },
      {
        name: "Phase 2 — Build",
        duration: "4–12 weeks",
        deliverable:
          "A tested, reviewed, production-deployed AI system. BMAD planning, test-driven development, four-eyes review on every sprint. Every feature covered by automated tests. Nothing promoted to live without both gates cleared.",
      },
      {
        name: "Phase 3 — Handover and Scale",
        duration: "Agreed at project close",
        deliverable:
          "Full system documentation, a trained internal owner, runbooks for common failure modes, and a defined path to extend the system. You are not dependent on us to keep it running.",
      },
    ],
  },
  sectors: [
    {
      name: "Law Firm",
      implementation:
        "Automated matter intake triage — new client queries classified, precedent documents surfaced, and conflict checks run before a fee earner opens the file.",
      outcome:
        "Fee earners recover time previously spent on administrative triage. Intake throughput increases without adding headcount.",
    },
    {
      name: "Accountancy Practice",
      implementation:
        "Automated workpaper extraction and reconciliation — trial balance data mapped, variance flags raised, and routine commentary drafted before the senior reviews.",
      outcome:
        "Senior accountants spend time on judgement, not extraction. Turnaround on standard engagements shortens.",
    },
    {
      name: "IFA / Financial Services",
      implementation:
        "Client portfolio monitoring — automated suitability re-check against current risk profile, flagging cases requiring human review before the annual letter goes out.",
      outcome:
        "Compliance review workload reduced. Adviser time redirected to client relationships and new business.",
    },
    {
      name: "Any Sector",
      implementation:
        "If your organisation has a repeatable, document-heavy, or data-intensive process that consumes skilled time, we scope whether AI can take the load.",
      outcome: "Discovery determines feasibility before any build commitment.",
    },
  ],
  proof: {
    headline: "The delivery lead",
    name: "Rajiv Abeysinghe",
    credentials: [
      "27 years delivering enterprise technology",
      "VMware Tanzu Labs",
      "Computacenter",
      "BCS Chartered IT Professional",
      "AWS Certified Solutions Architect",
      "Co-author, The Digital Law Firm (Law Society Publishing, Q4 2026)",
    ],
    accountabilityStatement:
      "One named delivery lead. Accountable for every sprint, every gate, and the final handover. Not a rotating team of associates.",
  },
  skool: {
    headline: "Post-delivery: the AI Integrity community",
    description:
      "After handover, clients join the AI Integrity community on Skool — peer exchange, implementation case studies, and ongoing support as your system evolves.",
    cta: { label: "Join the community", href: "https://ai-integrity.com" },
  },
  crossLinks: [
    {
      label: "Need a governance audit first?",
      destination: "ASIMOV AI",
      href: "https://asimov-ai.org",
    },
    {
      label: "Not ready to commission?",
      destination: "Start in the AI Integrity community",
      href: "https://ai-integrity.com",
    },
  ],
  pricingSignal:
    "Typical programme: 6–14 weeks · Discovery: fixed fee · Build: sprint-based · Scope confirmed at project intake",
} as const;
