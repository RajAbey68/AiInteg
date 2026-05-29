import { MessageSquare, BookOpen, Video, FileText, Users, ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/ai-integrity";

const features = [
  {
    icon: MessageSquare,
    title: "Ask the community",
    description:
      "Post a question Monday morning, get answers from peers who've navigated the same issue at a similar-sized firm. No gatekeeping, no upsell.",
  },
  {
    icon: BookOpen,
    title: "Vetted tool library",
    description:
      "Every tool reviewed for compliance implications before it lands in the library. Sector-tagged so a conveyancing firm doesn't wade through audit tools.",
  },
  {
    icon: Video,
    title: "Monthly implementation calls",
    description:
      "Live sessions covering one implementation topic in depth. Recordings in the vault. Past topics include AI for client onboarding, file review, and time capture.",
  },
  {
    icon: FileText,
    title: "Policy and disclosure templates",
    description:
      "AI usage policies, client disclosure clauses, and staff guidance templates. Written for professional services — not copy-pasted from a tech company.",
  },
  {
    icon: Users,
    title: "Sector working groups",
    description:
      "Law, accounting, and consulting each have their own channel. Share what's working without worrying your competitor is reading it.",
  },
  {
    icon: ArrowRight,
    title: "Direct line to the authors",
    description:
      "Ask Rajiv, Nick, Darren, or Sushila directly. The people who wrote The Digital Law Firm are in the community answering questions.",
  },
];

export default function Community() {
  return (
    <section id="community" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — copy */}
          <div>
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
              The community
            </p>
            <h2 className="text-4xl font-bold text-slate-900 mb-5 text-balance">
              The Skool community for professional services AI
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Implementation is 10% tool selection and 90% the conversations around it.
              Who handles client objections? What's your policy when the AI gets something wrong?
              How do you train staff who don't trust it yet?
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Those answers don't come from a vendor's blog. They come from a solicitor in Cardiff
              who solved the same problem six months ago and is happy to tell you what worked.
            </p>

            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors shadow-md shadow-brand-200"
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
                  className="rounded-xl border border-slate-100 bg-slate-50 p-5 hover:border-brand-200 hover:bg-brand-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center mb-3">
                    <Icon size={17} className="text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
