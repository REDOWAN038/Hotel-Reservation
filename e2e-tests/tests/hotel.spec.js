import { test, expect } from "@playwright/test";
import path from "path";

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

// add hotel
test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}add-hotels`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page
        .locator('[name="description"]')
        .fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpeg"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("hotel added successfully")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}my-hotels`);

    await expect(page.getByRole("heading", { name: "Test Hotel" })).toBeVisible();
    await expect(page.getByText("This is a description for the Test Hotel")).toBeVisible();
    await expect(page.getByText("Test City, Test Country")).toBeVisible();
    await expect(page.getByText("Budget")).toBeVisible();
    await expect(page.getByText("100 per night")).toBeVisible();
    await expect(page.getByText("2 adults, 4 children")).toBeVisible();
    await expect(page.getByText("3 Star Rating")).toBeVisible();

    await expect(
        page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});