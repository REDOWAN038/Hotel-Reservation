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

// show hotel details
test("should show hotel detail", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test Country");
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByRole("link", { name: "Test Hotel" }).click()
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

// book hotel
test("should book hotel", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test Country");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByRole("link", { name: "Test Hotel" }).click()
    await page.getByRole("button", { name: "Book now" }).click();

    await expect(page.getByText("Total Cost: $300.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame
        .locator('[placeholder="Card number"]')
        .fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("10/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await expect(page.getByText("hotel booking successful")).toBeVisible();
});