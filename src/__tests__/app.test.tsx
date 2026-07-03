import { App } from "@/App";
import { cn } from "@/lib/utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * TDD suite — updated for the P0 leadership review changes.
 * These tests define the contract that App.tsx must satisfy.
 */

function fillForm() {
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Jane Smith" },
  });
  fireEvent.change(screen.getByLabelText("Firm"), {
    target: { value: "Smith Corp" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "jane@smithcorp.example" },
  });
  fireEvent.change(screen.getByLabelText("Sector"), {
    target: { value: "Legal" },
  });
  fireEvent.change(screen.getByLabelText("What do you want built?"), {
    target: { value: "Automate intake" },
  });
}

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
  });

  it("renders h1 containing 'We build the AI system'", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("We build the AI system");
  });

  it("brand reads 'AI Integ' — no INTEGRITY_OS_V1 jargon", () => {
    render(<App />);
    expect(screen.getAllByText("AI Integ").length).toBeGreaterThan(0);
    expect(screen.queryByText(/INTEGRITY_OS_V1/)).not.toBeInTheDocument();
  });

  it("nav is plain English and jargon chrome is gone", () => {
    render(<App />);
    const whatWeDo = screen.getAllByRole("link", { name: /What we do/i });
    expect(whatWeDo.length).toBeGreaterThan(0);
    expect(whatWeDo[0]).toHaveAttribute("href", "#services");
    expect(screen.getAllByRole("link", { name: /How it works/i })[0]).toHaveAttribute(
      "href",
      "#process"
    );
    expect(screen.getAllByRole("link", { name: /Who we help/i })[0]).toHaveAttribute(
      "href",
      "#sectors"
    );
    expect(screen.getByRole("link", { name: /^About$/i })).toHaveAttribute("href", "#about");
    // Deleted jargon chrome
    for (const gone of [
      /L1_SETUP/,
      /L2_RISK/,
      /CRAWL_INIT/,
      /WALK_STAGED/,
      /RUN_DEPLOYED/,
      /TOOLCHAIN/,
      /SYSTEM_STATUS/,
      /n8n_NODES/,
      /CURSOR_IDE/,
      /CLAUDE_CMD/,
      /VIEW_ARCHITECTURE/,
    ]) {
      expect(screen.queryByText(gone)).not.toBeInTheDocument();
    }
  });

  it("hero secondary CTA reads 'See how the programme works' and scrolls to process", () => {
    render(<App />);
    const cta = screen.getByRole("link", { name: /See how the programme works/i });
    expect(cta).toHaveAttribute("href", "#process");
  });

  it("renders the hook problem statement with the filing-system analogy", () => {
    render(<App />);
    expect(
      screen.getByText(/Harvey\. Copilot\. Clio\. Great tools\. Zero implementation support\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/buying a filing system and leaving it in the boxes/i)
    ).toBeInTheDocument();
  });

  it("renders the proof section 'Who answers for the work' with credentials and closing line", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /Who answers for the work/i })).toBeInTheDocument();
    expect(screen.getByText(/Rajiv Abeysinghe/)).toBeInTheDocument();
    expect(screen.getByText(/27 years delivering enterprise technology/)).toBeInTheDocument();
    expect(screen.getByText(/The Digital Law Firm/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /One person answers for the whole build\. Not a rotating cast of associates\./
      )
    ).toBeInTheDocument();
  });

  it("renders the pricing commitment line in the bottom CTA", () => {
    render(<App />);
    expect(
      screen.getByText(/Discovery is a fixed fee, agreed before we start\./)
    ).toBeInTheDocument();
  });

  it("Skool links keep the live URL but carry the community relabel", () => {
    render(<App />);
    const skoolLink = screen.getByRole("link", {
      name: /Join the AI Integrity community — free/i,
    });
    expect(skoolLink).toHaveAttribute("href", "https://skool.com/ghostwriter-tandem-6940");
  });

  it("opens modal titled 'Book a scope call' when clicking the hero CTA", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    expect(screen.getByRole("heading", { name: "Book a scope call" })).toBeInTheDocument();
    expect(screen.getByText(/Three questions\. Two minutes\./)).toBeInTheDocument();
    // No Gemini roadmap promise
    expect(screen.queryByText(/Gemini Pro/)).not.toBeInTheDocument();
    expect(screen.queryByText(/90-day implementation roadmap/i)).not.toBeInTheDocument();
  });

  it("modal form uses plain labels with no terminal prefixes", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
    expect(screen.getByLabelText("Firm")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Sector")).toBeInTheDocument();
    expect(screen.getByLabelText("What do you want built?")).toBeInTheDocument();
    expect(screen.queryByText(/> FULL_NAME/)).not.toBeInTheDocument();
    expect(screen.queryByText(/WORKFLOW_SPEC/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Send$/i })).toBeInTheDocument();
  });

  it("consent line is plain English and links to the privacy notice", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    expect(
      screen.getByText(/We use these details to prepare for your call\. Nothing else\./)
    ).toBeInTheDocument();
    const privacyLinks = screen.getAllByRole("link", { name: /Privacy notice/i });
    expect(privacyLinks.length).toBeGreaterThan(0);
    for (const link of privacyLinks) {
      expect(link).toHaveAttribute("href", "/privacy.html");
    }
  });

  it("shows error if form in modal is submitted without consent", async () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    fillForm();

    const form = container.querySelector("form");
    if (!form) throw new Error("Form not found");
    fireEvent.submit(form);

    expect(screen.getByText(/Please consent/i)).toBeInTheDocument();
  });

  it("shows a plain-English error for an invalid email and does not call the API", async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    const { container } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    fillForm();
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByLabelText(/We use these details/i));

    const form = container.querySelector("form");
    if (!form) throw new Error("Form not found");
    fireEvent.submit(form);

    expect(screen.getByText(/Enter a valid email address so we can reply\./)).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it("honeypot: silently short-circuits to success without calling the API", async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    const { container } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    fillForm();
    fireEvent.click(screen.getByLabelText(/We use these details/i));

    const honeypot = container.querySelector("input[name='website']");
    if (!honeypot) throw new Error("Honeypot input not found");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    fireEvent.change(honeypot, { target: { value: "https://spam.example" } });

    const form = container.querySelector("form");
    if (!form) throw new Error("Form not found");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Received\. We reply within one working day\./)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it("shows the timeout message when the request aborts", async () => {
    const abortError = new DOMException("The operation was aborted.", "AbortError");
    const mockFetch = vi.fn().mockRejectedValue(abortError);
    vi.stubGlobal("fetch", mockFetch);

    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    fillForm();
    fireEvent.click(screen.getByLabelText(/We use these details/i));
    fireEvent.click(screen.getByRole("button", { name: /^Send$/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Request timed out — email us instead and we'll pick it up\./)
      ).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });

  it("submits the form and shows the received message — no roadmap rendered", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, roadmap: "SHOULD NOT RENDER" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    fillForm();
    fireEvent.click(screen.getByLabelText(/We use these details/i));
    fireEvent.click(screen.getByRole("button", { name: /^Send$/i }));

    await waitFor(() => {
      expect(screen.getByText(/Received\. We reply within one working day\./)).toBeInTheDocument();
    });
    expect(screen.queryByText(/SHOULD NOT RENDER/)).not.toBeInTheDocument();

    // Payload contains no phantom fields
    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body).not.toHaveProperty("job_title");
    expect(body).not.toHaveProperty("timeline");
    expect(body).not.toHaveProperty("referral_source");
    expect(body.email).toBe("jane@smithcorp.example");

    vi.unstubAllGlobals();
  });

  it("handles modal form submission error", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: "Validation failed" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    fillForm();
    fireEvent.click(screen.getByLabelText(/We use these details/i));
    fireEvent.click(screen.getByRole("button", { name: /^Send$/i }));

    await waitFor(() => {
      expect(screen.getByText(/Validation failed/i)).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });

  it("closes the modal when clicking the close button", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Scope your project/i }));
    expect(screen.getByRole("heading", { name: "Book a scope call" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("heading", { name: "Book a scope call" })).not.toBeInTheDocument();
  });

  it("opens modal from the mobile 'Book a call' nav button", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Book a call" }));
    expect(screen.getByRole("heading", { name: "Book a scope call" })).toBeInTheDocument();
  });

  it("disclaimer has role='note' and contains 'fixed-scope software delivery'", () => {
    render(<App />);
    const disclaimer = screen.getByRole("note");
    expect(disclaimer).toBeInTheDocument();
    expect(disclaimer).toHaveTextContent("fixed-scope software delivery");
  });

  it("ASIMOV AI cross-link points to the correct URL", () => {
    render(<App />);
    const asimovLinks = screen.getAllByRole("link", { name: /ASIMOV AI/i });
    const footerLink = asimovLinks.find(
      (link) => link.getAttribute("href") === "https://asimov-ai.org"
    );
    expect(footerLink).toBeDefined();
  });

  it("cn utility merges class names correctly", () => {
    const result = cn("px-4", "py-2", { "font-bold": true, italic: false });
    expect(result).toContain("px-4");
    expect(result).toContain("py-2");
    expect(result).toContain("font-bold");
    expect(result).not.toContain("italic");
  });
});
