import { App } from "@/App";
import { cn } from "@/lib/utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * TDD suite — written before implementation.
 * These tests define the contract that App.tsx must satisfy.
 */
describe("App", () => {
  it("renders without crashing", () => {
    // Arrange + Act
    const { container } = render(<App />);

    // Assert — at minimum the root element exists and has children
    expect(container.firstChild).not.toBeNull();
  });

  it("renders h1 containing 'We build the AI system'", () => {
    // Arrange + Act
    render(<App />);

    // Assert
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("We build the AI system");
  });

  it("opens modal when clicking Scope Project CTAs", () => {
    // Arrange
    render(<App />);

    // Act — click the hero Scope Project button
    const heroBtn = screen.getByRole("button", { name: /Scope your project/i });
    fireEvent.click(heroBtn);

    // Assert — modal header is visible
    expect(screen.getByText(/Scope Your AI Project/i)).toBeInTheDocument();
  });

  it("disclaimer has role='note' and contains 'fixed-scope software delivery'", () => {
    // Arrange + Act
    render(<App />);

    // Assert
    const disclaimer = screen.getByRole("note");
    expect(disclaimer).toBeInTheDocument();
    expect(disclaimer).toHaveTextContent("fixed-scope software delivery");
  });

  it("cn utility merges class names correctly", () => {
    const result = cn("px-4", "py-2", { "font-bold": true, italic: false });
    expect(result).toContain("px-4");
    expect(result).toContain("py-2");
    expect(result).toContain("font-bold");
    expect(result).not.toContain("italic");
  });

  it("ASIMOV AI cross-link points to the correct URL", () => {
    // Arrange + Act
    render(<App />);

    // Assert — the footer cross-link to ASIMOV AI must exist and point correctly
    const asimovLinks = screen.getAllByRole("link", { name: /ASIMOV AI/i });
    const footerLink = asimovLinks.find(
      (link) => link.getAttribute("href") === "https://asimov-ai.org"
    );
    expect(footerLink).toBeDefined();
  });

  it("shows error if form in modal is submitted without consent", async () => {
    // Arrange
    const { container } = render(<App />);
    const heroBtn = screen.getByRole("button", { name: /Scope your project/i });
    fireEvent.click(heroBtn);

    // Fill in required fields to avoid HTML5 validation blocking
    const nameInput = screen.getByLabelText(/> FULL_NAME/i);
    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });

    const orgInput = screen.getByLabelText(/> ORGANISATION/i);
    fireEvent.change(orgInput, { target: { value: "Smith Corp" } });

    const sectorSelect = screen.getByLabelText(/> SECTOR/i);
    fireEvent.change(sectorSelect, { target: { value: "Legal" } });

    const specText = screen.getByLabelText(/> WORKFLOW_SPEC/i);
    fireEvent.change(specText, { target: { value: "Automate intake" } });

    // Act
    const form = container.querySelector("form");
    if (!form) throw new Error("Form not found");
    fireEvent.submit(form);

    // Assert
    expect(screen.getByText(/Please consent/i)).toBeInTheDocument();
  });

  it("submits modal form successfully and displays roadmap", async () => {
    // Arrange
    const mockRoadmap = "1. Crawl: setup\n2. Walk: pilot";
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, roadmap: mockRoadmap }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<App />);
    const heroBtn = screen.getByRole("button", { name: /Scope your project/i });
    fireEvent.click(heroBtn);

    // Fill inputs
    const nameInput = screen.getByLabelText(/> FULL_NAME/i);
    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });

    const orgInput = screen.getByLabelText(/> ORGANISATION/i);
    fireEvent.change(orgInput, { target: { value: "Smith Corp" } });

    const sectorSelect = screen.getByLabelText(/> SECTOR/i);
    fireEvent.change(sectorSelect, { target: { value: "Legal" } });

    const specText = screen.getByLabelText(/> WORKFLOW_SPEC/i);
    fireEvent.change(specText, { target: { value: "Automate intake" } });

    // Check consent
    const checkbox = screen.getByLabelText(/I consent to processing/i);
    fireEvent.click(checkbox);

    // Submit
    const submitBtn = screen.getByRole("button", { name: /SUBMIT_AND_GENERATE_ROADMAP/i });
    fireEvent.click(submitBtn);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/Analysis pipeline complete/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/1\. Crawl: setup/)).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  it("handles modal form submission error", async () => {
    // Arrange
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: "Validation failed" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<App />);
    const heroBtn = screen.getByRole("button", { name: /Scope your project/i });
    fireEvent.click(heroBtn);

    // Fill inputs
    const nameInput = screen.getByLabelText(/> FULL_NAME/i);
    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });

    const orgInput = screen.getByLabelText(/> ORGANISATION/i);
    fireEvent.change(orgInput, { target: { value: "Smith Corp" } });

    const sectorSelect = screen.getByLabelText(/> SECTOR/i);
    fireEvent.change(sectorSelect, { target: { value: "Legal" } });

    const specText = screen.getByLabelText(/> WORKFLOW_SPEC/i);
    fireEvent.change(specText, { target: { value: "Automate intake" } });

    // Check consent
    const checkbox = screen.getByLabelText(/I consent to processing/i);
    fireEvent.click(checkbox);

    // Submit
    const submitBtn = screen.getByRole("button", { name: /SUBMIT_AND_GENERATE_ROADMAP/i });
    fireEvent.click(submitBtn);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/Validation failed/i)).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });

  it("closes the modal when clicking the close button", () => {
    // Arrange
    render(<App />);
    const heroBtn = screen.getByRole("button", { name: /Scope your project/i });
    fireEvent.click(heroBtn);
    expect(screen.getByText(/Scope Your AI Project/i)).toBeInTheDocument();

    // Act
    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);

    // Assert
    expect(screen.queryByText(/Scope Your AI Project/i)).not.toBeInTheDocument();
  });

  it("opens modal when clicking bottom CTA Scope Project Now", () => {
    // Arrange
    render(<App />);

    // Act
    const bottomBtn = screen.getByRole("button", { name: /Scope Project Now/i });
    fireEvent.click(bottomBtn);

    // Assert
    expect(screen.getByText(/Scope Your AI Project/i)).toBeInTheDocument();
  });

  it("opens modal when clicking mobile nav STATUS button", () => {
    // Arrange
    render(<App />);

    // Act
    const statusBtn = screen.getByRole("button", { name: /STATUS/i });
    fireEvent.click(statusBtn);

    // Assert
    expect(screen.getByText(/Scope Your AI Project/i)).toBeInTheDocument();
  });
});
