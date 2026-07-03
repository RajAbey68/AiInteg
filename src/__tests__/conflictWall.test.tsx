import { App } from "@/App";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

/**
 * TDD suite — Phase 0 credibility patch (reciprocal side of the
 * asimov-ai.org conflict wall), written before implementation.
 * The relationship must be disclosed with its separation terms, mirroring
 * the wording shipped on asimov-ai.org.
 */
describe("Phase 0 — conflict wall (AI Integ side)", () => {
  it("discloses the sister-practice relationship with the wall terms", () => {
    render(<App />);
    expect(screen.getAllByText(/sister advisory practice/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/separate engagement teams/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/audit verdict/i).length).toBeGreaterThanOrEqual(1);
  });
});
