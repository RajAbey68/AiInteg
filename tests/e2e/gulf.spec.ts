import { expect, test } from "@playwright/test";

test.describe("Gulf page", () => {
  test("loads at /gulf with the Gulf document title", async ({ page }) => {
    await page.goto("/gulf");
    await expect(page).toHaveTitle("AI Integ Gulf — Your outcome. Our responsibility.");
  });

  test("h1 carries the outcome-ownership promise", async ({ page }) => {
    await page.goto("/gulf");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Your outcome.");
    await expect(heading).toContainText("Our responsibility.");
  });

  test("Gulf-way promise and data-handling cards are visible", async ({ page }) => {
    await page.goto("/gulf");
    await expect(page.getByText(/Gulf way, following the local rules/i)).toBeVisible();
    await expect(page.getByText("Approved AI services")).toBeVisible();
    await expect(page.getByText("Controlled business environments")).toBeVisible();
    await expect(page.getByText("Private, in-country where required")).toBeVisible();
  });

  test("names the Gulf business development lead", async ({ page }) => {
    await page.goto("/gulf");
    await expect(page.getByRole("heading", { name: "Manju Ramachandran" })).toBeVisible();
  });

  test("primary CTA opens the scope call modal; never submit it", async ({ page }) => {
    await page.goto("/gulf");
    const cta = page.getByRole("button", { name: /scope your outcome/i }).first();
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page.getByRole("heading", { name: "Book a scope call" })).toBeVisible();
  });

  test("nav Gulf button routes to the Gulf view", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^Gulf$/i }).click();
    await expect(page).toHaveURL(/\/gulf$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Your outcome.");
  });
});
