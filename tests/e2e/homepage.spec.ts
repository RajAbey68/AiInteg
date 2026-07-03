import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with the correct document title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("AI Integ — We implement AI. We own the outcome.");
  });

  test("h1 is visible and contains the current hero text", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("We build the AI system. We own what ships.");
  });

  test("primary CTA opens the scope call modal with the intake form", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("button", { name: "Scope your project" });
    await expect(cta).toBeVisible();
    await cta.click();

    // Modal content appears — assert the form renders; never submit it.
    await expect(page.getByRole("heading", { name: "Book a scope call" })).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
  });

  test("ASIMOV AI footer link is visible and points to asimov-ai.org", async ({ page }) => {
    await page.goto("/");
    const asimovLink = page.getByRole("link", { name: /ASIMOV AI — AI governance/i });
    await expect(asimovLink).toBeVisible();
    await expect(asimovLink).toHaveAttribute("href", "https://asimov-ai.org");
  });

  test("service disclaimer note is visible in the footer", async ({ page }) => {
    await page.goto("/");
    const disclaimer = page.locator("#service-disclaimer");
    await expect(disclaimer).toBeVisible();
    await expect(disclaimer).toContainText("fixed-scope software delivery");
  });

  test("renders without horizontal overflow on mobile 375px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });
});
