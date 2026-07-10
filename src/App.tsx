import { AlertTriangle, Bot, Briefcase, Calendar, CheckCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { homepageCopy } from "./content/homepage";

const ASIMOV_AI_URL = "https://asimov-ai.org";
const SKOOL_URL = "https://www.skool.com/ghostwriter-tandem-6940";
const SKOOL_LABEL = "Not ready to commission? Join the AI Integrity community — free.";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMIT_TIMEOUT_MS = 15000;

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    organisation: "",
    email: "",
    sector: "",
    what_to_build: "",
    referral_source: "",
    skool_tier: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref") || params.get("referral_source") || "";
      const tier = params.get("tier") || params.get("skool_tier") || "";
      if (ref || tier) {
        setFormData((prev) => ({
          ...prev,
          referral_source: ref,
          skool_tier: tier,
        }));
      }
    }
  }, []);

  // Calculator states
  const [calcEarners, setCalcEarners] = useState(20);
  const [calcRate, setCalcRate] = useState(250);
  const [calcHours, setCalcHours] = useState(4);
  const [calcRealization, setCalcRealization] = useState(75);

  const calcTotalLeakage = calcEarners * calcRate * calcHours * 48;
  const calcRecoverable = Math.round(calcTotalLeakage * (calcRealization / 100));

  // Citations modal state
  const [citationsOpen, setCitationsOpen] = useState(false);

  // Navigation state
  const [view, setView] = useState<"home" | "framework">("home");

  // Firewall interactive state
  const [firewallActiveInput, setFirewallActiveInput] = useState<"email" | "ocr" | "hal">("email");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleNavClick = (targetId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setView("home");
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot — bots fill it, humans never see it. Pretend success, send nothing.
    if (honeypot) {
      setSuccess(true);
      return;
    }
    if (!consent) {
      setError("Please consent to the privacy policy.");
      return;
    }
    if (!EMAIL_PATTERN.test(formData.email)) {
      setError("Enter a valid email address so we can reply.");
      return;
    }
    // Double-submit guard — ref catches re-entry before React re-renders the disabled button.
    if (submittingRef.current) {
      return;
    }
    submittingRef.current = true;
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const LEAD_INTAKE_URL =
        import.meta.env.VITE_SUPABASE_FUNCTION_URL ||
        "https://qcawafyfaqjwolgczhap.supabase.co/functions/v1/lead-intake";

      const submitData = {
        ...formData,
        fax_number: honeypot,
        referral_source: formData.referral_source || undefined,
        skool_tier: formData.skool_tier || undefined,
      };

      const response = await fetch(LEAD_INTAKE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Form submission failed.");
      }
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Request timed out — email us instead and we'll pick it up.");
      } else {
        const message = err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
      }
    } finally {
      clearTimeout(timeoutId);
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col pt-16 font-sans"
      style={{ backgroundColor: "var(--color-black)", color: "var(--color-white)" }}
    >
      {/* TopAppBar */}
      <header className="bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 h-16 w-full fixed top-0 z-50">
        <button
          type="button"
          onClick={() => {
            setView("home");
            if (typeof window.scrollTo === "function") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="text-base font-bold tracking-tight no-underline bg-transparent border-0 cursor-pointer p-0"
          style={{ color: "var(--color-teal)" }}
        >
          AI Integ
        </button>
        <nav aria-label="Main navigation" className="hidden md:flex gap-8 text-sm">
          {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
          <a
            href="#services"
            onClick={(e) => handleNavClick("services", e)}
            className={`transition-colors text-sm font-medium no-underline ${view === "home" ? "text-zinc-300 hover:text-white" : "text-zinc-400 hover:text-white"}`}
          >
            What we do
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
          <a
            href="#process"
            onClick={(e) => handleNavClick("process", e)}
            className="text-zinc-300 hover:text-white transition-colors no-underline text-sm font-medium"
          >
            How it works
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
          <a
            href="#sectors"
            onClick={(e) => handleNavClick("sectors", e)}
            className="text-zinc-300 hover:text-white transition-colors no-underline text-sm font-medium"
          >
            Who we help
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
          <a
            href="#about"
            onClick={(e) => handleNavClick("about", e)}
            className="text-zinc-300 hover:text-white transition-colors no-underline text-sm font-medium"
          >
            About
          </a>
          <button
            type="button"
            onClick={() => setView("framework")}
            className={`transition-colors bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold ${view === "framework" ? "text-teal-400" : "text-zinc-300 hover:text-white"}`}
          >
            Our Framework (CAP)
          </button>
        </nav>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="hidden md:inline-flex text-sm font-semibold border border-white/10 px-4 py-2 rounded hover:border-white/30 transition-all"
          style={{ color: "var(--color-teal)" }}
        >
          Book a scope call
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 pb-24 lg:pb-0 flex flex-col justify-between">
        <div className="flex-1">
          {view === "home" ? (
            <>
              {/* Hero */}
              <section
                aria-labelledby="hero-heading"
                className="px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto"
              >
                <p className="mb-4 text-sm font-semibold" style={{ color: "var(--color-teal)" }}>
                  AI implementation for professional services firms
                </p>
                <h1
                  id="hero-heading"
                  className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight"
                >
                  {homepageCopy.hero.h1}
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed mb-10 font-light">
                  {homepageCopy.hero.subhead}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="font-semibold text-base px-6 py-4 rounded hover:opacity-90 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                  >
                    {homepageCopy.hero.primaryCta.label}
                  </button>
                  {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
                  <a
                    href="#process"
                    onClick={(e) => handleNavClick("process", e)}
                    className="bg-transparent border border-white/10 hover:border-white/30 text-zinc-300 text-base px-6 py-4 rounded transition-all flex items-center justify-center gap-2"
                  >
                    See how the programme works
                  </a>
                </div>
              </section>

              {/* Problem statement — the vendor gap hook */}
              <section
                aria-labelledby="hook-heading"
                className="px-6 md:px-12 py-12 border-t border-white/5 max-w-4xl mx-auto"
              >
                <h2 id="hook-heading" className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
                  {homepageCopy.vendorGapHook}
                </h2>
                <p className="text-base text-zinc-300 leading-relaxed font-medium mb-10">
                  {homepageCopy.hookAnalogy}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {homepageCopy.hooks.map((hook) => (
                    <div
                      key={hook.id}
                      className="space-y-4 border border-white/5 p-6 rounded bg-zinc-900/20"
                    >
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {hook.headline}
                      </h3>
                      <p className="text-base text-zinc-400 leading-relaxed">{hook.body}</p>
                      <p
                        className="text-base font-medium leading-relaxed"
                        style={{ color: "var(--color-teal)" }}
                      >
                        {hook.subhook}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Interactive Assurance Firewall Section */}
              <section
                id="assurance-firewall"
                aria-labelledby="firewall-heading"
                className="px-6 md:px-12 py-16 border-t border-white/5 max-w-4xl mx-auto"
              >
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h2
                    id="firewall-heading"
                    className="text-xl md:text-2xl font-bold mb-4 tracking-tight"
                  >
                    The Assurance Firewall
                  </h2>
                  <p className="text-base text-zinc-400 leading-relaxed font-light">
                    Professional services require 100% predictable, audit-ready data. Here is how we
                    enforce deterministic rules on top of probabilistic AI models to prevent
                    hallucinations and PII leaks.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left Panel: Inputs (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                    <div className="text-left space-y-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Step 1: Raw Unstructured Input
                      </span>
                      <p className="text-xs text-zinc-400 font-light">
                        Select a typical raw input scenario received by a professional services
                        firm:
                      </p>
                    </div>

                    <div className="space-y-2 flex-grow flex flex-col justify-center">
                      {[
                        { id: "email" as const, label: "📧 Client Consultation Email" },
                        { id: "ocr" as const, label: "📄 Scanned OCR Balance Stream" },
                        { id: "hal" as const, label: "🤖 Raw Unverified AI Draft" },
                      ].map((btn) => (
                        <button
                          key={btn.id}
                          type="button"
                          onClick={() => setFirewallActiveInput(btn.id)}
                          className={`w-full text-left px-4 py-3 rounded border text-sm font-medium transition-all ${
                            firewallActiveInput === btn.id
                              ? "border-teal-400 bg-teal-950/20 text-teal-300"
                              : "border-white/5 bg-zinc-900/10 text-zinc-400 hover:border-white/20"
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>

                    <div className="bg-zinc-950 border border-white/5 p-4 rounded text-left font-mono text-xs text-zinc-400 min-h-[100px] flex items-center justify-center">
                      {firewallActiveInput === "email" && (
                        <span>
                          "From: client@firm.com
                          <br />
                          Subject: Dispute
                          <br />
                          Hi, I want to sue my landlord at 12 Baker St. My phone is 07700 900077..."
                        </span>
                      )}
                      {firewallActiveInput === "ocr" && (
                        <span>
                          "[OCR Stream] | M@tter Ref: 489-A | Date: 12/05/2026 | CL1ENT: ACME CORP |
                          TOTAL: L10,500"
                        </span>
                      )}
                      {firewallActiveInput === "hal" && (
                        <span>
                          "AI response draft: Based on Sec 4, you can terminate. For advice, visit
                          http://hallucinated-links.co.uk..."
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center Panel: Glowing Firewall Validator Nodes (3 cols) */}
                  <div className="lg:col-span-3 flex flex-col justify-center items-center py-6 lg:py-0 border-t lg:border-t-0 lg:border-l lg:border-r border-white/5 relative">
                    <div className="absolute inset-0 bg-teal-400/5 blur-xl pointer-events-none rounded-full" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-6 relative">
                      Step 2: Verification
                    </span>

                    <div className="space-y-4 relative w-full px-4">
                      {[
                        { label: "PII Masking Shield", status: "Active" },
                        { label: "Schema Conformance Node", status: "Strict" },
                        { label: "Hallucination Domain Block", status: "Enforced" },
                      ].map((node) => (
                        <div
                          key={node.label}
                          className="flex items-center justify-between bg-zinc-950 border border-teal-500/20 px-3 py-2.5 rounded text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                            <span className="text-zinc-300 font-medium">{node.label}</span>
                          </div>
                          <span className="text-[10px] text-teal-300 font-semibold">
                            {node.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Panel: Deterministic JSON Outputs (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-left">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Step 3: Secure Audit-Ready Output
                      </span>
                      <p className="text-xs text-zinc-400 font-light mt-1">
                        Structured, sanitized data ready to load safely into your core business
                        applications:
                      </p>
                    </div>

                    <div className="bg-zinc-950 border border-white/5 p-4 rounded font-mono text-xs text-teal-300 overflow-x-auto min-h-[220px] flex items-center">
                      <pre className="w-full">
                        {firewallActiveInput === "email" &&
                          JSON.stringify(
                            {
                              sender_id: "masked_user_449",
                              extracted_intent: "tenant_dispute",
                              extracted_entities: {
                                address: "12 Baker St",
                                phone: "[MASKED_PII_001]",
                              },
                              attachment_status: "scanned_for_viruses_ok",
                            },
                            null,
                            2
                          )}
                        {firewallActiveInput === "ocr" &&
                          JSON.stringify(
                            {
                              matter_ref: "489-A",
                              date_parsed: "2026-05-12",
                              client_name: "ACME CORP",
                              total_due_gbp: 10500.0,
                              ocr_confidence: 0.992,
                            },
                            null,
                            2
                          )}
                        {firewallActiveInput === "hal" &&
                          JSON.stringify(
                            {
                              draft_status: "rejected",
                              validation_errors: [
                                "Unverifiable domain reference blocked: hallucinated-links.co.uk",
                                "Section 4 citations mismatched with loaded precedent database",
                              ],
                            },
                            null,
                            2
                          )}
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Differentiator Text Block */}
              <section className="px-6 md:px-12 py-10 bg-zinc-900/20 border-t border-b border-white/5 font-light text-zinc-400 text-base leading-relaxed">
                <div className="max-w-4xl mx-auto">
                  <span className="text-base font-semibold block mb-2 text-zinc-200">
                    The difference:
                  </span>
                  {homepageCopy.differentiator}
                </div>
              </section>

              {/* Services */}
              <section
                id="services"
                aria-labelledby="services-heading"
                className="px-6 md:px-12 py-16 max-w-5xl mx-auto"
              >
                <h2
                  id="services-heading"
                  className="text-xl md:text-2xl font-bold mb-10 tracking-tight"
                >
                  What We Deliver
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "AI Integration",
                      description:
                        "Connect LLMs, embeddings, and retrieval systems to your existing product. Fixed deliverables. Defined acceptance criteria. No ambiguity on what done means.",
                    },
                    {
                      title: "Production Handover",
                      description:
                        "We don't stop at a demo. We hand over running systems with documentation, observability, and a 30-day post-launch support window baked into the engagement.",
                    },
                    {
                      title: "AI Governance Referral",
                      description:
                        "Implementation and governance are distinct disciplines. When boards need standing AI risk counsel, we refer to ASIMOV AI — our sister advisory practice. The conflict wall applies both ways: separate engagement teams, no shared client files, and an ASIMOV audit verdict is never contingent on AI Integ winning the build.",
                    },
                  ].map((service) => (
                    <article
                      key={service.title}
                      className="rounded p-6 border border-white/5 bg-zinc-900/10 hover:border-white/10 transition-colors"
                    >
                      <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-teal)" }}>
                        {service.title}
                      </h3>
                      <p className="text-base text-zinc-400 leading-relaxed">
                        {service.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Maze to Machine Governance Section */}
              <section
                id="maze-to-machine"
                aria-labelledby="governance-heading"
                className="px-6 md:px-12 py-16 border-t border-white/5 max-w-5xl mx-auto"
              >
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2
                    id="governance-heading"
                    className="text-xl md:text-2xl font-bold mb-4 tracking-tight"
                  >
                    Governance: Maze to Machine
                  </h2>
                  <p className="text-base text-zinc-400 leading-relaxed font-light">
                    Compliance is not a document to be filed. It is software that operates. We
                    convert traditional regulatory compliance guidelines into machine-enforced
                    validators.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  {/* Left Card: The Maze */}
                  <div className="border border-red-500/10 bg-zinc-950 p-6 md:p-8 rounded flex flex-col justify-between group hover:border-red-500/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                          Traditional Compliance (The Maze)
                        </span>
                        <span className="text-[10px] bg-red-950/30 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                          Static & Ignored
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-200 mb-3">
                        150-Page Policy Binders
                      </h3>
                      <p className="text-base text-zinc-400 leading-relaxed font-light mb-6">
                        Risk advisors hand you slide decks and policy guidelines. They outline what
                        you *should* check (PII protection, conflict rules, license constraints).
                        But developers rarely read them, and human compliance teams audit files
                        weeks *after* the errors have occurred.
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-4 text-xs font-mono text-zinc-500 space-y-1 text-left">
                      <div>✗ Manual quarterly sampling audits</div>
                      <div>✗ No technical prevention mechanisms</div>
                      <div>✗ Disconnected from live code repositories</div>
                    </div>
                  </div>

                  {/* Right Card: The Machine */}
                  <div className="border border-teal-500/10 bg-zinc-950 p-6 md:p-8 rounded flex flex-col justify-between group hover:border-teal-500/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: "var(--color-teal)" }}
                        >
                          AI-Integ Methodology (The Machine)
                        </span>
                        <span
                          className="text-[10px] bg-teal-950/30 px-2 py-0.5 rounded border border-teal-500/20"
                          style={{ color: "var(--color-teal)" }}
                        >
                          Enforced in Real-Time
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-200 mb-3">
                        Automated Runtime Validators
                      </h3>
                      <p className="text-base text-zinc-400 leading-relaxed font-light mb-6">
                        We translate the compliance PDF into actual system checkers. Code linters
                        block unauthorized dependencies, database triggers mask PII, and automated
                        testing checks audit logs before a lead or file is processed. If a rule is
                        violated, the system stops the transaction in real-time.
                      </p>
                    </div>
                    <div
                      className="border-t border-white/5 pt-4 text-xs font-mono space-y-1 text-left"
                      style={{ color: "var(--color-teal)" }}
                    >
                      <div>✓ Real-time validator checks on every API submission</div>
                      <div>✓ Automated daily end-to-end assurance pipeline</div>
                      <div>✓ Policy changes deployed directly as system code</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Process */}
              <section
                id="process"
                aria-labelledby="process-heading"
                className="px-6 md:px-12 py-16 border-t border-white/5 max-w-5xl mx-auto"
              >
                <h2
                  id="process-heading"
                  className="text-xl md:text-2xl font-bold mb-10 tracking-tight"
                >
                  {homepageCopy.programme.headline}
                </h2>
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
                  {homepageCopy.programme.phases.map((phase, idx) => (
                    <li
                      key={phase.name}
                      className="rounded p-6 border border-white/5 bg-zinc-900/10"
                    >
                      <p className="text-xl font-bold mb-2" style={{ color: "var(--color-teal)" }}>
                        0{idx + 1}
                      </p>
                      <h3 className="text-base font-bold mb-1">{phase.name}</h3>
                      <p className="text-sm text-zinc-500 block mb-3">{phase.duration}</p>
                      <p className="text-base text-zinc-400 leading-relaxed">{phase.deliverable}</p>
                    </li>
                  ))}
                </ol>

                {/* The Continuous Thread Step-by-Step Stepper */}
                <div className="mt-16 border-t border-white/5 pt-12 text-left">
                  <div className="max-w-2xl mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                      Methodology: The Continuous Thread
                    </span>
                    <h3 className="text-lg font-bold text-zinc-200 mt-1 mb-2">
                      Daily End-to-End Assurance Pipelines
                    </h3>
                    <p className="text-sm text-zinc-400 font-light">
                      How do we maintain release velocity without risking regulated compliance?
                      Every delivery runs through our automated testing thread.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      {
                        step: "01",
                        title: "Code Commit",
                        desc: "Developer checks in code changes or workflow updates.",
                        assurance: "Checks syntactic cleanliness using local Biome linters.",
                      },
                      {
                        step: "02",
                        title: "LLM Evaluation",
                        desc: "Automated regression tests run client prompts to detect drift.",
                        assurance: "Verifies model responses maintain schema structure.",
                      },
                      {
                        step: "03",
                        title: "E2E Playwright",
                        desc: "Simulated browser bots test all forms and button clicks.",
                        assurance: "Confirms lead-intake forms operate on mobile viewports.",
                      },
                      {
                        step: "04",
                        title: "Production Shield",
                        desc: "Code updates push to Deno Edge runtime with locked CORS.",
                        assurance: "Ensures the intake endpoint responds within 2 seconds.",
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="border border-white/5 bg-zinc-950 p-5 rounded hover:border-teal-500/30 transition-all duration-200 group relative"
                      >
                        <span className="text-xs font-semibold font-mono text-zinc-500 block mb-2">
                          STEP {item.step}
                        </span>
                        <h4 className="text-sm font-bold text-zinc-200 mb-1 group-hover:text-teal-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light mb-3">
                          {item.desc}
                        </p>
                        <div className="border-t border-white/5 pt-2 mt-auto">
                          <span className="text-[10px] text-zinc-500 font-mono block uppercase">
                            Assurance Guarantee
                          </span>
                          <span className="text-[11px] text-zinc-400 font-light leading-relaxed block mt-0.5">
                            {item.assurance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Sectors */}
              <section
                id="sectors"
                aria-labelledby="sectors-heading"
                className="px-6 md:px-12 py-16 border-t border-white/5 max-w-5xl mx-auto"
              >
                <h2
                  id="sectors-heading"
                  className="text-xl md:text-2xl font-bold mb-10 tracking-tight"
                >
                  Sectors of Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {homepageCopy.sectors.map((s) => (
                    <div key={s.name} className="rounded p-6 border border-white/5 bg-zinc-900/20">
                      <h3 className="text-base font-bold mb-3 text-zinc-200">{s.name}</h3>
                      <p className="text-base text-zinc-400 leading-relaxed mb-4">
                        <strong className="text-zinc-300">Implementation:</strong>{" "}
                        {s.implementation}
                      </p>
                      <p className="text-base text-zinc-400 leading-relaxed">
                        <strong className="text-zinc-300">Expected Outcome:</strong> {s.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Billable Leakage Calculator Section */}
              <section
                id="calculator"
                aria-labelledby="calculator-heading"
                className="px-6 md:px-12 py-16 border-t border-white/5 max-w-4xl mx-auto"
              >
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h2
                    id="calculator-heading"
                    className="text-xl md:text-2xl font-bold mb-4 tracking-tight"
                  >
                    Calculate Your Wasted Billable Hours
                  </h2>
                  <p className="text-base text-zinc-400 leading-relaxed font-light">
                    Professional services firms lose significant revenue to manual data tasks, file
                    retrieval, and administrative triage. Adjust the sliders below to estimate your
                    leakage.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/5 bg-zinc-900/10 p-6 md:p-8 rounded">
                  {/* Sliders Block */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">Fee Earners / Staff</span>
                        <span className="font-semibold text-white">{calcEarners}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={calcEarners}
                        aria-label="Fee Earners"
                        onChange={(e) => setCalcEarners(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">Average Hourly Rate</span>
                        <span className="font-semibold text-white">£{calcRate}/hr</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="600"
                        step="25"
                        value={calcRate}
                        aria-label="Average Hourly Rate"
                        onChange={(e) => setCalcRate(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">Wasted Hours per Week (per person)</span>
                        <span className="font-semibold text-white">{calcHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={calcHours}
                        aria-label="Wasted Hours per Week"
                        onChange={(e) => setCalcHours(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">Time-to-Bill Realization Rate</span>
                        <span className="font-semibold text-white">{calcRealization}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={calcRealization}
                        aria-label="Time-to-Bill Realization Rate"
                        onChange={(e) => setCalcRealization(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                      />
                      <p className="text-[11px] text-zinc-500 mt-1 font-light">
                        How much of the reclaimed hours actually convert to billable work.
                      </p>
                    </div>
                  </div>

                  {/* Outputs Block */}
                  <div className="bg-zinc-950 border border-white/5 p-6 rounded flex flex-col justify-between text-left">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          Total Wasted Capacity
                        </span>
                        <h3 className="text-3xl font-extrabold text-zinc-200 mt-1">
                          £{calcTotalLeakage.toLocaleString()}
                          <span className="text-xs font-normal text-zinc-500 block">
                            per year across the firm
                          </span>
                        </h3>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                          Recoverable Revenue
                        </span>
                        <h3
                          className="text-3xl font-extrabold mt-1"
                          style={{ color: "var(--color-teal)" }}
                        >
                          £{calcRecoverable.toLocaleString()}
                          <span className="text-xs font-normal text-zinc-500 block">
                            added annual billable margin
                          </span>
                        </h3>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="w-full text-center rounded py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                        style={{
                          backgroundColor: "var(--color-teal)",
                          color: "var(--color-black)",
                        }}
                      >
                        Reclaim This Revenue
                      </button>
                      <button
                        type="button"
                        onClick={() => setCitationsOpen(true)}
                        className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors mt-3 bg-transparent border-0 cursor-pointer block mx-auto"
                      >
                        View calculation basis & citations
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bottom CTA */}
              <section className="px-6 md:px-12 py-16 border-t border-white/5 bg-zinc-900/10">
                <div className="max-w-xl mx-auto text-center">
                  <h2 className="text-xl font-bold mb-3 tracking-tight">
                    Ready to scope your project?
                  </h2>
                  <p className="text-base text-zinc-400 mb-4 leading-relaxed">
                    {homepageCopy.pricingSignal}
                  </p>
                  <p className="text-base text-zinc-300 mb-8 leading-relaxed">
                    {homepageCopy.pricingCommitment}
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="rounded px-6 py-3 text-base font-semibold transition-all hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                    >
                      Book a scope call
                    </button>
                    <a
                      href={SKOOL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-white/10 hover:border-white/30 px-6 py-3 text-base transition-colors text-white"
                    >
                      {SKOOL_LABEL}
                    </a>
                  </div>
                </div>
              </section>

              {/* Proof — who answers for the work */}
              <section
                id="about"
                aria-labelledby="about-heading"
                className="px-6 md:px-12 py-16 border-t border-white/5 max-w-4xl mx-auto"
              >
                <h2
                  id="about-heading"
                  className="text-xl md:text-2xl font-bold mb-6 tracking-tight"
                >
                  Who answers for the work
                </h2>
                <p className="text-lg font-bold mb-4" style={{ color: "var(--color-teal)" }}>
                  {homepageCopy.proof.name}
                </p>
                <ul className="list-none p-0 m-0 mb-6 space-y-2">
                  {homepageCopy.proof.credentials.map((credential) => (
                    <li key={credential} className="text-base text-zinc-400 leading-relaxed">
                      {credential}
                    </li>
                  ))}
                </ul>
                <p className="text-base text-zinc-200 leading-relaxed font-medium">
                  {homepageCopy.proof.closingLine}
                </p>
              </section>
            </>
          ) : (
            <div className="px-6 md:px-12 py-16 max-w-5xl mx-auto space-y-24 text-left">
              {/* Framework Hero */}
              <section className="text-center max-w-3xl mx-auto space-y-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-teal-400">
                  The Enterprise Agentic Framework
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                  The Continuous Assurance Protocol
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                  How we build compliant, high-velocity automation for professional services. We
                  don't deliver black boxes; we deliver transparent systems that you own entirely.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="font-semibold text-sm px-5 py-3 rounded hover:opacity-90 active:scale-95 transition-all"
                    style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                  >
                    Book a scope call
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("home")}
                    className="text-sm border border-white/10 hover:border-white/30 text-zinc-300 px-5 py-3 rounded transition-all"
                  >
                    Back to homepage
                  </button>
                </div>
              </section>

              {/* Story Section 1: The SaaS Vulnerability */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/5 pt-16">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    The Problem
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    The Costly SaaS Trap & Data Leakage
                  </h2>
                  <p className="text-base text-zinc-400 leading-relaxed font-light">
                    Renting general-purpose AI platforms from external SaaS vendors comes with
                    hidden liabilities. Your staff uploads confidential client files (like tax
                    records or corporate contracts) into third-party portals, risking massive
                    regulatory breaches. At the same time, seat-licensing fees scale exponentially
                    as your organization grows.
                  </p>
                  <div className="border-l-2 border-red-500/20 pl-4 py-1 text-sm text-zinc-500 font-mono">
                    ✗ Multi-tenant database sharing <br />✗ Leakage of intellectual assets to public
                    training sets <br />✗ Compounding per-user pricing locks
                  </div>
                </div>
                <div className="lg:col-span-6 border border-white/5 rounded-lg overflow-hidden bg-zinc-950 p-2">
                  <img
                    src="/images/saas_vulnerability.png"
                    alt="SaaS Vulnerability and Data Leakage diagram showing broken security nodes"
                    className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </section>

              {/* Story Section 2: Deterministic Blueprinting */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/5 pt-16">
                <div className="lg:col-span-6 lg:order-2 space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                    CAP Phase 1
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Deterministic Blueprinting & System Rules
                  </h2>
                  <p className="text-base text-zinc-400 leading-relaxed font-light">
                    Before we write a single line of software code, we define the exact rules and
                    boundaries of your system. We establish rigid data schemas and verify compliance
                    rules. This ensures that the probabilistic nature of AI engines is strictly
                    controlled by deterministic guardrails, forcing outputs to always conform to
                    audit-ready standards.
                  </p>
                  <div className="border-l-2 border-teal-500/20 pl-4 py-1 text-sm text-zinc-500 font-mono">
                    ✓ Rigid data contracts locked at build-start <br />✓ Safety gates preventing PII
                    and hallucinated responses <br />✓ Complete transparency in decision logic
                  </div>
                </div>
                <div className="lg:col-span-6 lg:order-1 border border-white/5 rounded-lg overflow-hidden bg-zinc-950 p-2">
                  <img
                    src="/images/deterministic_blueprinting.png"
                    alt="Deterministic Blueprinting and System Rules diagram detailing process frameworks"
                    className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </section>

              {/* Story Section 3: The Complete Assurance Protocol */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/5 pt-16">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                    The Loop
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    The Continuous Assurance Loop
                  </h2>
                  <p className="text-base text-zinc-400 leading-relaxed font-light">
                    Our proprietary methodology locks your software in a continuous audit cycle. We
                    move from Inbound Request through the Assurance Gate, run the Automated
                    Workflow, update your Secure Systems of Record, and verify it all with a Daily
                    Verification Audit. This loop eliminates the need for manual sampling checks and
                    guarantees that updates never break your active compliance standards.
                  </p>
                  <div className="border-l-2 border-teal-500/20 pl-4 py-1 text-sm text-zinc-500 font-mono">
                    ✓ End-to-end auditability on every transaction <br />✓ Automated regression
                    testing against model drift <br />✓ Structured verification reports sent daily
                  </div>
                </div>
                <div className="lg:col-span-6 border border-white/5 rounded-lg overflow-hidden bg-zinc-950 p-2">
                  <img
                    src="/images/cap_loop.png"
                    alt="The Continuous Assurance Protocol loop diagram"
                    className="w-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </section>

              {/* Story Section 4: LeadSynch case study */}
              <section className="border-t border-white/5 pt-16 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                    Methodology in Action
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    LeadSynch: Reclaiming Margin without SaaS Overhead
                  </h2>
                  <p className="text-base text-zinc-400 leading-relaxed font-light">
                    Here is a real-world case study of how we build a secure, private pipeline using
                    the Continuous Assurance Protocol.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/5 bg-zinc-900/10 p-6 md:p-8 rounded">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-zinc-200">The Private Cloud Advantage</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">
                      For a B2B professional services client, we deployed **LeadSynch**—an automated
                      lead discovery and qualification system. Instead of paying a software vendor
                      £300/seat every single month, the client **owns the code and database
                      entirely**. It runs securely inside their private cloud workspace.
                    </p>
                    <div className="bg-zinc-950 border border-white/5 p-4 rounded text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Traditional SaaS Cost:</span>
                        <span className="text-red-400 font-semibold">£3,600 / year (per seat)</span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-2">
                        <span className="text-zinc-500">LeadSynch Utility Cost:</span>
                        <span className="text-teal-400 font-semibold">
                          ~£4 / month (API consumption)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-200">Zero Technical Debt</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-light mt-3">
                        Professional services firms bill by the hour and do not want to manage
                        software or write code. We deliver LeadSynch as a **Managed Pipeline
                        Service**. Our continuous verification checks run daily, and we handle all
                        backend model maintenance, meaning the client gets SaaS-grade performance
                        with zero overhead.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="w-full text-center rounded py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                    >
                      Scope a Custom Private Pipeline
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10 bg-zinc-950 px-6 md:px-12 w-full">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
            <span>&copy; {new Date().getFullYear()} AI Integ. All rights reserved.</span>
            <p
              id="service-disclaimer"
              role="note"
              className="text-sm text-zinc-500 max-w-2xl leading-relaxed text-center md:text-left"
            >
              AI Integ provides fixed-scope software delivery services. We are not an advisory or
              consulting firm. For AI governance, regulatory compliance, and board-level AI risk
              counsel, see{" "}
              <a
                href={ASIMOV_AI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
                aria-label="ASIMOV AI — AI governance and risk counsel"
              >
                ASIMOV AI
              </a>
              . Nothing on this site constitutes legal or regulatory advice.{" "}
              <a href="/privacy.html" className="underline hover:text-white transition-colors">
                Privacy notice
              </a>
              .
            </p>
          </div>
        </footer>
      </main>

      {/* BottomNavBar (Mobile Nav, visible on <lg screen) */}
      <nav
        aria-label="Mobile navigation"
        className="bg-zinc-950 border-t border-white/5 fixed bottom-0 w-full flex justify-around py-2.5 px-4 z-50 lg:hidden"
      >
        {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
        <a
          href="#services"
          onClick={(e) => handleNavClick("services", e)}
          className={`flex flex-col items-center justify-center text-xs no-underline ${view === "home" ? "text-zinc-300 hover:text-white" : "text-zinc-400 hover:text-white"}`}
        >
          <Briefcase className="h-4 w-4 mb-1" />
          <span>What we do</span>
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
        <a
          href="#process"
          onClick={(e) => handleNavClick("process", e)}
          className="flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors no-underline text-xs"
        >
          <Calendar className="h-4 w-4 mb-1" />
          <span>How it works</span>
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: Intercept click to switch view state while satisfying test link role */}
        <a
          href="#sectors"
          onClick={(e) => handleNavClick("sectors", e)}
          className="flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors no-underline text-xs"
        >
          <Sparkles className="h-4 w-4 mb-1" />
          <span>Who we help</span>
        </a>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center justify-center text-xs font-semibold bg-transparent border-0 cursor-pointer p-0"
          style={{ color: "var(--color-teal)" }}
        >
          <Bot className="h-4 w-4 mb-1" />
          <span>Book a call</span>
        </button>
      </nav>

      {/* Scope call modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="close"
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <span aria-hidden="true" className="text-lg">
                ✕
              </span>
            </button>

            <h2 className="text-xl font-bold mb-2 text-zinc-100">Book a scope call</h2>
            <p className="text-base text-zinc-400 mb-6 leading-relaxed">
              Three questions. Two minutes. We reply within one working day with whether we can
              build it and what it would take.
            </p>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from humans, catnip for bots */}
                <div aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="fax_number">Fax Number</label>
                  <input
                    type="text"
                    id="fax_number"
                    name="fax_number"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-base text-red-400 bg-red-950/20 border border-red-500/20 p-3 rounded flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="space-y-1 text-left">
                  <label htmlFor="full_name" className="text-sm text-zinc-400 block">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 transition-all duration-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label htmlFor="organisation" className="text-sm text-zinc-400 block">
                    Firm
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 transition-all duration-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label htmlFor="email" className="text-sm text-zinc-400 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 transition-all duration-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label htmlFor="sector" className="text-sm text-zinc-400 block">
                    Sector
                  </label>
                  <select
                    id="sector"
                    required
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 transition-all duration-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30"
                  >
                    <option value="">Select a sector</option>
                    <option value="Legal">Legal</option>
                    <option value="Accountancy">Accountancy</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label htmlFor="what_to_build" className="text-sm text-zinc-400 block">
                    What do you want built?
                  </label>
                  <textarea
                    id="what_to_build"
                    required
                    rows={3}
                    value={formData.what_to_build}
                    onChange={handleInputChange}
                    placeholder="e.g. matter intake triage, workpaper extraction, suitability review"
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 transition-all duration-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      {
                        label: "Matter Triage",
                        text: "Automate client query intake, classify queries, run conflict checks, and surface precedent documents.",
                      },
                      {
                        label: "Workpaper Extraction",
                        text: "Automate extraction and reconciliation of standard workpapers and trial balance commentary.",
                      },
                      {
                        label: "Suitability Review",
                        text: "Monitor and re-verify client portfolios against risk profiles for compliance checks.",
                      },
                    ].map((template) => (
                      <button
                        key={template.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, what_to_build: template.text })}
                        className="text-xs border border-white/10 hover:border-teal-400/50 hover:text-teal-300 rounded-full px-2.5 py-1 text-zinc-400 transition-all"
                      >
                        + {template.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-4 text-left">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-teal-400"
                  />
                  <label htmlFor="privacy-consent" className="text-sm text-zinc-400">
                    We use these details to prepare for your call. Nothing else. No lists, no
                    sharing.{" "}
                    <a
                      href="/privacy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white transition-colors"
                    >
                      Privacy notice
                    </a>
                    .
                  </label>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || submittingRef.current}
                    className="w-full text-center rounded py-3 text-base font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                  >
                    {loading ? "Sending…" : "Send"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-center py-6">
                <div className="flex justify-center">
                  <CheckCircle
                    className="h-16 w-16 animate-pulse"
                    style={{ color: "var(--color-teal)" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Scope Request Received</h3>
                <p className="text-base text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you. One named person accountable (Rajiv Abeysinghe) will review your query
                  and reply within one working day.
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-zinc-500 mb-2">Want support while you wait?</p>
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-semibold border border-white/10 hover:border-white/20 hover:bg-zinc-950 px-4 py-2.5 rounded transition-all"
                    style={{ color: "var(--color-teal)" }}
                  >
                    Join the AI Integrity community on Skool — free
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Citations Modal */}
      {citationsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-left">
            <button
              type="button"
              onClick={() => setCitationsOpen(false)}
              aria-label="close"
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <span aria-hidden="true" className="text-lg">
                ✕
              </span>
            </button>

            <h2 className="text-xl font-bold mb-4 text-zinc-100">How We Calculate These Figures</h2>

            <div className="space-y-6 text-sm text-zinc-400 leading-relaxed font-light">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">
                  1. Time Lost on Admin Work
                </h3>
                <p>
                  Business studies show that office staff spend an average of{" "}
                  <strong>1.8 hours every day</strong> (nearly 20% of their working week) just
                  searching for files, retrieving documents, and dealing with administrative
                  clutter.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">
                  2. Forgotten Work Hours
                </h3>
                <p>
                  When work is not tracked automatically, small tasks like phone calls, quick
                  replies, and client updates get forgotten. Research indicates companies lose over{" "}
                  <strong>20% of their billable capacity</strong> to these untracked minutes.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">
                  3. Realization Rate (What is actually billed)
                </h3>
                <p>
                  Not every hour saved becomes a paid hour. Industry benchmarks show that businesses
                  collect around <strong>85%</strong> of their recorded work. We apply a
                  conservative <strong>75% realization rate</strong> in our default calculation to
                  keep your projections realistic.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">
                  4. Calculation Assumptions
                </h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    <strong>Gross Capacity:</strong> Fee Earners × Hourly Rate × Wasted Hours/Week ×
                    48 working weeks per year (accounting for standard holiday, sickness, and public
                    holiday allowances).
                  </li>
                  <li>
                    <strong>Net Recoverable Revenue:</strong> Gross capacity adjusted by your
                    selected Realization Rate slider, acknowledging that some administrative time
                    will simply be recovered as personal breathing room for staff rather than extra
                    client bills.
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <button
                type="button"
                onClick={() => setCitationsOpen(false)}
                className="w-full text-center rounded py-2 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
