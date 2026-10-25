import { App } from "@/App";
import { homepageCopy } from "@/content/homepage";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

/**
 * TDD suite — AI Integ Forward (six-gate prototyping/MVP method).
 * Covers the new "forward" view state: nav entry, hero, entry filter,
 * expandable gate cards, contrast/flexibility, attribution, and the
 * hero prominence strip added to the homepage view.
 */

function goToForward() {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /^AI Integ Forward$/i }));
}

describe("AI Integ Forward — navigation", () => {
  it("nav button switches to the forward view and renders its headline", () => {
    goToForward();
    expect(
      screen.getByRole("heading", { name: homepageCopy.forward.headline })
    ).toBeInTheDocument();
    expect(screen.getByText(homepageCopy.forward.subhead)).toBeInTheDocument();
  });

  it("'Back to homepage' returns to the home view", () => {
    goToForward();
    fireEvent.click(screen.getByRole("button", { name: /Back to homepage/i }));
    expect(screen.getByRole("heading", { name: /We build the AI system/i })).toBeInTheDocument();
  });

  it("'Apply for a Forward slot' opens the scope call modal", () => {
    goToForward();
    fireEvent.click(screen.getByRole("button", { name: /Apply for a Forward slot/i }));
    expect(screen.getByRole("heading", { name: "Book a scope call" })).toBeInTheDocument();
  });

  it("nav button is highlighted (teal) only while on the forward view", () => {
    render(<App />);
    const navButton = screen.getByRole("button", { name: /^AI Integ Forward$/i });
    expect(navButton.className).not.toContain("text-teal-400");
    fireEvent.click(navButton);
    expect(navButton.className).toContain("text-teal-400");
  });
});

describe("AI Integ Forward — entry filter", () => {
  it("renders all three entry-filter questions and the outcome line", () => {
    goToForward();
    for (const q of homepageCopy.forward.entryFilter.questions) {
      expect(screen.getByText(q.label)).toBeInTheDocument();
      expect(screen.getByText(q.detail)).toBeInTheDocument();
    }
    expect(screen.getByText(homepageCopy.forward.entryFilter.outcome)).toBeInTheDocument();
  });
});

describe("AI Integ Forward — six gates", () => {
  it("renders exactly six gate cards, numbered 1 through 6, with names and descriptions", () => {
    goToForward();
    expect(homepageCopy.forward.gates).toHaveLength(6);
    for (const gate of homepageCopy.forward.gates) {
      expect(screen.getByText(`GATE ${gate.n}`)).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: gate.name })).toBeInTheDocument();
      expect(screen.getByText(gate.desc)).toBeInTheDocument();
    }
  });

  it("gate cards are collapsed by default — Purpose/Definition of Done are not shown", () => {
    goToForward();
    expect(screen.queryByText("Purpose")).not.toBeInTheDocument();
    expect(screen.queryByText("Definition of Done")).not.toBeInTheDocument();
  });

  it("clicking a gate card expands it to show Purpose, Typical questions to ask, and Definition of Done", () => {
    goToForward();
    const gate1 = homepageCopy.forward.gates[0];
    const trigger = screen.getByRole("button", { name: new RegExp(`GATE 1.*${gate1.name}`, "s") });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Purpose")).toBeInTheDocument();
    expect(screen.getByText(gate1.purpose)).toBeInTheDocument();
    expect(screen.getByText("Typical questions to ask")).toBeInTheDocument();
    for (const q of gate1.questions) {
      expect(screen.getByText(q)).toBeInTheDocument();
    }
    expect(screen.getByText("Definition of Done")).toBeInTheDocument();
    expect(screen.getByText(gate1.dod)).toBeInTheDocument();
  });

  it("clicking an open gate card again collapses it", () => {
    goToForward();
    const gate1 = homepageCopy.forward.gates[0];
    const trigger = screen.getByRole("button", { name: new RegExp(`GATE 1.*${gate1.name}`, "s") });

    fireEvent.click(trigger);
    expect(screen.getByText(gate1.purpose)).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(gate1.purpose)).not.toBeInTheDocument();
  });

  it("only one gate is expanded at a time — opening a second gate closes the first", () => {
    goToForward();
    const gate1 = homepageCopy.forward.gates[0];
    const gate2 = homepageCopy.forward.gates[1];
    const trigger1 = screen.getByRole("button", { name: new RegExp(`GATE 1.*${gate1.name}`, "s") });
    const trigger2 = screen.getByRole("button", { name: new RegExp(`GATE 2.*${gate2.name}`, "s") });

    fireEvent.click(trigger1);
    expect(screen.getByText(gate1.purpose)).toBeInTheDocument();

    fireEvent.click(trigger2);
    expect(trigger1).toHaveAttribute("aria-expanded", "false");
    expect(trigger2).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByText(gate1.purpose)).not.toBeInTheDocument();
    expect(screen.getByText(gate2.purpose)).toBeInTheDocument();
  });

  it("notes that full ASIMOV audit and CAP hardening apply only from Gate 6 onward", () => {
    goToForward();
    expect(
      screen.getByText(/Full ASIMOV audit and full CAP hardening apply only from Gate 6 onward/i)
    ).toBeInTheDocument();
  });
});

describe("AI Integ Forward — contrast, flexibility, attribution", () => {
  it("renders the Contrast and Flexibility explainer cards", () => {
    goToForward();
    expect(screen.getByRole("heading", { name: "Contrast" })).toBeInTheDocument();
    expect(screen.getByText(homepageCopy.forward.contrast)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Flexibility" })).toBeInTheDocument();
    expect(screen.getByText(homepageCopy.forward.flexibility)).toBeInTheDocument();
  });

  it("renders all three attribution entries crediting forward-deployed engineering, BMAD, and ASIMOV", () => {
    goToForward();
    expect(homepageCopy.forward.attribution).toHaveLength(3);
    for (const item of homepageCopy.forward.attribution) {
      expect(screen.getByText(item.who)).toBeInTheDocument();
      expect(screen.getByText(item.what)).toBeInTheDocument();
    }
  });
});

describe("Homepage — delivery-lead prominence strip", () => {
  it("shows the named delivery lead link near the top of the hero, pointing at #about", () => {
    render(<App />);
    const strip = screen.getByText(/one named delivery lead, not a rotating team\./i).closest("a");
    expect(strip).not.toBeNull();
    if (!strip) throw new Error("Prominence strip link not found");
    expect(strip).toHaveAttribute("href", "#about");
    expect(within(strip).getByText(homepageCopy.proof.name)).toBeInTheDocument();
    expect(within(strip).getByText("RA")).toBeInTheDocument();
  });
});
