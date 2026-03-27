import { test, expect } from "@playwright/test";
import { config } from "../../config/testData";
import { loginWithCredentials } from "../../helpers/auth";

const problemUserItemImage =
  'img[src="/static/media/sl-404.168b1cce10384b857a6f.jpg"]';
const orderName =
  '[data-test="item-4-title-link"] [data-test="inventory-item-name"]';
const backToProductsButton = '[data-test="back-to-products"]';
const pageTitle = '[data-test="title"]';
const addToCartButton = (productName) =>
  `[data-test="add-to-cart-${productName}"]`;
const removeFromCartButton = (productName) =>
  `[data-test="remove-sauce-labs-${productName}"]`;
const checkoutButton = '[data-test="checkout"]';
const shoppingCartLink = '[data-test="shopping-cart-link"]';

test("Verify Login as a Locked User @login", async ({ page }) => {
  await loginWithCredentials(
    page,
    config.lockedusername,
    config.password
  );
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Verify Login as a Problem User @login", async ({ page }) => {
  await loginWithCredentials(
    page,
    config.problemusername,
    config.password
  );
  const brokenImages = page.locator(problemUserItemImage);
  await expect(brokenImages).toHaveCount(6);
});

test("Verify Login as a performance Glich User @login", async ({ page }) => {
  await loginWithCredentials(
    page,
    config.performanceGlichUsername,
    config.password
  );
  await page.locator(orderName).first().click();
  await page.locator(backToProductsButton).click();
  await expect(page.locator(pageTitle)).toBeVisible();
});

test("Verify Login as a Error User @login", async ({ page }) => {
  await loginWithCredentials(
    page,
    config.errorUsername,
    config.password
  );
  await expect(
    page.locator(addToCartButton("sauce-labs-backpack"))
  ).toContainText("Add to cart");
  await page.locator(addToCartButton("sauce-labs-backpack")).click();
  await expect(
    page.locator(removeFromCartButton("backpack"))
  ).toContainText("Remove");
  await page.locator(removeFromCartButton("backpack")).click();
  await expect(
    page.locator(removeFromCartButton("backpack"))
  ).toContainText("Remove");
});


test("Verify Login as a Visual User @login", async ({ page }) => {
  await loginWithCredentials(
    page,
    config.visualusername,
    config.password
  );
  await expect(
    page.locator(addToCartButton("sauce-labs-backpack"))
  ).toContainText("Add to cart");
  await page.locator(shoppingCartLink).click();
  const checkoutBtn = page.locator(checkoutButton);
  await expect(checkoutBtn).toBeVisible();
  const box = await checkoutBtn.boundingBox();
  const pageWidth = page.viewportSize().width;
  expect(box.y).toBeLessThan(150);
  expect(box.x + box.width).toBeGreaterThan(pageWidth - 30);
});