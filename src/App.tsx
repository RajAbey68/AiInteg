import { useRef, useState } from "react";
import { homepageCopy } from "./content/homepage";

const ASIMOV_AI_URL = "https://asimov-ai.org";
// TODO(owner): rename Skool slug to ai-integrity and update this URL
const SKOOL_URL = "https://skool.com/ghostwriter-tandem-6940";
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
  });
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);
  const submittingRef = useRef(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
      const response = await fetch(
        "https://qcawafyfaqjwolgczhap.supabase.co/functions/v1/lead-intake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        }
      );
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
        <a
          href="/"
          className="text-base font-bold tracking-tight no-underline"
          style={{ color: "var(--color-teal)" }}
        >
          AI Integ
        </a>
        <nav aria-label="Main navigation" className="hidden md:flex gap-8 text-sm">
          <a className="text-zinc-300 hover:text-white transition-colors" href="#services">
            What we do
          </a>
          <a className="text-zinc-300 hover:text-white transition-colors" href="#process">
            How it works
          </a>
          <a className="text-zinc-300 hover:text-white transition-colors" href="#sectors">
            Who we help
          </a>
          <a className="text-zinc-300 hover:text-white transition-colors" href="#about">
            About
          </a>
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
              <a
                href="#process"
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
                  <h3 className="text-base font-bold text-white tracking-tight">{hook.headline}</h3>
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
                  <p className="text-base text-zinc-400 leading-relaxed">{service.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Process */}
          <section
            id="process"
            aria-labelledby="process-heading"
            className="px-6 md:px-12 py-16 border-t border-white/5 max-w-5xl mx-auto"
          >
            <h2 id="process-heading" className="text-xl md:text-2xl font-bold mb-10 tracking-tight">
              {homepageCopy.programme.headline}
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
              {homepageCopy.programme.phases.map((phase, idx) => (
                <li key={phase.name} className="rounded p-6 border border-white/5 bg-zinc-900/10">
                  <p className="text-xl font-bold mb-2" style={{ color: "var(--color-teal)" }}>
                    0{idx + 1}
                  </p>
                  <h3 className="text-base font-bold mb-1">{phase.name}</h3>
                  <p className="text-sm text-zinc-500 block mb-3">{phase.duration}</p>
                  <p className="text-base text-zinc-400 leading-relaxed">{phase.deliverable}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Sectors */}
          <section
            id="sectors"
            aria-labelledby="sectors-heading"
            className="px-6 md:px-12 py-16 border-t border-white/5 max-w-5xl mx-auto"
          >
            <h2 id="sectors-heading" className="text-xl md:text-2xl font-bold mb-10 tracking-tight">
              Sectors of Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {homepageCopy.sectors.map((s) => (
                <div key={s.name} className="rounded p-6 border border-white/5 bg-zinc-900/20">
                  <h3 className="text-base font-bold mb-3 text-zinc-200">{s.name}</h3>
                  <p className="text-base text-zinc-400 leading-relaxed mb-4">
                    <strong className="text-zinc-300">Implementation:</strong> {s.implementation}
                  </p>
                  <p className="text-base text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-300">Expected Outcome:</strong> {s.outcome}
                  </p>
                </div>
              ))}
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
            <h2 id="about-heading" className="text-xl md:text-2xl font-bold mb-6 tracking-tight">
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
        <a
          className="flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs"
          href="#services"
        >
          What we do
        </a>
        <a
          className="flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs"
          href="#process"
        >
          How it works
        </a>
        <a
          className="flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs"
          href="#sectors"
        >
          Who we help
        </a>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center justify-center text-xs font-semibold"
          style={{ color: "var(--color-teal)" }}
        >
          Book a call
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
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="text-base text-red-400 bg-red-950/20 border border-red-500/20 p-3 rounded">
                    {error}
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
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 focus:outline-none focus:border-teal-400"
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
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 focus:outline-none focus:border-teal-400"
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
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 focus:outline-none focus:border-teal-400"
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
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 focus:outline-none focus:border-teal-400"
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
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-base text-zinc-300 focus:outline-none focus:border-teal-400"
                  />
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
                    disabled={loading}
                    className="w-full text-center rounded py-3 text-base font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                  >
                    {loading ? "Sending…" : "Send"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-left">
                <div className="text-base text-zinc-100 bg-zinc-950 border border-white/10 p-4 rounded">
                  Received. We reply within one working day.
                </div>
                <div className="text-center pt-2">
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-base text-zinc-300 underline hover:text-white transition-colors"
                  >
                    {SKOOL_LABEL}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
