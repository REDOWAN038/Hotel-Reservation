import { test, expect } from "@playwright/test";

const FRONTEND_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("test@gmail.com");
    await page.locator("[name=password]").fill("test");

    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("welcome back, test man")).toBeVisible();
});

// search hotel
test("should show hotel search results", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test Country");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in Test Country")).toBeVisible();
    await expect(page.getByRole("link", { name: "Test Hotel" })).toBeVisible();
});