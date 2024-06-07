import { test, expect } from "@playwright/test";

const FRONTEND_URL = "http://localhost:5173/";

// testing user registration
test("should allow user to register", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Sign Up" }).click();

    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    await page.locator("[name=firstName]").fill("test");
    await page.locator("[name=lastName]").fill("man");
    await page.locator("[name=email]").fill("test@gmail.com");
    await page.locator("[name=password]").fill("test");
    await page.locator("[name=confirmPassword]").fill("test");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("user registered successfully")).toBeVisible();
});

// testing user login
test("should allow the user to sign in", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("test@gmail.com");
    await page.locator("[name=password]").fill("test");

    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("welcome back, test man")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});