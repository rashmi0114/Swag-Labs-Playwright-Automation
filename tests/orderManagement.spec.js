import { test, expect } from "@playwright/test";
import { config } from '../config/testData';

const firstNameData = "Rashmi";
const lastNameData = "Alagiyawanna";
const postalCodeData = "3216";
const orderNameData = "Sauce Labs Backpack";
const checkoutCompleteText = "Checkout: Complete!";
const checkoutCompleteHeader = '[data-test="secondary-header"]';
const checkoutInformationText = "Checkout: Your Information";
const titleyourCart = "Your Cart";
const DashboardTitle = "Swag Labs";
const username = '[data-test="username"]';
const password = '[data-test="password"]';
const loginButton = '[data-test="login-button"]';
const firstName = '[data-test="firstName"]';
const lastName = '[data-test="lastName"]';
const postalCode = '[data-test="postalCode"]';
const continueButton = '[data-test="continue"]';
const finishButton = '[data-test="finish"]';
const logoutButton = '[data-test="logout-sidebar-link"]';
const backToProductsButton = '[data-test="back-to-products"]';
const orderName =
  '[data-test="item-4-title-link"] [data-test="inventory-item-name"]';
const pageTitle = '[data-test="title"]';
const addToCartButton = (productName) => `[data-test="add-to-cart-${productName}"]`;
const removeFromCartButton = '[data-test="remove-sauce-labs-backpack"]';
const shoppingCartLink = '[data-test="shopping-cart-link"]';
const checkoutButton = '[data-test="checkout"]';
const continueShoppingButton = '[data-test="continue-shopping"]';
const cartItems = '.cart_item'; 


test.beforeEach(async ({ page }) => {
  await page.goto(config.baseURL);
  await expect(page.getByText(DashboardTitle)).toBeVisible();
  await page.locator(username).click();
  await page.locator(username).fill(config.username);
  await page.locator(password).click();
  await page.locator(password).fill(config.password);
  await page.locator(loginButton).click();
  await expect(page.locator(pageTitle)).toBeVisible();
});

test("test add order to cart @sanity", async ({ page }) => {
  await expect(page.locator(orderName)).toContainText(orderNameData);
  await page.locator(addToCartButton('sauce-labs-backpack')).click();
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
  await page.locator(addToCartButton('sauce-labs-backpack')).click();
  await page.locator(removeFromCartButton).click();
  await page.locator(addToCartButton('sauce-labs-backpack')).click();
  await page.locator(shoppingCartLink).click();
  await expect(page.locator(pageTitle)).toContainText(titleyourCart);
  await page.locator(removeFromCartButton).click();
  await page.locator(continueShoppingButton).click();
});

test.only("add multiple orders @sanity", async ({ page }) => {
 await page.locator(addToCartButton('sauce-labs-backpack')).click();
  await page.locator(addToCartButton('sauce-labs-bike-light')).click();
  await page.locator(addToCartButton('sauce-labs-bolt-t-shirt')).click();
  await page.locator(addToCartButton('sauce-labs-fleece-jacket')).click();
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

test.afterEach(async ({ page }) => {
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator(logoutButton).click();
});
