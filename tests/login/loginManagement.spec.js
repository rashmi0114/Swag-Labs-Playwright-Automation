import { test, expect } from "@playwright/test";
import { login, logout } from "../../helpers/auth";
import { selectSortAndVerify } from "../../helpers/sortHelper";

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
const itemDetailView = ".inventory_details_container";

test.beforeEach(async ({ page }) => {
  await login(page);
});

test("test add order to cart @sanity", async ({ page }) => {
  
});

test("test remove order to cart @sanity", async ({ page }) => {
 
});

test("add multiple orders @sanity", async ({ page }) => {
  
});

test("remove multiple orders @sanity", async ({ page }) => {
  
});

test("verify product sorting @sanity", async ({ page }) => {

});

test('Verify Product detail View @sanity', async ({ page }) => {
  
});

test.afterEach(async ({ page }) => {
  await logout(page);
});