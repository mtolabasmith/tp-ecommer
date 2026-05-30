import { test, expect } from "@playwright/test";

test("home loads and navigates to the catalog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Enter the Archive" }).click();
  await expect(page).toHaveURL(/\/products/);
});

test("catalog lists products and adding one updates the cart count", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("button", { name: "Add to Cart" }).first().click();
  await expect(page.locator(".nav-cart-btn")).toContainText("Cart (1)");
});
