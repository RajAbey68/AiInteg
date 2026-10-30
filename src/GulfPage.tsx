import { gulfCopy } from "./content/gulf";

const ASIMOV_AI_URL = "https://asimov-ai.org";

const eyebrowStyle = { color: "var(--color-teal)" } as const;

export function GulfPage({ onScopeCall }: { onScopeCall: () => void }) {
  return (
    <div className="px-6 md:px-12 py-16 max-w-5xl mx-auto space-y-24 text-left">
      {/* Hero */}
      <section aria-labelledby="gulf-hero-heading" className="max-w-3xl mx-auto space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wider" style={eyebrowStyle}>
          {gulfCopy.hero.eyebrow}
        </p>
        <h1
          id="gulf-hero-heading"
          className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight"
        >
          {gulfCopy.hero.h1a}
          <br />
          {gulfCopy.hero.h1b}
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed font-light">{gulfCopy.hero.lead}</p>
        <p className="text-base text-zinc-300 leading-relaxed">{gulfCopy.hero.gulfWay}</p>
        <div>
          <button
            type="button"
            onClick={onScopeCall}
            className="font-semibold text-base px-6 py-4 rounded hover:opacity-90 active:scale-95 transition-all"
            style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
          >
            {gulfCopy.hero.primaryCta}
          </button>
        </div>
        <ul className="flex flex-wrap gap-3 pt-2">
          {gulfCopy.hero.proofPoints.map((point) => (
            <li
              key={point}
              className="text-xs font-semibold text-zinc-300 border border-white/10 rounded-full px-3 py-1.5"
            >
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Accountability */}
      <section aria-labelledby="gulf-accountability-heading" className="space-y-8">
        <p className="text-sm font-semibold uppercase tracking-wider" style={eyebrowStyle}>
          {gulfCopy.accountability.eyebrow}
        </p>
        <h2
          id="gulf-accountability-heading"
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          {gulfCopy.accountability.h2}
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
          {gulfCopy.accountability.body}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {gulfCopy.accountability.steps.map((step) => (
            <article key={step.number} className="border border-white/10 rounded p-6 space-y-3">
              <span className="text-sm font-bold" style={eyebrowStyle}>
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-zinc-200">{step.h3}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Data handling */}
      <section aria-labelledby="gulf-data-heading" className="space-y-8">
        <p className="text-sm font-semibold uppercase tracking-wider" style={eyebrowStyle}>
          {gulfCopy.data.eyebrow}
        </p>
        <h2 id="gulf-data-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
          {gulfCopy.data.h2a}
          <br />
          {gulfCopy.data.h2b}
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">{gulfCopy.data.body}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {gulfCopy.data.cards.map((card) => (
            <article key={card.tag} className="border border-white/10 rounded p-6 space-y-3">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wider border border-white/10 rounded-full px-3 py-1"
                style={eyebrowStyle}
              >
                {card.tag}
              </span>
              <h3 className="text-lg font-bold text-zinc-200">{card.h3}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">{card.body}</p>
            </article>
          ))}
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">{gulfCopy.data.caveat}</p>
        <details className="border border-white/10 rounded p-6 max-w-3xl">
          <summary className="cursor-pointer text-sm font-semibold text-zinc-200">
            {gulfCopy.data.detailsSummary}
          </summary>
          <div className="space-y-4 pt-4">
            {gulfCopy.data.details.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm text-zinc-400 leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-sm text-zinc-500 leading-relaxed">
              {gulfCopy.data.sourcesLabel}{" "}
              {gulfCopy.data.sources.map((source, index) => (
                <span key={source.href}>
                  {index > 0 && " · "}
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-white transition-colors"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </details>
      </section>

      {/* Handover */}
      <section aria-labelledby="gulf-handover-heading" className="space-y-8">
        <p className="text-sm font-semibold uppercase tracking-wider" style={eyebrowStyle}>
          {gulfCopy.handover.eyebrow}
        </p>
        <h2 id="gulf-handover-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
          {gulfCopy.handover.h2a}
          <br />
          {gulfCopy.handover.h2b}
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
          {gulfCopy.handover.body}
        </p>
        <ul className="space-y-6 max-w-3xl">
          {gulfCopy.handover.deliverables.map((item) => (
            <li
              key={item.title}
              className="border-l-2 pl-6 space-y-1"
              style={{ borderColor: "var(--color-teal)" }}
            >
              <strong className="block text-base font-bold text-zinc-200">{item.title}</strong>
              <span className="block text-sm text-zinc-400 leading-relaxed font-light">
                {item.body}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">{gulfCopy.handover.note}</p>
      </section>

      {/* 30/60/90 reviews */}
      <section aria-labelledby="gulf-reviews-heading" className="space-y-8">
        <p className="text-sm font-semibold uppercase tracking-wider" style={eyebrowStyle}>
          {gulfCopy.reviews.eyebrow}
        </p>
        <h2 id="gulf-reviews-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
          {gulfCopy.reviews.h2}
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">{gulfCopy.reviews.body}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {gulfCopy.reviews.milestones.map((milestone) => (
            <article key={milestone.when} className="border border-white/10 rounded p-6 space-y-3">
              <span className="text-sm font-bold" style={eyebrowStyle}>
                {milestone.when}
              </span>
              <h3 className="text-lg font-bold text-zinc-200">{milestone.h3}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">{milestone.body}</p>
            </article>
          ))}
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">{gulfCopy.reviews.note}</p>
      </section>

      {/* Gulf business development */}
      <section aria-labelledby="gulf-team-heading" className="space-y-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider" style={eyebrowStyle}>
          {gulfCopy.team.eyebrow}
        </p>
        <h2 id="gulf-team-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
          {gulfCopy.team.h2}
        </h2>
        <article className="border border-white/10 rounded p-6 space-y-3">
          <h3 className="text-lg font-bold text-zinc-200">{gulfCopy.team.name}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-light">{gulfCopy.team.bio}</p>
        </article>
        <p className="text-sm text-zinc-500 leading-relaxed">{gulfCopy.team.note}</p>
      </section>

      {/* Contact */}
      <section
        aria-labelledby="gulf-contact-heading"
        className="space-y-6 max-w-3xl mx-auto text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wider" style={eyebrowStyle}>
          {gulfCopy.contact.eyebrow}
        </p>
        <h2 id="gulf-contact-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
          {gulfCopy.contact.h2a}
          <br />
          {gulfCopy.contact.h2b}
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed">{gulfCopy.contact.body}</p>
        <div>
          <button
            type="button"
            onClick={onScopeCall}
            className="font-semibold text-base px-6 py-4 rounded hover:opacity-90 active:scale-95 transition-all"
            style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
          >
            {gulfCopy.contact.primaryCta}
          </button>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Delivery through AI Integ. Separate governance and assurance advice can be scoped through{" "}
          <a
            href={ASIMOV_AI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            ASIMOV AI
          </a>
          .
        </p>
      </section>
    </div>
  );
}
