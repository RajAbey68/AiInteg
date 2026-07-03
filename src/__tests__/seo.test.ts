import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * TDD suite — Phase 3 crawlability parity with asimov-ai.org, written first.
 */
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
});
