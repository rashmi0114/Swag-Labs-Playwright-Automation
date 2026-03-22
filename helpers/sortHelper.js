import { expect } from "@playwright/test";

const sortDropdown = '[data-test="product-sort-container"]';
const productPrices = ".inventory_item_price";

export async function selectSortAndVerify(page, option) {
  await page.locator(sortDropdown).selectOption(option);
  //read all prices
  const prices = await page.locator(productPrices).allTextContents();
  //Remove $ and convert to numbers
  //parseFloat used to convert strings to numbers
  const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));
  //Copy the price list
  const sorted = [...numericPrices];

  if (option === "lohi") {
    sorted.sort((a, b) => a - b);
  } else if (option === "hilo") {
    sorted.sort((a, b) => b - a);
  }
  await expect(numericPrices).toEqual(sorted);
}
