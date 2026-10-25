export const homepageCopy = {
  hero: {
    h1: "We build the AI system. We own what ships.",
    subhead:
      "Firms like yours are buying AI tools nobody installs properly. We do the build. We test it against criteria you set. We hand it over running — with one named person accountable for the lot.",
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

  // Vendor-gap hook — approved P0 copy.
  vendorGapHook: "Harvey. Copilot. Clio. Great tools. Zero implementation support.",

  // Analogy line appended to the rendered hook — approved P0 copy.
  hookAnalogy:
    "Buying AI software without implementation is buying a filing system and leaving it in the boxes. The invoice arrives either way.",

  forward: {
    headline: "AI Integ Forward",
    subhead:
      "A six-gate method for rapid prototyping and MVP delivery — proving a build is worth doing before it earns CAP-grade production investment. Same six gates for a five-person ISV or an enterprise division; the deliverables scale, the gates don't.",
    entryFilter: {
      headline: "Entry filter — scoped in the ToR before day one",
      questions: [
        {
          label: "One named owner?",
          detail:
            "Someone specific can accept a working prototype touching real users — not a committee.",
        },
        {
          label: "One friction point?",
          detail: "A single, specific thing worth solving in days — not a backlog.",
        },
        {
          label: "Genuinely unproven?",
          detail:
            "If the answer's already known, that's a Discovery-to-Build engagement, not this.",
        },
      ],
      outcome:
        "All three confirmed in the ToR before Gate 1 starts. Any one fails, this isn't the right engagement.",
    },
    gates: [
      {
        n: 1,
        name: "Shadow",
        desc: "Sit with the people doing the work now.",
        exit: "One friction point named and signed off.",
        purpose:
          "Get direct signal from the people doing the work, not a spec document or a stakeholder's assumption about it.",
        outcome:
          "One friction point, named in one sentence, that the client's owner has agreed is worth solving.",
        steps: [
          "Identify the frontline operator or process to shadow.",
          "Observe for a fixed, short window — days, not weeks.",
          "Note where the manual bottlenecks live and which system holds the ground truth.",
          "Draft the friction point as one plain sentence.",
          "Get the named owner to confirm it in writing.",
        ],
        questions: [
          "Who does this task today, and can we observe it directly?",
          "Where does the process break down or slow down?",
          "If we fixed one thing this month, what would move the needle?",
        ],
        dod: "The friction point is named in one sentence and signed off by a named owner.",
      },
      {
        n: 2,
        name: "Sketch",
        desc: "Model the reality both sides recognise as true.",
        exit: "Both sides confirm the model is accurate.",
        purpose:
          "Turn the messy reality — spreadsheets, SOPs, a broken handoff — into a shared model both sides recognise as true.",
        outcome:
          "A plain-language model of how the work actually happens, distinct from how it's documented.",
        steps: [
          "Pull the raw sources: spreadsheets, SOPs, tickets, whatever holds the real data.",
          "Map inputs, owners, and freshness for each source.",
          "Draft a plain-language model of the workflow around the friction point.",
          "Walk it past the owner and the operator for a reality check.",
          "Revise until both independently confirm it matches what actually happens.",
        ],
        questions: [
          "What does the process actually look like, not what the manual says?",
          "Where does this model disagree with what we were told?",
          "What's missing that we'd need before building anything?",
        ],
        dod: "The owner and the operator both confirm the model is accurate.",
      },
      {
        n: 3,
        name: "Build Thin",
        desc: "One working thing, against real data, in days.",
        exit: "It runs end-to-end on real data.",
        purpose:
          "Prove the core logic works. This is not the production build — it's proving the idea survives contact with real data.",
        outcome:
          "A working prototype that does the one named thing, against real data, however crude.",
        steps: [
          "Scope the thinnest version that touches real — not mocked — data.",
          "Build fast, accepting deliberate technical debt.",
          "Skip anything not required to prove the concept.",
          "Get it running end-to-end for the one friction point only.",
        ],
        questions: [
          "What's the smallest version that proves this works at all?",
          "What can we deliberately skip for now?",
          "Is this running against real data, or a mock?",
        ],
        dod: "The prototype runs against live data and produces a real result.",
      },
      {
        n: 4,
        name: "Prove It Live",
        desc: "Real users, a pre-agreed pass/fail number.",
        exit: "The pre-agreed number is in.",
        purpose:
          "Find out whether the prototype survives contact with real users — evidence instead of opinion.",
        outcome: "A plain pass/fail result against a metric agreed before deployment.",
        steps: [
          "Agree the pass/fail metric in plain numbers before deployment.",
          "Put it in front of a small subset of real users.",
          "Watch them use it and log what breaks.",
          "Score the result against the agreed metric — nothing renegotiated after the fact.",
        ],
        questions: [
          "What number tells us this worked, agreed before we start?",
          "What actually happened when real people used it?",
          "What broke, and does it matter?",
        ],
        dod: "The pre-agreed metric passed or failed. A number, not an impression.",
      },
      {
        n: 5,
        name: "Check the Risk",
        desc: "Accountability, security, validation — ASIMOV-lite.",
        exit: "All three questions answered plainly.",
        purpose:
          "Confirm nothing unsafe carries forward before the work goes further — a short, honest read, not a full audit.",
        outcome:
          "A three-question ASIMOV-lite check, answered plainly, before promotion is considered.",
        steps: [
          "Accountability — is there a named human responsible if this goes wrong?",
          "Security — does it touch anything sensitive that needs containment?",
          "Validation — does the Gate 4 evidence hold up under a second look?",
          "Flag anything uncertain for full audit at Gate 6, rather than guessing here.",
        ],
        questions: [
          "Who is accountable if this goes wrong?",
          "Does this touch anything sensitive?",
          "Does the evidence from Gate 4 hold up?",
        ],
        dod: "All three checks answered plainly: pass, fail, or flagged for full audit at Gate 6.",
      },
      {
        n: 6,
        name: "Promote or Park",
        desc: "Hand to CAP for production hardening, or close it out.",
        exit: "A written promote-or-park decision.",
        purpose:
          "Decide, on evidence, whether this becomes production software or gets shelved — nothing left running in limbo.",
        outcome:
          "Either a hardened, owned, production-grade capability under CAP, or a closed-out experiment.",
        steps: [
          "Confirm the promotion criteria: the live metric held, a named owner wants it kept, it generalises with no client-specific forks.",
          "If yes — hand to CAP for full architecture, QA, documentation, and the full ASIMOV audit.",
          "If no — delete or park it explicitly, with the client told why.",
        ],
        questions: [
          "Does someone with budget want to keep this?",
          "Does it work the same way for the next engagement, or is it a one-off?",
          "If we park it, have we told the client why?",
        ],
        dod: "A written decision: promoted, with an owner and a build ticket — or parked, with a stated reason.",
      },
    ],
    contrast:
      "This isn't a replacement for CAP. If you're hardening something proven, that's CAP — production-grade, zero-debt-tolerant, built to run. AI Integ Forward is what happens before that, while it's still genuinely unknown whether the idea is worth building at all.",
    flexibility:
      "We adapt to how your team already talks about work rather than asking you to learn new vocabulary first. The six gates don't change; the words in front of them do, to match how your team already operates.",
    attribution: [
      {
        who: "Forward-deployed engineering",
        what: "The embed-with-the-client, build-fast, prove-it-live pattern popularised across AI delivery teams (Palantir is the commonly cited origin). Supplies Gates 1–4.",
      },
      {
        who: "BMAD",
        what: "Breakthrough Method for Agile AI-Driven Development, created by Brian Madison and the open-source BMAD-METHOD community (github.com/bmad-code-org/BMAD-METHOD). Supplies the discipline anything promoted at Gate 6 graduates into.",
      },
      {
        who: "ASIMOV framework",
        what: "Accountability, Security, Integrity, Monitoring, Oversight, Validation. Supplies Gate 5's risk check and the full audit anything promoted receives.",
      },
    ],
  },

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
    closingLine: "One person answers for the whole build. Not a rotating cast of associates.",
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

  pricingCommitment:
    "Discovery is a fixed fee, agreed before we start. The build is priced per sprint. You see the number before any code is written.",
} as const;
