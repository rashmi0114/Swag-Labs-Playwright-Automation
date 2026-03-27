import { test, expect } from "@playwright/test";
import { login, logout } from "../../helpers/auth";
import { selectSortAndVerify } from "../../helpers/sortHelper";
import { calculateCartTotals } from '../../helpers/paymentHelper';

const firstNameData = "Rashmi";
const lastNameData = "Alagiyawanna";
const postalCodeData = "3216";
const orderNameData = "Sauce Labs Backpack";
const orderconfirmationMessage = 'Thank you for your order!';
const checkoutCompleteText = "Checkout: Complete!"; 
const checkoutCompleteHeader = '[data-test="complete-header"]';
const checkoutInformationText = "Checkout: Your Information";
const titleyourCart = "Your Cart";
const firstName = '[data-test="firstName"]';
const lastName = '[data-test="lastName"]';
const postalCode = '[data-test="postalCode"]';
const continueButton = '[data-test="continue"]';
const finishButton = '[data-test="finish"]';
const cancelButton = '[data-test="cancel"]';
const backToProductsButton = '[data-test="back-to-products"]';
const orderName =
  '[data-test="item-4-title-link"] [data-test="inventory-item-name"]';
const pageTitle = '[data-test="title"]';
const addToCartButton = (product) =>
  `[data-test="add-to-cart-${product}"]`;
const removeFromCartButton = (productName) =>
  `[data-test="remove-sauce-labs-${productName}"]`;
const shoppingCartLink = '[data-test="shopping-cart-link"]';
const checkoutButton = '[data-test="checkout"]';
const continueShoppingButton = '[data-test="continue-shopping"]';
const cartItems = ".cart_item";
const itemDetailView = ".inventory_details_container";

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('add multiple products and verify total with tax @payment', async ({ page }) => {
  const products = ['sauce-labs-backpack', 'sauce-labs-bike-light'];
  for (const product of products) {
  await page.click(addToCartButton(product));
}
  await page.click(shoppingCartLink);
  await page.click(checkoutButton);
  await page.fill(firstName, firstNameData);
  await page.fill(lastName, lastNameData);
  await page.fill(postalCode, postalCodeData);
  await page.click(continueButton);
  const { totalUI, expectedTotal } = await calculateCartTotals(page);
  expect(totalUI).toBeCloseTo(expectedTotal, 2);
  await page.click(finishButton);
  await expect(page.locator(checkoutCompleteHeader)).toContainText(orderconfirmationMessage);
  await page.click(backToProductsButton);
});

test('add multiple products remove one item and verify total with tax @payment', async ({ page }) => {
  const products = ['sauce-labs-backpack', 'sauce-labs-bike-light'];
  for (const product of products) {
  await page.click(addToCartButton(product));
}
  await page.click(shoppingCartLink);
  await page.locator(removeFromCartButton("bike-light")).click();
  await page.click(checkoutButton);
  await page.fill(firstName, firstNameData);
  await page.fill(lastName, lastNameData);
  await page.fill(postalCode, postalCodeData);
  await page.click(continueButton);
  const { totalUI, expectedTotal } = await calculateCartTotals(page);
  expect(totalUI).toBeCloseTo(expectedTotal, 1);
  await page.click(finishButton);
  await expect(page.locator(checkoutCompleteHeader)).toContainText(orderconfirmationMessage);
  await page.click(backToProductsButton);
});

test('Verify Warnings when try checkout without filling information @payment', async ({ page }) => {
  const products = ['sauce-labs-backpack', 'sauce-labs-bike-light'];
  for (const product of products) {
  await page.click(addToCartButton(product));
}
  await page.click(shoppingCartLink);
  await page.locator(removeFromCartButton("bike-light")).click();
  await page.click(checkoutButton);
  await page.click(continueButton);
  const { totalUI, expectedTotal } = await calculateCartTotals(page);
  expect(totalUI).toBeCloseTo(expectedTotal, 1);
  await page.click(finishButton);
  await expect(page.locator(checkoutCompleteHeader)).toContainText(orderconfirmationMessage);
  await page.click(backToProductsButton);
});

test('Verify cancelling the order before  process checkout @payment', async ({ page }) => {
  const products = ['sauce-labs-backpack', 'sauce-labs-bike-light'];
  for (const product of products) {
  await page.click(addToCartButton(product));
}
  await page.click(shoppingCartLink);
  await page.click(checkoutButton);
  await page.fill(firstName, firstNameData);
  await page.fill(lastName, lastNameData);
  await page.fill(postalCode, postalCodeData);
  await page.click(continueButton);
  await page.click(cancelButton);
});

test.afterEach(async ({ page }) => {
  await logout(page);
});