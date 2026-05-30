import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  source?: string; // which CTA triggered it
}

const sectors = [
  "Solicitor / Law firm",
  "Accountant / Accountancy practice",
  "Financial adviser / IFA",
  "Architect",
  "Surveyor",
  "Consultant / Other",
];

export default function WaitlistModal({ open, onClose, source }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [firmSize, setFirmSize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && emailRef.current) {
      setTimeout(() => emailRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!sector) { setError("Please select your sector."); return; }
    setError("");

    // Submit via mailto — no backend required at launch.
    // Swap to Formspree / Beehiiv / Mailchimp endpoint when ready.
    const subject = encodeURIComponent("AI Integrity — Founding Member Request");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSector: ${sector}\nFirm size: ${firmSize}\nSource: ${source ?? "website"}`
    );
    window.location.href = `mailto:raj@ai-integrity.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Gold top bar */}
        <div className="h-1 bg-gradient-to-r from-gold-400 to-gold-600" />

        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-ink-400 hover:text-ink-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle2 size={48} className="text-gold-500 mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-ink-900 mb-3">
                You're on the list
              </h2>
              <p className="text-ink-600 text-sm leading-relaxed mb-6">
                We'll be in touch as soon as the community opens. Founding members
                get first access, locked pricing, and a direct line to the authors.
              </p>
              <button
                onClick={onClose}
                className="text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2
                id="waitlist-title"
                className="font-serif text-2xl font-bold text-ink-900 mb-2"
              >
                Join the founding cohort
              </h2>
              <p className="text-ink-500 text-sm mb-6 leading-relaxed">
                The community opens shortly. Founding members get locked pricing,
                first access to the tool library, and a direct line to the authors.
              </p>

              {error && (
                <p className="text-red-600 text-sm mb-4 bg-red-50 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Ahmed"
                    className="w-full px-4 py-2.5 rounded-lg border border-ink-200 text-ink-900 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Work email <span className="text-red-400">*</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@yourfirm.co.uk"
                    className="w-full px-4 py-2.5 rounded-lg border border-ink-200 text-ink-900 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Your sector <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-ink-200 text-ink-900 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 bg-white"
                  >
                    <option value="">Select your sector…</option>
                    {sectors.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Firm size (optional)
                  </label>
                  <select
                    value={firmSize}
                    onChange={(e) => setFirmSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-ink-200 text-ink-900 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 bg-white"
                  >
                    <option value="">Select…</option>
                    <option>Sole practitioner</option>
                    <option>2–5 people</option>
                    <option>6–15 people</option>
                    <option>16–50 people</option>
                    <option>50+ people</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ink-900 text-white font-bold text-sm hover:bg-ink-700 transition-colors mt-2"
                >
                  Join the founding cohort
                  <ArrowRight size={15} />
                </button>

                <p className="text-xs text-ink-400 text-center">
                  No spam. One email when the community opens.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
