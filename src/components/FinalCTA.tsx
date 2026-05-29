import { ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity";

export default function FinalCTA() {
  return (
    <section className="py-20 px-6 bg-brand-500">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-5 text-balance">
          Your Monday morning first step
        </h2>
        <p className="text-xl text-brand-100 mb-8 leading-relaxed">
          Join the community, post your first question, and get a concrete answer
          from a peer who's been there. No sales call, no onboarding sequence.
          Just a room full of firms figuring out the same thing you are.
        </p>
        <a
          href={SKOOL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-600 font-bold text-lg hover:bg-brand-50 transition-colors shadow-lg"
        >
          Join AI Integrity free
          <ArrowRight size={20} />
        </a>
        <p className="mt-4 text-brand-200 text-sm">
          Free forever. No credit card required.
        </p>
      </div>
    </section>
  );
}
