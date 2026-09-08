import { expect, test } from "@playwright/test";

test.describe("AI Integ Forward", () => {
  test("nav link opens the forward view with hero, entry filter, and six gates", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "AI Integ Forward" }).click();

    await expect(page.getByRole("heading", { name: "AI Integ Forward" })).toBeVisible();
    await expect(page.getByText("Prototyping & MVP Delivery")).toBeVisible();
    await expect(page.getByText("Entry filter — scoped in the ToR before day one")).toBeVisible();

    for (let n = 1; n <= 6; n++) {
      await expect(page.getByRole("button", { name: new RegExp(`^GATE ${n}\\b`) })).toBeVisible();
    }
  });

  test("expanding a gate card reveals Purpose, typical questions, and Definition of Done", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "AI Integ Forward" }).click();

    const gateOneTrigger = page.getByRole("button", { name: /^GATE 1\b/ });
    await expect(gateOneTrigger).toHaveAttribute("aria-expanded", "false");

    await gateOneTrigger.click();

    await expect(gateOneTrigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Purpose")).toBeVisible();
    await expect(page.getByText("Typical questions to ask")).toBeVisible();
    await expect(page.getByText("Definition of Done")).toBeVisible();

    await gateOneTrigger.click();
    await expect(gateOneTrigger).toHaveAttribute("aria-expanded", "false");
  });

  test("'Back to homepage' returns to the main site", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "AI Integ Forward" }).click();
    await page.getByRole("button", { name: "Back to homepage" }).click();

    await expect(
      page.getByRole("heading", { name: "We build the AI system. We own what ships." })
    ).toBeVisible();
  });

  test("'Apply for a Forward slot' opens the scope call modal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "AI Integ Forward" }).click();
    await page.getByRole("button", { name: "Apply for a Forward slot" }).click();

    await expect(page.getByRole("heading", { name: "Book a scope call" })).toBeVisible();
  });

  test("homepage hero links the named delivery lead to the about section", async ({ page }) => {
    await page.goto("/");
    const strip = page.getByRole("link", { name: /one named delivery lead, not a rotating team/i });
    await expect(strip).toBeVisible();
    await expect(strip).toHaveAttribute("href", "#about");
  });

  test("forward view content has no horizontal overflow when resized to a 375px viewport", async ({
    page,
  }) => {
    // The "AI Integ Forward" nav entry lives in the desktop nav only — by
    // design it is not duplicated in the mobile bottom nav (same as CAP).
    // So open the view at desktop width, then resize down to check the
    // view's own responsive layout, rather than reaching it via mobile nav.
    await page.goto("/");
    await page.getByRole("button", { name: "AI Integ Forward" }).click();
    await expect(page.getByRole("heading", { name: "AI Integ Forward" })).toBeVisible();

    await page.setViewportSize({ width: 375, height: 812 });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });
});
