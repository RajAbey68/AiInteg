import { App } from "@/App";
import { toolCategoryOrder, toolsData } from "@/content/tools";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

/**
 * TDD suite — Tool Radar ("Can you benefit from these tools? Talk to us.").
 * Covers the new "tools" view state: nav entry (desktop + mobile), homepage
 * prominence banner, category filtering, and the CTA wiring back into the
 * existing scope-call modal (the site's one contact form).
 */

function goToTools() {
  render(<App />);
  fireEvent.click(screen.getAllByRole("button", { name: /^Tool Radar$/i })[0]);
}

describe("Tool Radar — navigation", () => {
  it("nav button switches to the tools view and renders the headline", () => {
    goToTools();
    expect(
      screen.getByRole("heading", { name: /Can you benefit from these tools\? Talk to us\./i })
    ).toBeInTheDocument();
  });

  it("homepage prominence banner links to the tools view", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /See the tool radar/i }));
    expect(
      screen.getByRole("heading", { name: /Can you benefit from these tools\? Talk to us\./i })
    ).toBeInTheDocument();
  });

  it("'Back to homepage' returns to the home view", () => {
    goToTools();
    fireEvent.click(screen.getByRole("button", { name: /Back to homepage/i }));
    expect(screen.getByRole("heading", { name: /We build the AI system/i })).toBeInTheDocument();
  });

  it("nav button is highlighted (teal) only while on the tools view", () => {
    render(<App />);
    const navButton = screen.getAllByRole("button", { name: /^Tool Radar$/i })[0];
    expect(navButton.className).not.toContain("text-teal-400");
    fireEvent.click(navButton);
    expect(navButton.className).toContain("text-teal-400");
  });
});

describe("Tool Radar — CTA wiring", () => {
  it("'Talk to us about your build' opens the scope call modal", () => {
    goToTools();
    fireEvent.click(screen.getByRole("button", { name: /Talk to us about your build/i }));
    expect(screen.getByRole("heading", { name: "Book a scope call" })).toBeInTheDocument();
  });

  it("a per-card 'Build this in' button opens the scope call modal", () => {
    goToTools();
    const firstTool = toolsData[0];
    const card = screen.getByRole("heading", { name: firstTool.name }).closest("article");
    expect(card).not.toBeNull();
    if (!card) throw new Error("Tool card not found");
    fireEvent.click(within(card).getByRole("button", { name: /Build this in/i }));
    expect(screen.getByRole("heading", { name: "Book a scope call" })).toBeInTheDocument();
  });
});

describe("Tool Radar — category filtering", () => {
  it("shows all tools by default", () => {
    goToTools();
    for (const tool of toolsData) {
      expect(screen.getByRole("heading", { name: tool.name })).toBeInTheDocument();
    }
  });

  it("filtering by a category shows only that category's tools", () => {
    goToTools();
    const designCategory = toolCategoryOrder.find((c) => c.id === "design");
    if (!designCategory) throw new Error("design category missing from toolCategoryOrder");
    fireEvent.click(screen.getByRole("button", { name: designCategory.label }));

    const designTools = toolsData.filter((t) => t.category === "design");
    const otherTools = toolsData.filter((t) => t.category !== "design");

    for (const tool of designTools) {
      expect(screen.getByRole("heading", { name: tool.name })).toBeInTheDocument();
    }
    for (const tool of otherTools) {
      expect(screen.queryByRole("heading", { name: tool.name })).not.toBeInTheDocument();
    }
  });
});

describe("Tool Radar — data integrity", () => {
  it("every category in toolCategoryOrder has at least one tool", () => {
    for (const cat of toolCategoryOrder) {
      const count = toolsData.filter((t) => t.category === cat.id).length;
      expect(count).toBeGreaterThan(0);
    }
  });

  it("every tool has a non-empty why-businesses-use-it line and an alternative", () => {
    for (const tool of toolsData) {
      expect(tool.whyBusinessesUseIt.length).toBeGreaterThan(10);
      expect(tool.alternative.name.length).toBeGreaterThan(0);
      expect(tool.alternative.note.length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate tool ids", () => {
    const ids = toolsData.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
