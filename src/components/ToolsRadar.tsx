import { toolCategoryOrder, toolsData } from "@/content/tools";
import type { ToolCategory } from "@/content/tools";
import { useState } from "react";

interface ToolsRadarProps {
  onOpenModal: () => void;
  onBackToHome: () => void;
}

const ALTERNATIVE_BADGE: Record<string, { label: string; className: string }> = {
  "open-source": {
    label: "Open-source alternative",
    className: "border-teal-500/30 text-teal-300 bg-teal-950/20",
  },
  "closed-source": {
    label: "Closed-source competitor",
    className: "border-white/10 text-zinc-300 bg-zinc-900/40",
  },
  "none-found": {
    label: "No credible alternative found",
    className: "border-amber-500/20 text-amber-300 bg-amber-950/10",
  },
};

export function ToolsRadar({ onOpenModal, onBackToHome }: ToolsRadarProps) {
  const [filter, setFilter] = useState<ToolCategory | "all">("all");

  const visibleTools =
    filter === "all" ? toolsData : toolsData.filter((tool) => tool.category === filter);

  return (
    <div className="px-6 md:px-12 py-16 max-w-6xl mx-auto space-y-16 text-left">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-teal-400">
          Weekly-refreshed tool radar
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
          Can you benefit from these tools? Talk to us.
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed font-light">
          Every tool below cleared a real evidence bar — a verified G2 or Capterra rating, or
          credible named tech coverage — and gets re-checked weekly for hype and reputation
          collapse. That is the easy 10%. Wiring one of these into your systems, your data, and your
          acceptance criteria so it still runs in six months is the other 90%. That part is what we
          deliver.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={onOpenModal}
            className="font-semibold text-sm px-5 py-3 rounded hover:opacity-90 active:scale-95 transition-all"
            style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
          >
            Talk to us about your build
          </button>
          <button
            type="button"
            onClick={onBackToHome}
            className="text-sm border border-white/10 hover:border-white/30 text-zinc-300 px-5 py-3 rounded transition-all"
          >
            Back to homepage
          </button>
        </div>
      </section>

      {/* Why this page exists — pivots from tools to the delivery service */}
      <section className="max-w-4xl mx-auto border border-white/5 bg-zinc-900/10 rounded-lg p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold tracking-tight">A tool is not a deliverable</h2>
        <p className="text-base text-zinc-400 leading-relaxed">
          A subscription gets you a login screen. It does not get you a system that reads from your
          case management platform, respects your access controls, and hands a fee earner or an
          accountant a result they can trust without checking it by hand. That gap — from tool to
          production system with defined acceptance criteria — is where most AI spend goes to die on
          a shelf.
        </p>
        <p className="text-base text-zinc-300 leading-relaxed font-medium">
          We scope the build, integrate the tool (or the open-source alternative, if that is the
          better fit for your data residency and budget) into your existing workflow, test it
          against criteria you set, and hand over a running system — not a recommendation in a slide
          deck.
        </p>
      </section>

      {/* Category filters */}
      <section aria-labelledby="tools-grid-heading" className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h2 id="tools-grid-heading" className="text-xl md:text-2xl font-bold tracking-tight">
            The current radar
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === "all"
                  ? "text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/5"
              }`}
              style={filter === "all" ? { backgroundColor: "var(--color-teal)" } : undefined}
            >
              All tools
            </button>
            {toolCategoryOrder.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filter === cat.id
                    ? "text-black"
                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/5"
                }`}
                style={filter === cat.id ? { backgroundColor: "var(--color-teal)" } : undefined}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTools.map((tool) => {
            const badge = ALTERNATIVE_BADGE[tool.alternative.type];
            return (
              <article
                key={tool.id}
                className="border border-white/5 bg-zinc-950 rounded-lg p-6 flex flex-col justify-between hover:border-teal-500/30 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-zinc-100">{tool.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-zinc-900 text-zinc-500 border border-white/5 whitespace-nowrap">
                      {tool.categoryLabel}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tool.whyBusinessesUseIt}</p>
                  <div className={`rounded border px-3 py-2 text-xs ${badge.className}`}>
                    <span className="font-semibold block mb-0.5">{badge.label}:</span>
                    <span className="block font-medium">{tool.alternative.name}</span>
                    <span className="block text-[11px] opacity-80 mt-1">
                      {tool.alternative.note}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    View the tool ↗
                  </a>
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className="text-xs font-semibold transition-colors"
                    style={{ color: "var(--color-teal)" }}
                  >
                    Build this in →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-xl mx-auto text-center border-t border-white/5 pt-16">
        <h2 className="text-xl font-bold mb-3 tracking-tight">
          Not sure which of these fits your workflow?
        </h2>
        <p className="text-base text-zinc-400 mb-8 leading-relaxed">
          Tell us the process that's costing you time. We'll tell you honestly whether one of these
          tools solves it, whether the open-source route makes more sense for your data, or whether
          it needs a custom build — and what the fixed-scope delivery looks like either way.
        </p>
        <button
          type="button"
          onClick={onOpenModal}
          className="rounded px-6 py-3 text-base font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "var(--color-teal)", color: "var(--color-black)" }}
        >
          Talk to us
        </button>
      </section>
    </div>
  );
}
