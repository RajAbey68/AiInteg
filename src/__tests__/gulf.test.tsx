import { App } from "@/App";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

function setPath(path: string) {
  window.history.pushState({}, "", path);
}

describe("Gulf page", () => {
  afterEach(() => {
    setPath("/");
  });

  it("renders the Gulf view at /gulf with its own h1", () => {
    setPath("/gulf");
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Your outcome.");
    expect(heading).toHaveTextContent("Our responsibility.");
  });

  it("carries the Gulf-way promise and proof points", () => {
    setPath("/gulf");
    render(<App />);
    expect(screen.getByText(/Gulf way, following the local rules/i)).toBeInTheDocument();
    expect(screen.getByText(/Agreed acceptance tests/i)).toBeInTheDocument();
    expect(screen.getByText(/30 \/ 60 \/ 90-day reviews/i)).toBeInTheDocument();
  });

  it("frames data handling as delivery choices, not universal legal categories", () => {
    setPath("/gulf");
    render(<App />);
    expect(
      screen.getByText(/delivery choices, not universal legal categories/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/UAE PDPL/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Saudi PDPL/i).length).toBeGreaterThan(0);
  });

  it("introduces Manju Ramachandran for Gulf business development", () => {
    setPath("/gulf");
    render(<App />);
    expect(screen.getByText("Manju Ramachandran")).toBeInTheDocument();
    expect(screen.getByText(/BFSI and enterprise technology experience/i)).toBeInTheDocument();
  });

  it("sets the Gulf document title", () => {
    setPath("/gulf");
    render(<App />);
    expect(document.title).toBe("AI Integ Gulf — Your outcome. Our responsibility.");
    // jsdom does not load index.html, so meta[name=description] may be absent here;
    // when present, the effect points it at the Gulf description.
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      expect(meta.getAttribute("content")).toContain("AI delivery for the Gulf");
    }
  });

  it("scope CTA opens the existing project-enquiry modal", () => {
    setPath("/gulf");
    render(<App />);
    const ctas = screen.getAllByRole("button", { name: /scope your outcome/i });
    fireEvent.click(ctas[0]);
    expect(screen.getByRole("heading", { name: "Book a scope call" })).toBeVisible();
  });

  it("desktop nav reaches the Gulf page and updates the URL", () => {
    setPath("/");
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /^Gulf$/i }));
    expect(window.location.pathname).toBe("/gulf");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Your outcome.");
  });

  it("footer Gulf delivery link reaches the Gulf page", () => {
    setPath("/");
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Gulf delivery/i }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Your outcome.");
  });

  it("browser back from /gulf returns to the homepage", () => {
    setPath("/");
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /^Gulf$/i }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Your outcome.");
    window.history.pushState({}, "", "/");
    fireEvent.popState(window);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("We build the AI system");
  });
});
