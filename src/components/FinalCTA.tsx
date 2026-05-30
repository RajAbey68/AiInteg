import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import { CTA_LABEL } from "@/lib/waitlist";

export default function FinalCTA() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <section className="py-24 px-6 bg-parchment-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink-900 mb-5 text-balance">
            Your Monday morning first step
          </h2>
          <p className="text-xl text-ink-600 mb-8 leading-relaxed">
            Register your interest, and you'll be first through the door when the community
            opens. No sales call. No onboarding sequence. Just a room full of regulated
            professionals figuring out the same thing you are.
          </p>
          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-ink-900 text-white font-bold text-lg hover:bg-ink-700 transition-colors shadow-lg"
          >
            {CTA_LABEL}
            <ArrowRight size={20} />
          </button>
          <p className="mt-4 text-ink-400 text-sm">
            Free forever · No credit card · Regulated professionals only
          </p>
        </div>
      </section>

      <WaitlistModal open={modal} onClose={() => setModal(false)} source="final-cta" />
    </>
  );
}
