import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * Helper: extract JSON-LD blocks from HTML using JSON.parse for deterministic assertions.
 * Avoids brittle regex against multiline/minified JSON.
 */
function extractJsonLd(html: string): Record<string, unknown>[] {
  const matches = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  return [...matches].map(([, json]) => JSON.parse(json.trim()));
}

describe("Phase 3 — crawlability and structured data", () => {
  it("ships robots.txt referencing the sitemap", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/Sitemap: https:\/\/ai-integ\.com\/sitemap\.xml/);
  });

  it("ships a sitemap listing the homepage", () => {
    const sitemap = readFileSync(resolve(ROOT, "public/sitemap.xml"), "utf-8");
    expect(sitemap).toContain("https://ai-integ.com/</loc>");
  });

  it("homepage head declares canonical, OG tags and Organization JSON-LD", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    expect(html).toMatch(/rel="canonical"/);
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/"@type":\s*"Organization"/);
  });

  it("robots.txt explicitly permits GPTBot", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: GPTBot\nDisallow:\n/);
  });

  it("robots.txt explicitly permits ClaudeBot", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: ClaudeBot\nDisallow:\n/);
  });

  it("robots.txt explicitly permits PerplexityBot", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: PerplexityBot\nDisallow:\n/);
  });

  it("robots.txt explicitly permits Google-Extended", () => {
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf-8");
    expect(robots).toMatch(/User-agent: Google-Extended\nDisallow:\n/);
  });

  it("parses FAQPage schema with at least 5 questions", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    const blocks = extractJsonLd(html);
    const faq = blocks.find((b) => b["@type"] === "FAQPage");
    expect(faq).toBeDefined();
    const entities = (faq as { mainEntity?: unknown[] })?.mainEntity ?? [];
    expect(entities.length).toBeGreaterThanOrEqual(5);
  });

  it("parses Service schema for each offering", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    const blocks = extractJsonLd(html);
    const services = blocks.filter((b) => b["@type"] === "Service");
    expect(services.length).toBeGreaterThanOrEqual(3);
    const names = services.map((s) => (s as { name?: string }).name);
    expect(names).toEqual(
      expect.arrayContaining([
        expect.stringContaining("AI Integ Discovery"),
        expect.stringContaining("AI Integ Build"),
        expect.stringContaining("Production Handover"),
      ])
    );
  });

  it("ships llms.txt with required sections", () => {
    const llms = readFileSync(resolve(ROOT, "public/llms.txt"), "utf-8");
    expect(llms).toMatch(/^# AI Integ/m);
    expect(llms).toMatch(/## TL;DR for AI Assistants/);
    expect(llms).toMatch(/## Services/);
    expect(llms).toMatch(/## Links/);
  });

  it('index.html links to llms.txt via <link rel="alternate">', () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf-8");
    expect(html).toMatch(/<link rel="alternate" type="text\/plain" href="\/llms\.txt"/);
  });
});
