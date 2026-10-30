/**
 * Gulf delivery page copy.
 * Source: Raj's 27 Oct 2026 brief (verbatim points) + the agreed positioning verdict:
 * outcome ownership, each client's applicable rules (no blanket Gulf-wide promise),
 * correct UAE PDPL / Saudi PDPL framing, scoped 30/60/90-day reviews.
 */
export const gulfCopy = {
  seo: {
    title: "AI Integ Gulf — Your outcome. Our responsibility.",
    description:
      "AI delivery for the Gulf. A named delivery lead, agreed acceptance tests, and data handled around the local rules that apply to your business.",
  },
  hero: {
    eyebrow: "AI delivery for the Gulf",
    h1a: "Your outcome.",
    h1b: "Our responsibility.",
    lead: "Working AI. A named delivery lead. Data handled around the local rules that apply to your business.",
    gulfWay:
      "We do it the Gulf way, following the local rules. We agree what success looks like, build against it and hand over a system your team can run. From the first data decision to the 90-day review, you know who answers for the work.",
    primaryCta: "Let's scope your outcome",
    proofPoints: ["Agreed acceptance tests", "Clear data location", "30 / 60 / 90-day reviews"],
  },
  accountability: {
    eyebrow: "Accountable from day one",
    h2: "One lead. A clear definition of done.",
    body: "Before the build, we agree the business result, the acceptance tests and the person responsible for delivery. Progress is measured against those tests, with a clear route for decisions and escalation.",
    steps: [
      {
        number: "01",
        h3: "Start with the result",
        body: "Choose a workflow, set the baseline and agree how we will measure improvement.",
      },
      {
        number: "02",
        h3: "Build for your environment",
        body: "Connect the system to your work, with the data controls and human checks the use case needs.",
      },
      {
        number: "03",
        h3: "Prove it before handover",
        body: "Test against the agreed criteria, train your owner and make the operating responsibilities clear.",
      },
    ],
  },
  data: {
    eyebrow: "Built for local requirements",
    h2a: "Your data has a place.",
    h2b: "You should know where.",
    body: "We map where data is stored, where AI processes it and who can access it before selecting the platform. That includes prompts, documents, logs, backups and support access.",
    cards: [
      {
        tag: "Public information",
        h3: "Approved AI services",
        body: "Choose services that fit the task, usage rights and your policies. Public does not mean unrestricted.",
      },
      {
        tag: "Business data",
        h3: "Controlled business environments",
        body: "Agree hosting location, access, retention and model-provider terms. Choose UAE or Saudi hosting where the engagement requires it.",
      },
      {
        tag: "Sensitive or regulated data",
        h3: "Private, in-country where required",
        body: "Design for the applicable sector rules, with restricted access and any required approvals before live data is used.",
      },
    ],
    caveat:
      "These are delivery choices, not universal legal categories. The right setup depends on your country, sector, contracts and regulator.",
    detailsSummary: "The local rules behind the design",
    details: [
      "For UAE and Saudi engagements, discovery identifies the applicable personal-data regime, including UAE PDPL or Saudi PDPL, relevant free-zone rules and sector requirements. Banking, health and government use cases need their own checks. Cross-border processing is assessed rather than assumed to be permitted or prohibited.",
      "Where specialist legal or regulatory advice is needed, we identify it before the deployment decision. Data residency is one part of the design, alongside access, security and operational control.",
    ],
    sourcesLabel: "Primary-source checks:",
    sources: [
      {
        label: "UAE PDPL",
        href: "https://www.uaelegislation.gov.ae/en/legislations/1972/download",
      },
      {
        label: "Saudi transfer regulation",
        href: "https://sdaia.gov.sa/Documents/RegulationonPersonalDataEN.pdf",
      },
      {
        label: "SAMA cloud controls",
        href: "https://www.rulebook.sama.gov.sa/en/343-cloud-computing-0",
      },
    ],
  },
  handover: {
    eyebrow: "Ownership you can see",
    h2a: "More than a system that works.",
    h2b: "A system you can own.",
    body: "Handover includes the working system and the knowledge to operate it. You receive:",
    deliverables: [
      {
        title: "The working system",
        body: "Test results against the agreed acceptance criteria and access to the agreed project assets.",
      },
      {
        title: "The operating instructions",
        body: "Documentation, runbooks and a trained internal owner.",
      },
      {
        title: "The AI decision record",
        body: "The system's purpose, data sources, model and workflow choices, test evidence, known limits and human approval points.",
      },
      {
        title: "The fallback plan",
        body: "What to monitor, when to escalate, who responds and how to pause or recover the workflow.",
      },
    ],
    note: "The decision record documents the system and its controls. It does not claim access to a model's hidden reasoning.",
  },
  reviews: {
    eyebrow: "After handover",
    h2: "We stay with the outcome.",
    body: "We check in at 30, 60 and 90 days to review what is working, what your team is using and what needs attention.",
    milestones: [
      {
        when: "30 days",
        h3: "Settle into operation",
        body: "Review use, early issues and your team's confidence with the system.",
      },
      {
        when: "60 days",
        h3: "Check the result",
        body: "Compare the agreed measures with the baseline and identify practical improvements.",
      },
      {
        when: "90 days",
        h3: "Agree what comes next",
        body: "Review ownership, remaining risks and the next useful step.",
      },
    ],
    note: "Reviews are scoped in the engagement. Ongoing operations, incident response and additional development are agreed separately.",
  },
  team: {
    eyebrow: "On the ground in the Gulf",
    h2: "Business development, Gulf region",
    name: "Manju Ramachandran",
    bio: "Manju Ramachandran brings over 25 years of BFSI and enterprise technology experience across the UAE and India. Her work connects business strategy with implementation across lending, HR and legal operations, helping Gulf organisations turn AI potential into measurable business outcomes.",
    note: "Engagements are scoped, contracted and delivered through AI Integ.",
  },
  contact: {
    eyebrow: "Start with one real business problem",
    h2a: "What should AI change",
    h2b: "for your business?",
    body: "Tell us the workflow, the result you need and the country your data operates in. We'll scope the next step around that.",
    primaryCta: "Let's scope your outcome",
    note: "Delivery through AI Integ. Separate governance and assurance advice can be scoped through ASIMOV AI.",
  },
} as const;
