import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with the correct document title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("AI Integ — We implement AI. We own the outcome.");
  });

  test("h1 is visible and contains correct text", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("We implement AI");
  });

  test("primary CTA links to /scope", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("#primary-cta");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/scope");
  });

  test("ASIMOV AI footer link is visible and points to asimov-ai.org", async ({ page }) => {
    await page.goto("/");
    const asimovLink = page.getByRole("link", { name: /ASIMOV AI — AI governance/i });
    await expect(asimovLink).toBeVisible();
    await expect(asimovLink).toHaveAttribute("href", "https://asimov-ai.org");
  });

  test("disclaimer note is visible", async ({ page }) => {
    await page.goto("/");
    const disclaimer = page.locator("[role='note']");
    await expect(disclaimer).toBeVisible();
  });

  test("renders without horizontal overflow on mobile 375px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });
});
