import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import { CTA_LABEL } from "@/lib/waitlist";

export default function Testimonials() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <section className="py-24 px-6 bg-parchment-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mb-3">
              Be first
            </p>
            <h2 className="font-serif text-4xl font-bold text-ink-900 text-balance mb-5">
              The community is just opening
            </h2>
            <p className="text-lg text-ink-600 max-w-xl mx-auto mb-8 leading-relaxed">
              We're opening AI Integrity to founding members now — before the FCA Mills
              Review lands and the market gets crowded. Early members shape the tool library,
              the policy templates, and the conversation.
            </p>
            <button
              onClick={() => setModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-ink-900 text-white font-bold text-sm hover:bg-ink-700 transition-colors"
            >
              {CTA_LABEL}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { title: "Shape the tool library", detail: "Founding members vote on which tools get reviewed first for your sector." },
              { title: "Locked founding rate", detail: "Founding member pricing locked for 12 months — before standard rates apply." },
              { title: "Direct author access", detail: "Rajiv, Nick, Darren, and Sushila are in the community from day one." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-white border border-ink-100 p-5 text-center shadow-sm">
                <h3 className="font-serif font-bold text-ink-900 text-sm mb-2">{b.title}</h3>
                <p className="text-xs text-ink-500 leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaitlistModal open={modal} onClose={() => setModal(false)} source="founding" />
    </>
  );
}
