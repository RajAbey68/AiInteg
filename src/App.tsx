import { useState } from "react";
import { homepageCopy } from "./content/homepage";

const ASIMOV_AI_URL = "https://asimov-ai.org";

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    job_title: "",
    organisation: "",
    sector: "",
    what_to_build: "",
    timeline: "",
    referral_source: "",
  });
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please consent to the privacy policy.");
      return;
    }
    setLoading(true);
    setError("");
    setRoadmap("");
    try {
      const response = await fetch(
        "https://qcawafyfaqjwolgczhap.supabase.co/functions/v1/lead-intake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Form submission failed.");
      }
      setRoadmap(data.roadmap);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
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
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-sm"
            style={{ color: "var(--color-teal)" }}
          >
            terminal
          </span>
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--color-teal)" }}
          >
            INTEGRITY_OS_V1
          </span>
        </div>
        <div className="hidden md:flex gap-6 text-[10px] font-mono tracking-widest uppercase">
          <a className="text-zinc-100 border-b border-green-400 pb-0.5" href="/">
            L1_SETUP
          </a>
          <a className="text-zinc-400 hover:text-white transition-colors" href="#services">
            SERVICES
          </a>
          <a className="text-zinc-400 hover:text-white transition-colors" href="#process">
            PROCESS
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={ASIMOV_AI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10 px-2 py-1 rounded text-zinc-400 hover:text-white hover:border-white/20 transition-all"
          >
            L2_RISK
          </a>
          <span className="material-symbols-outlined text-sm text-zinc-500">
            settings_input_component
          </span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* NavigationDrawer (Desktop Sidebar) */}
        <aside className="border-r border-white/5 bg-zinc-950/30 hidden lg:flex flex-col pt-20 pb-4 h-screen fixed left-0 top-0 w-64 z-40">
          <div className="px-6 mb-6">
            <span className="font-mono text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
              FRAMEWORK_L1
            </span>
          </div>
          <nav className="flex flex-col gap-1 px-4 font-mono text-xs text-zinc-400">
            <a
              className="bg-green-950/20 border border-green-500/20 text-green-400 rounded mx-2 my-1 p-3 flex items-center gap-3 hover:opacity-95 transition-all"
              href="/"
            >
              <span className="material-symbols-outlined text-sm">memory</span>
              CRAWL_INIT
            </a>
            <a
              className="hover:text-white hover:bg-white/5 rounded mx-2 my-1 p-3 flex items-center gap-3 transition-all"
              href="#process"
            >
              <span className="material-symbols-outlined text-sm">schema</span>
              WALK_STAGED
            </a>
            <a
              className="hover:text-white hover:bg-white/5 rounded mx-2 my-1 p-3 flex items-center gap-3 transition-all"
              href="#process"
            >
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              RUN_DEPLOYED
            </a>
            <a
              className="hover:text-white hover:bg-white/5 rounded mx-2 my-1 p-3 flex items-center gap-3 transition-all"
              href="#services"
            >
              <span className="material-symbols-outlined text-sm">terminal</span>
              TOOLCHAIN
            </a>
          </nav>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 lg:ml-64 pb-24 lg:pb-0 flex flex-col justify-between">
          <div className="flex-1">
            {/* Status Info */}
            <div className="px-6 md:px-12 pt-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/40 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-green-400 tracking-wider">
                  SYSTEM_STATUS: ONLINE
                </span>
              </div>
            </div>

            {/* Hero */}
            <section
              aria-labelledby="hero-heading"
              className="px-6 md:px-12 py-16 md:py-24 max-w-4xl"
            >
              <p
                className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "var(--color-teal)" }}
              >
                L1 TECHNICAL DELIVERY · OUTCOME OBSESSED
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
                  className="bg-green-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider px-6 py-4 rounded hover:bg-green-300 transition-colors flex items-center justify-center gap-2 active:scale-95 transition-all"
                  style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                >
                  <span className="material-symbols-outlined text-sm">login</span>
                  {homepageCopy.hero.primaryCta.label}
                </button>
                <a
                  href="#process"
                  className="bg-transparent border border-white/10 hover:border-white/30 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider px-6 py-4 rounded transition-all flex items-center justify-center gap-2"
                >
                  VIEW_ARCHITECTURE
                </a>
              </div>
            </section>

            {/* Differentiator Text Block */}
            <section className="px-6 md:px-12 py-10 bg-zinc-900/20 border-t border-b border-white/5 font-light text-zinc-400 text-sm leading-relaxed max-w-4xl">
              <span className="font-mono text-xs font-semibold block mb-2 text-zinc-200">
                THE DIFFERENTIATOR:
              </span>
              {homepageCopy.differentiator}
            </section>

            {/* Hooks / Friction Points */}
            <section className="bg-zinc-900/10 py-16 border-b border-white/5 px-6 md:px-12">
              <div className="max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {homepageCopy.hooks.map((hook) => (
                    <div
                      key={hook.id}
                      className="space-y-4 border border-white/5 p-6 rounded bg-zinc-900/20"
                    >
                      <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight">
                        {hook.headline}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {hook.body}
                      </p>
                      <p
                        className="text-[10px] font-mono font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-teal)" }}
                      >
                        {hook.subhook}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Services */}
            <section
              id="services"
              aria-labelledby="services-heading"
              className="px-6 md:px-12 py-16 max-w-5xl"
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
                      "Implementation and governance are distinct disciplines. When boards need standing AI risk counsel, we refer to ASIMOV AI — our sister advisory practice.",
                  },
                ].map((service) => (
                  <article
                    key={service.title}
                    className="rounded p-6 border border-white/5 bg-zinc-900/10 hover:border-white/10 transition-colors"
                  >
                    <h3 className="text-base font-bold mb-3" style={{ color: "var(--color-teal)" }}>
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{service.description}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Process */}
            <section
              id="process"
              aria-labelledby="process-heading"
              className="px-6 md:px-12 py-16 border-t border-white/5 max-w-5xl"
            >
              <h2
                id="process-heading"
                className="text-xl md:text-2xl font-bold mb-10 tracking-tight"
              >
                {homepageCopy.programme.headline}
              </h2>
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
                {homepageCopy.programme.phases.map((phase, idx) => (
                  <li key={phase.name} className="rounded p-6 border border-white/5 bg-zinc-900/10">
                    <p
                      className="font-mono text-xl font-bold mb-2"
                      style={{ color: "var(--color-teal)" }}
                    >
                      0{idx + 1}
                    </p>
                    <h3 className="text-sm font-bold mb-1">{phase.name}</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase block mb-3">
                      {phase.duration}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{phase.deliverable}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Sectors */}
            <section
              id="sectors"
              aria-labelledby="sectors-heading"
              className="px-6 md:px-12 py-16 border-t border-white/5 max-w-5xl"
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
                    <h3 className="font-mono text-xs font-bold tracking-widest uppercase mb-3 text-zinc-200">
                      {s.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      <strong className="text-zinc-300">Implementation:</strong> {s.implementation}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
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
                <p className="text-xs text-zinc-400 mb-8 leading-relaxed">
                  {homepageCopy.pricingSignal}
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="rounded px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                  >
                    Scope Project Now
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="border-t border-white/5 py-10 bg-zinc-950 px-6 md:px-12 w-full">
            <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500">
              <span>&copy; {new Date().getFullYear()} AI Integ. All rights reserved.</span>
              <p
                id="service-disclaimer"
                role="note"
                className="text-[10px] text-zinc-500 max-w-2xl leading-relaxed text-center md:text-left"
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
                . Nothing on this site constitutes legal or regulatory advice.
              </p>
            </div>
          </footer>
        </main>
      </div>

      {/* BottomNavBar (Mobile Nav, visible on <lg screen) */}
      <nav className="bg-zinc-950 border-t border-white/5 fixed bottom-0 w-full flex justify-around py-2.5 px-6 z-50 lg:hidden">
        <a
          className="flex flex-col items-center justify-center text-zinc-500 hover:text-white transition-colors"
          href="#services"
        >
          <span className="material-symbols-outlined text-sm">hub</span>
          <span className="text-[8px] font-mono uppercase tracking-wider mt-1">n8n_NODES</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-zinc-500 hover:text-white transition-colors"
          href="#process"
        >
          <span className="material-symbols-outlined text-sm">code</span>
          <span className="text-[8px] font-mono uppercase tracking-wider mt-1">CURSOR_IDE</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-zinc-500 hover:text-white transition-colors"
          href="#sectors"
        >
          <span className="material-symbols-outlined text-sm">terminal</span>
          <span className="text-[8px] font-mono uppercase tracking-wider mt-1">CLAUDE_CMD</span>
        </a>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center justify-center text-green-400 animate-pulse"
        >
          <span className="material-symbols-outlined text-sm">sensors</span>
          <span className="text-[8px] font-mono uppercase tracking-wider mt-1">STATUS</span>
        </button>
      </nav>

      {/* Scoping Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <h2 className="text-lg font-bold mb-2 font-mono uppercase tracking-widest text-zinc-200">
              Scope Your AI Project
            </h2>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Complete the fields below. Our backend pipeline (Gemini Pro) will generate a custom
              90-day implementation roadmap.
            </p>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="text-xs text-red-400 bg-red-950/20 border border-red-500/20 p-3 rounded">
                    {error}
                  </div>
                )}
                <div className="space-y-1 text-left">
                  <label
                    htmlFor="full_name"
                    className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block"
                  >
                    &gt; FULL_NAME
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-green-400 font-mono"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label
                    htmlFor="organisation"
                    className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block"
                  >
                    &gt; ORGANISATION
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-green-400 font-mono"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label
                    htmlFor="sector"
                    className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block"
                  >
                    &gt; SECTOR
                  </label>
                  <select
                    id="sector"
                    required
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-green-400 font-mono"
                  >
                    <option value="">Select a sector</option>
                    <option value="Legal">Legal</option>
                    <option value="Accountancy">Accountancy</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label
                    htmlFor="what_to_build"
                    className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block"
                  >
                    &gt; WORKFLOW_SPEC
                  </label>
                  <textarea
                    id="what_to_build"
                    required
                    rows={3}
                    value={formData.what_to_build}
                    onChange={handleInputChange}
                    placeholder="What manual processes do you need automated?"
                    className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-green-400 font-mono"
                  />
                </div>
                <div className="flex items-start gap-2 mt-4 text-left">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-green-400"
                  />
                  <label htmlFor="privacy-consent" className="text-[10px] text-zinc-400">
                    I consent to processing in accordance with GDPR regulations.
                  </label>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-center rounded py-3 text-xs font-bold font-mono uppercase tracking-wider transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                  >
                    {loading ? "Generating Roadmap..." : "SUBMIT_AND_GENERATE_ROADMAP"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-left font-mono">
                <div className="text-xs text-green-400 bg-green-950/20 border border-green-500/20 p-3 rounded">
                  ✓ Analysis pipeline complete.
                </div>
                <div className="border border-white/10 bg-zinc-950 p-4 rounded max-h-60 overflow-y-auto text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {roadmap}
                </div>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="inline-flex items-center gap-2 rounded px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
