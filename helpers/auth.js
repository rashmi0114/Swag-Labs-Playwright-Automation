import { expect } from "@playwright/test";
import { config } from "../config/testData";

const username = '[data-test="username"]';
const password = '[data-test="password"]';
const loginButton = '[data-test="login-button"]';
const logoutButton = '[data-test="logout-sidebar-link"]';
const pageTitle = '[data-test="title"]';

export async function loginWithCredentials(page, user, pass) {
  await page.goto(config.baseURL);
  await page.locator(username).fill(user);
  await page.locator(password).fill(pass);
  await page.locator(loginButton).click();
}

export async function login(page) {
  await loginWithCredentials(page, config.username, config.password);
  await expect(page.locator(pageTitle)).toBeVisible();
}

export async function login1(page) {
  await page.goto(config.baseURL);
  await page.locator(username).fill(config.username);
  await page.locator(password).fill(config.password);
  await page.locator(loginButton).click();
  await expect(page.locator(pageTitle)).toBeVisible();
}

export async function logout(page) {
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator(logoutButton).click();
}