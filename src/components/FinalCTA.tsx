import { ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-parchment-50 relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink-900 mb-5 text-balance">
          Your Monday morning first step
        </h2>
        <p className="text-xl text-ink-600 mb-8 leading-relaxed">
          Join the community, post your first question, and get a concrete answer
          from a peer who's been there. No sales call. No onboarding sequence.
          Just a room full of regulated professionals figuring out the same thing you are.
        </p>
        <a
          href={SKOOL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded bg-ink-900 text-white font-bold text-lg hover:bg-ink-700 transition-colors shadow-lg"
        >
          Join AI Integrity — free
          <ArrowRight size={20} />
        </a>
        <p className="mt-4 text-ink-400 text-sm">
          Free forever · No credit card · Regulated professionals only
        </p>
      </div>
    </section>
  );
}
