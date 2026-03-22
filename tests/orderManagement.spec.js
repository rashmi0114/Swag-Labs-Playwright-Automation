import { test, expect } from "@playwright/test";
import { login, logout } from "../helpers/auth";

const firstNameData = "Rashmi";
const lastNameData = "Alagiyawanna";
const postalCodeData = "3216";
const orderNameData = "Sauce Labs Backpack";
const checkoutCompleteText = "Checkout: Complete!";
const checkoutCompleteHeader = '[data-test="secondary-header"]';
const checkoutInformationText = "Checkout: Your Information";
const titleyourCart = "Your Cart";
const firstName = '[data-test="firstName"]';
const lastName = '[data-test="lastName"]';
const postalCode = '[data-test="postalCode"]';
const continueButton = '[data-test="continue"]';
const finishButton = '[data-test="finish"]';
const backToProductsButton = '[data-test="back-to-products"]';
const orderName =
  '[data-test="item-4-title-link"] [data-test="inventory-item-name"]';
const pageTitle = '[data-test="title"]';
const addToCartButton = (productName) =>
  `[data-test="add-to-cart-${productName}"]`;
const removeFromCartButton = (productName) =>
  `[data-test="remove-sauce-labs-${productName}"]`;
const shoppingCartLink = '[data-test="shopping-cart-link"]';
const checkoutButton = '[data-test="checkout"]';
const continueShoppingButton = '[data-test="continue-shopping"]';
const cartItems = ".cart_item";

test.beforeEach(async ({ page }) => {
  await login(page);
});

test("test add order to cart @sanity", async ({ page }) => {
  await expect(page.locator(orderName)).toContainText(orderNameData);
  await page.locator(addToCartButton("sauce-labs-backpack")).click();
  await page.locator(shoppingCartLink).click();
  await expect(page.locator(pageTitle)).toContainText(titleyourCart);
  await expect(page.locator(checkoutButton)).toBeVisible();
  await page.locator(checkoutButton).click();
  await page.locator(firstName).click();
  await page.locator(firstName).fill(firstNameData);
  await page.locator(lastName).click();
  await page.locator(lastName).fill(lastNameData);
  await page.locator(postalCode).click();
  await page.locator(postalCode).fill(postalCodeData);
  await expect(page.locator(pageTitle)).toContainText(checkoutInformationText);
  await page.locator(continueButton).click();
  await expect(page.locator(pageTitle)).toBeVisible();
  await page.locator(finishButton).click();
  await expect(page.locator(checkoutCompleteHeader)).toContainText(
    checkoutCompleteText,
  );
  await page.locator(backToProductsButton).click();
});

test("test remove order to cart @sanity", async ({ page }) => {
  await expect(page.locator(orderName)).toContainText(orderNameData);
  await page.locator(addToCartButton("sauce-labs-backpack")).click();
  await page.locator(removeFromCartButton("backpack")).click();
  await page.locator(addToCartButton("sauce-labs-backpack")).click();
  await page.locator(shoppingCartLink).click();
  await expect(page.locator(pageTitle)).toContainText(titleyourCart);
  await page.locator(removeFromCartButton("backpack")).click();
  await page.locator(continueShoppingButton).click();
});

test("add multiple orders @sanity", async ({ page }) => {
  await page.locator(addToCartButton("sauce-labs-backpack")).click();
  await page.locator(addToCartButton("sauce-labs-bike-light")).click();
  await page.locator(addToCartButton("sauce-labs-bolt-t-shirt")).click();
  await page.locator(addToCartButton("sauce-labs-fleece-jacket")).click();
  await page.locator(shoppingCartLink).click();
  await expect(page.locator(cartItems)).toHaveCount(4);
  await page.locator(checkoutButton).click();
  await page.locator(firstName).click();
  await page.locator(firstName).fill(firstNameData);
  await page.locator(lastName).click();
  await page.locator(lastName).fill(lastNameData);
  await page.locator(postalCode).click();
  await page.locator(postalCode).fill(postalCodeData);
  await expect(page.locator(pageTitle)).toContainText(checkoutInformationText);
  await page.locator(continueButton).click();
  await expect(page.locator(pageTitle)).toBeVisible();
  await page.locator(finishButton).click();
  await expect(page.locator(checkoutCompleteHeader)).toContainText(
    checkoutCompleteText,
  );
  await page.locator(backToProductsButton).click();
});

test("remove multiple orders @sanity", async ({ page }) => {
  await page.locator(addToCartButton("sauce-labs-backpack")).click();
  await page.locator(addToCartButton("sauce-labs-bike-light")).click();
  await page.locator(addToCartButton("sauce-labs-bolt-t-shirt")).click();
  await page.locator(addToCartButton("sauce-labs-fleece-jacket")).click();
  await page.locator(shoppingCartLink).click();
  await expect(page.locator(cartItems)).toHaveCount(4);
  await expect(page.locator(pageTitle)).toContainText(titleyourCart);
  await page.locator(removeFromCartButton("backpack")).click();
  await page.locator(removeFromCartButton("bike-light")).click();
  await page.locator(removeFromCartButton("bolt-t-shirt")).click();
  await page.locator(removeFromCartButton("fleece-jacket")).click();
  await page.locator(continueShoppingButton).click();
});

test.afterEach(async ({ page }) => {
  await logout(page);
});