
const taxvalue = '[data-test="tax-label"]'
const totalPrice = '[data-test="total-label"]'
const itemTile = '.inventory_item_price'

export async function calculateCartTotals(page) {

  const priceTexts = await page.locator(itemTile).allTextContents();
  const productPrices = priceTexts.map(p => parseFloat(p.replace('$', '')));
  //calculate sub total from the items
  const subtotal = productPrices.reduce((a, b) => a + b, 0);
  //locate tax value and covert string to number
  const taxText = await page.locator(taxvalue).textContent();
  const taxUI = parseFloat(taxText.replace('Tax: $', ''));
  //locate total price  value and covert string to number
  const totalText = await page.locator(totalPrice).textContent();
  const totalUI = parseFloat(totalText.replace('Total: $', ''));

  const expectedTotal = subtotal + taxUI;

  console.log({ productPrices, subtotal, taxUI, expectedTotal, totalUI });

  return { productPrices, subtotal, taxUI, totalUI, expectedTotal };
}