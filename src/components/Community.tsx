import { MessageSquare, BookOpen, Video, FileText, Users, ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity";

const features = [
  {
    icon: MessageSquare,
    title: "Peer Q&A",
    description:
      "Post a question on Monday, get answers from practitioners who've navigated the same issue at a similar-sized, similarly regulated firm.",
  },
  {
    icon: BookOpen,
    title: "Vetted tool library",
    description:
      "Every tool reviewed for your regulator's compliance implications before it's listed. Sector-tagged so you only see what's relevant.",
  },
  {
    icon: Video,
    title: "Monthly implementation calls",
    description:
      "Live sessions on one implementation topic. Recordings archived. Past sessions: AI for client onboarding, file review, time capture.",
  },
  {
    icon: FileText,
    title: "Policy & disclosure templates",
    description:
      "AI usage policies, client disclosure clauses, and staff guidance — written for professional services, not copied from a tech company.",
  },
  {
    icon: Users,
    title: "Sector working groups",
    description:
      "Law, accounting, financial advisory, architecture — each with their own private channel. Share what's working without your competitor seeing it.",
  },
  {
    icon: ArrowRight,
    title: "Direct author access",
    description:
      "Ask Rajiv, Nick, Darren, or Sushila directly. The people writing The Digital Law Firm are in the community answering questions weekly.",
  },
];

export default function Community() {
  return (
    <section id="community" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mb-3">
              The community
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink-900 mb-5 text-balance">
              The Skool community
              for regulated professionals
            </h2>
            <p className="text-lg text-ink-600 mb-5 leading-relaxed">
              Implementation is 10% tool selection and 90% the conversations around it.
              Who handles client objections? What's your policy when the AI gets something
              wrong? How do you train staff who don't trust it yet?
            </p>
            <p className="text-lg text-ink-600 mb-8 leading-relaxed">
              Those answers don't come from a vendor's blog. They come from a solicitor
              in Cardiff who solved the same problem six months ago and is happy to
              tell you exactly what worked.
            </p>

            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-ink-900 text-white font-bold text-sm hover:bg-ink-700 transition-colors"
            >
              Join free on Skool
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right — feature grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-xl border border-ink-100 bg-parchment-50 p-5 hover:border-gold-300 hover:shadow-md transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-ink-900 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-gold-400" />
                  </div>
                  <h3 className="font-serif font-bold text-ink-900 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-ink-500 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
