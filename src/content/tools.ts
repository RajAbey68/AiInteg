// Tool Radar — sourced from the weekly "Hidden Map of AI Power" research pass
// (see the standalone catalogue in the AI Integrity & ASIMOV-AI project folder).
// Every entry carries the same evidence standard: a real G2/Capterra aggregate
// rating with review count, or credible named tech-press coverage. No entry
// here is a recommendation to self-implement — see the intro copy on the page.

export type ToolCategory =
  | "design"
  | "presentation"
  | "audio"
  | "research"
  | "coding"
  | "ops"
  | "support";

export interface ToolAlternative {
  type: "open-source" | "closed-source" | "none-found";
  name: string;
  note: string;
}

export interface ToolEntry {
  id: string;
  name: string;
  category: ToolCategory;
  categoryLabel: string;
  stars: number;
  whyBusinessesUseIt: string;
  alternative: ToolAlternative;
  url: string;
}

export const toolCategoryOrder: { id: ToolCategory; label: string }[] = [
  { id: "design", label: "Visuals & Design" },
  { id: "presentation", label: "Presentations" },
  { id: "audio", label: "Audio & Music" },
  { id: "research", label: "Research & Search" },
  { id: "coding", label: "Coding & Dev" },
  { id: "ops", label: "Ops & Meetings" },
  { id: "support", label: "Customer Support" },
];

export const toolsData: ToolEntry[] = [
  {
    id: "napkin-ai",
    name: "Napkin AI",
    category: "design",
    categoryLabel: "Visuals & Design",
    stars: 4.8,
    whyBusinessesUseIt:
      "Marketing and ops teams turn meeting notes, process docs and reports into diagrams clients and staff actually read — without briefing a designer.",
    alternative: {
      type: "closed-source",
      name: "Eraser.io",
      note: "Diagram-as-code aimed more at engineering teams than business reporting.",
    },
    url: "https://www.napkin.ai",
  },
  {
    id: "ideogram",
    name: "Ideogram",
    category: "design",
    categoryLabel: "Visuals & Design",
    stars: 4.7,
    whyBusinessesUseIt:
      "Marketing teams use it for on-brand social and ad graphics that need real, legible text baked into the image — the one thing most image generators still get wrong.",
    alternative: {
      type: "open-source",
      name: "FLUX.1 (Black Forest Labs)",
      note: "Apache 2.0, self-hostable, no per-image fee once you're running it yourself.",
    },
    url: "https://ideogram.ai",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "design",
    categoryLabel: "Visuals & Design",
    stars: 4.6,
    whyBusinessesUseIt:
      "Creative and brand teams use it for concept art, mood boards and campaign visuals where artistic quality matters more than precise control.",
    alternative: {
      type: "open-source",
      name: "Stable Diffusion",
      note: "Full local control and zero per-image cost, at the price of a steeper setup.",
    },
    url: "https://www.midjourney.com",
  },
  {
    id: "recraft",
    name: "Recraft",
    category: "design",
    categoryLabel: "Visuals & Design",
    stars: 4.5,
    whyBusinessesUseIt:
      "Brand and design teams use it for logos, icon sets and vector assets they need to actually reopen and edit in Illustrator or Figma — not just a flat image.",
    alternative: {
      type: "open-source",
      name: "Qwen Image",
      note: "Free and open-source, though less mature on vector output specifically.",
    },
    url: "https://www.recraft.ai",
  },
  {
    id: "relume",
    name: "Relume",
    category: "design",
    categoryLabel: "Visuals & Design",
    stars: 4.5,
    whyBusinessesUseIt:
      "Founders and marketing leads use it to get a full site structure, wireframe and copy draft in front of a developer or agency before paying for a design sprint.",
    alternative: {
      type: "closed-source",
      name: "Framer AI",
      note: "Closer to a finished, publishable site than a wireframe handoff.",
    },
    url: "https://www.relume.io",
  },
  {
    id: "gamma",
    name: "Gamma",
    category: "presentation",
    categoryLabel: "Presentations",
    stars: 4.9,
    whyBusinessesUseIt:
      "Sales, ops and leadership teams turn a rough outline into an investor deck, internal report, or client-facing microsite in one sitting.",
    alternative: {
      type: "closed-source",
      name: "Tome",
      note: "Similar prompt-to-deck workflow, weaker on the webpage-format output Gamma offers.",
    },
    url: "https://gamma.app",
  },
  {
    id: "higgsfield",
    name: "Higgsfield",
    category: "presentation",
    categoryLabel: "Presentations",
    stars: 4.5,
    whyBusinessesUseIt:
      "Marketing and product teams use it for cinematic product shots, ad B-roll and social video without booking a shoot day or an editor.",
    alternative: {
      type: "open-source",
      name: "Open-Higgsfield-AI (community project)",
      note: "Self-hosted MIT clone with fewer models and no vendor support — a hobbyist option, not a production replacement.",
    },
    url: "https://higgsfield.ai",
  },
  {
    id: "heygen",
    name: "HeyGen",
    category: "presentation",
    categoryLabel: "Presentations",
    stars: 4.8,
    whyBusinessesUseIt:
      "Sales, training and marketing teams use it for presenter-led video — product walkthroughs, onboarding, investor updates — without a camera, studio or on-camera talent.",
    alternative: {
      type: "closed-source",
      name: "Synthesia",
      note: "The other major avatar-video platform; comparable quality, worth evaluating both before committing.",
    },
    url: "https://www.heygen.com",
  },
  {
    id: "opus-clip",
    name: "Opus Clip",
    category: "presentation",
    categoryLabel: "Presentations",
    stars: 4.5,
    whyBusinessesUseIt:
      "Marketing teams turn one long webinar or podcast recording into a week of short-form social clips without hiring an editor.",
    alternative: {
      type: "open-source",
      name: "ViralMint",
      note: "AGPL-3.0, self-hosted, covers the same scout-to-caption pipeline if you're willing to run it yourself.",
    },
    url: "https://www.opus.pro",
  },
  {
    id: "slidebean",
    name: "Slidebean",
    category: "presentation",
    categoryLabel: "Presentations",
    stars: 4.4,
    whyBusinessesUseIt:
      "Founders raising a round use it because the whole workflow — templates, financial modeling, investor CRM — is built around pitching investors specifically, not general presentations.",
    alternative: {
      type: "closed-source",
      name: "Pitch.com",
      note: "Broader general-purpose deck tool with some fundraising templates.",
    },
    url: "https://slidebean.com",
  },
  {
    id: "eleven-labs",
    name: "ElevenLabs",
    category: "audio",
    categoryLabel: "Audio & Music",
    stars: 4.9,
    whyBusinessesUseIt:
      "Content, L&D and product teams use it for voiceover, IVR and multilingual narration without booking a studio or a voice actor per language.",
    alternative: {
      type: "open-source",
      name: "Fish Speech",
      note: "Self-hosted voice cloning, actively developed, but expect more setup and less polish than a managed service.",
    },
    url: "https://elevenlabs.io",
  },
  {
    id: "riverside",
    name: "Riverside",
    category: "audio",
    categoryLabel: "Audio & Music",
    stars: 4.8,
    whyBusinessesUseIt:
      "Marketing and comms teams record remote interviews, podcasts and webinars that stay broadcast-quality even when someone's wifi drops.",
    alternative: {
      type: "closed-source",
      name: "Squadcast",
      note: "Comparable remote-studio recording; weaker AI editing layer than Riverside.",
    },
    url: "https://riverside.fm",
  },
  {
    id: "suno",
    name: "Suno",
    category: "audio",
    categoryLabel: "Audio & Music",
    stars: 4.8,
    whyBusinessesUseIt:
      "Marketing and creative teams use it for quick original scoring and jingles when licensing stock music isn't worth the cost or the search time.",
    alternative: {
      type: "open-source",
      name: "MusicGen (Meta)",
      note: "Open-source, self-hostable, and sidesteps the ongoing major-label litigation risk sitting over Suno's older generations.",
    },
    url: "https://suno.com",
  },
  {
    id: "descript",
    name: "Descript",
    category: "audio",
    categoryLabel: "Audio & Music",
    stars: 4.5,
    whyBusinessesUseIt:
      "Content and training teams cut podcasts, webinars and course video by editing a transcript instead of a timeline — no dedicated editor needed.",
    alternative: {
      type: "open-source",
      name: "DaVinci Resolve (free tier) + Whisper",
      note: "A genuinely free stack, though it takes more assembly than a single product.",
    },
    url: "https://www.descript.com",
  },
  {
    id: "adobe-podcast",
    name: "Adobe Podcast (Enhance Speech)",
    category: "audio",
    categoryLabel: "Audio & Music",
    stars: 4.2,
    whyBusinessesUseIt:
      "Anyone recording on a phone or laptop mic uses it to strip room noise and echo before a call or podcast goes out, without an audio engineer.",
    alternative: {
      type: "closed-source",
      name: "Auphonic",
      note: "Broader post-production automation (levels, loudness, metadata), not just noise removal.",
    },
    url: "https://podcast.adobe.com/enhance",
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    category: "research",
    categoryLabel: "Research & Search",
    stars: 4.7,
    whyBusinessesUseIt:
      "Anyone doing fast, cited research uses it in place of manual search-and-verify across a dozen browser tabs.",
    alternative: {
      type: "open-source",
      name: "Perplexica",
      note: "MIT-licensed, self-hosted, pairs with local models via Ollama if data residency matters.",
    },
    url: "https://www.perplexity.ai",
  },
  {
    id: "consensus",
    name: "Consensus",
    category: "research",
    categoryLabel: "Research & Search",
    stars: 4.8,
    whyBusinessesUseIt:
      "Teams making decisions that need to survive scrutiny — health, policy, technical claims — use it to ground a position in actual peer-reviewed evidence, not a blog post.",
    alternative: {
      type: "closed-source",
      name: "SciSpace",
      note: "Comparable peer-reviewed literature search with a stronger reading and annotation layer.",
    },
    url: "https://consensus.app",
  },
  {
    id: "notebook-lm",
    name: "Notebook LM",
    category: "research",
    categoryLabel: "Research & Search",
    stars: 4.9,
    whyBusinessesUseIt:
      "Teams interrogate their own internal documents — contracts, reports, discovery bundles — without that material leaving a closed, source-limited environment.",
    alternative: {
      type: "open-source",
      name: "Khoj",
      note: "Self-hosted, document-grounded assistant if keeping everything on your own infrastructure is the priority.",
    },
    url: "https://notebooklm.google",
  },
  {
    id: "elicit",
    name: "Elicit",
    category: "research",
    categoryLabel: "Research & Search",
    stars: 4.5,
    whyBusinessesUseIt:
      "R&D and policy teams doing formal literature reviews use it to extract structured findings — method, sample size, outcome — across hundreds of papers instead of reading them one by one.",
    alternative: {
      type: "closed-source",
      name: "SciSpace",
      note: "Overlaps significantly; compare extraction depth on your own paper set before choosing.",
    },
    url: "https://elicit.com",
  },
  {
    id: "chatgpt-deep-research",
    name: "ChatGPT Deep Research",
    category: "research",
    categoryLabel: "Research & Search",
    stars: 4.6,
    whyBusinessesUseIt:
      "Teams use it when a question needs a genuine multi-source investigation and a structured, cited report — not a five-second chat answer.",
    alternative: {
      type: "closed-source",
      name: "Gemini Deep Research",
      note: "Google's equivalent agent mode, worth comparing if you're already on that ecosystem.",
    },
    url: "https://chatgpt.com",
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    categoryLabel: "Coding & Dev",
    stars: 4.7,
    whyBusinessesUseIt:
      "Technical founders and small dev teams ship faster because it understands the whole codebase, not just the current line — cutting the time a second developer would otherwise cost.",
    alternative: {
      type: "open-source",
      name: "Continue.dev",
      note: "Open-source, model-agnostic AI coding assistant if you want to control which model sees your code.",
    },
    url: "https://cursor.com",
  },
  {
    id: "v0-vercel",
    name: "v0 by Vercel",
    category: "coding",
    categoryLabel: "Coding & Dev",
    stars: 4.6,
    whyBusinessesUseIt:
      "Non-technical founders turn a screenshot or plain-English description straight into real, editable React code — a first-pass frontend without a developer.",
    alternative: {
      type: "open-source",
      name: "Open Design",
      note: "Design-first, local, bring-your-own-key alternative; less polished output than v0.",
    },
    url: "https://v0.dev",
  },
  {
    id: "lovable",
    name: "Lovable",
    category: "coding",
    categoryLabel: "Coding & Dev",
    stars: 4.7,
    whyBusinessesUseIt:
      "Non-technical founders use it as the fastest route from an idea to a working, deployable app — the current benchmark for describe-it-get-an-app.",
    alternative: {
      type: "open-source",
      name: "Dyad",
      note: "Open-source app builder in the same category, earlier-stage and less capable end-to-end.",
    },
    url: "https://lovable.dev",
  },
  {
    id: "bolt-new",
    name: "Bolt.new",
    category: "coding",
    categoryLabel: "Coding & Dev",
    stars: 4.5,
    whyBusinessesUseIt:
      "Founders scaffold a full working environment — frontend and backend — entirely in the browser, no local setup, when they want something running the same day.",
    alternative: {
      type: "open-source",
      name: "bolt.diy (OpenBolt)",
      note: "MIT-licensed community fork of Bolt.new itself — same experience, self-hosted with your own API keys.",
    },
    url: "https://bolt.new",
  },
  {
    id: "aider",
    name: "Aider",
    category: "coding",
    categoryLabel: "Coding & Dev",
    stars: 4.4,
    whyBusinessesUseIt:
      "Technically comfortable founders use it as a free, terminal-native pair programmer that edits your actual local repo rather than generating a separate hosted app.",
    alternative: {
      type: "closed-source",
      name: "Cursor or GitHub Copilot",
      note: "Aider is itself the open-source pick in this category — these are its closed-source equivalents.",
    },
    url: "https://aider.chat",
  },
  {
    id: "granola",
    name: "Granola",
    category: "ops",
    categoryLabel: "Ops & Meetings",
    stars: 4.9,
    whyBusinessesUseIt:
      "Founders and client-facing teams get meeting notes without an obvious notetaker bot joining the call — useful on sales and client calls where that would feel intrusive.",
    alternative: {
      type: "open-source",
      name: "OpenWhispr",
      note: "Fully local, cross-platform, free for individuals — the closest open-source match to Granola's bot-free workflow.",
    },
    url: "https://www.granola.ai",
  },
  {
    id: "make-com",
    name: "Make.com",
    category: "ops",
    categoryLabel: "Ops & Meetings",
    stars: 4.6,
    whyBusinessesUseIt:
      "Ops-minded founders wire AI APIs directly into multi-step backend automations without being boxed into the rigid if/then logic of simpler tools.",
    alternative: {
      type: "open-source",
      name: "n8n",
      note: "Self-hostable, already listed in this catalogue as the open-source automation pick.",
    },
    url: "https://www.make.com",
  },
  {
    id: "julius-ai",
    name: "Julius AI",
    category: "ops",
    categoryLabel: "Ops & Meetings",
    stars: 4.4,
    whyBusinessesUseIt:
      "Founders without a data analyst point a messy spreadsheet or Stripe export at plain English and get it cleaned, analysed and charted back.",
    alternative: {
      type: "none-found",
      name: "No credible open-source equivalent found this pass",
      note: "Closest DIY route is a local notebook plus an LLM copilot — more setup, no polish.",
    },
    url: "https://julius.ai",
  },
  {
    id: "n8n",
    name: "n8n",
    category: "ops",
    categoryLabel: "Ops & Meetings",
    stars: 4.5,
    whyBusinessesUseIt:
      "Founders who want automation logic they fully own — not rented — use it because it's open-source, self-hostable, and has deep native AI-agent support.",
    alternative: {
      type: "closed-source",
      name: "Zapier or Make.com",
      note: "Both listed here — pick n8n if ownership matters more than a managed service.",
    },
    url: "https://n8n.io",
  },
  {
    id: "zapier-agents",
    name: "Zapier Agents",
    category: "ops",
    categoryLabel: "Ops & Meetings",
    stars: 4.5,
    whyBusinessesUseIt:
      "Founders already inside the Zapier ecosystem use it to move past if/then automation into agents that read email, do research, and act semi-autonomously across 8,000+ connected apps.",
    alternative: {
      type: "open-source",
      name: "n8n's AI-agent nodes",
      note: "Overlaps significantly — compare before running both.",
    },
    url: "https://zapier.com/agents",
  },
  {
    id: "chatbase",
    name: "Chatbase",
    category: "support",
    categoryLabel: "Customer Support",
    stars: 4.8,
    whyBusinessesUseIt:
      "Founders stand up a support chatbot trained on their own site or docs in minutes, at a fraction of an enterprise support platform's cost.",
    alternative: {
      type: "open-source",
      name: "Parlant",
      note: "Cited in community roundups as the leading open-source Chatbase alternative.",
    },
    url: "https://www.chatbase.co",
  },
  {
    id: "sitegpt",
    name: "SiteGPT",
    category: "support",
    categoryLabel: "Customer Support",
    stars: 4.6,
    whyBusinessesUseIt:
      "Functionally close to Chatbase; founders pick it on the strength of its larger, more consistent review base rather than any unique feature.",
    alternative: {
      type: "open-source",
      name: "Botpress",
      note: "Open-source conversational AI platform with fuller control over chatbot infrastructure.",
    },
    url: "https://www.sitegpt.ai",
  },
  {
    id: "retell-ai",
    name: "Retell AI",
    category: "support",
    categoryLabel: "Customer Support",
    stars: 4.8,
    whyBusinessesUseIt:
      "Founders build an AI voice agent that answers real inbound or outbound phone calls — replacing the first line of a call centre.",
    alternative: {
      type: "open-source",
      name: "LiveKit Agents",
      note: "Open-source real-time voice-agent framework; more assembly required than a managed platform.",
    },
    url: "https://www.retellai.com",
  },
  {
    id: "kraftful",
    name: "Kraftful",
    category: "support",
    categoryLabel: "Customer Support",
    stars: 4.3,
    whyBusinessesUseIt:
      "Product-minded founders use it once they have real feedback volume, to turn thousands of app reviews and support tickets into a synthesized list of what to fix next.",
    alternative: {
      type: "none-found",
      name: "No credible open-source equivalent found this pass",
      note: "Closest DIY route is a Whisper/LLM pipeline over exported reviews and tickets.",
    },
    url: "https://www.kraftful.com",
  },
  {
    id: "threado-ai",
    name: "Threado AI",
    category: "support",
    categoryLabel: "Customer Support",
    stars: 4.4,
    whyBusinessesUseIt:
      "Founders running a paid Slack or Discord community use it to answer repeat member questions from historical threads, without a human moderator on call.",
    alternative: {
      type: "none-found",
      name: "No established open-source equivalent found this pass",
      note: "Closest DIY route is a self-hosted RAG bot over your community export.",
    },
    url: "https://threado.com",
  },
];
