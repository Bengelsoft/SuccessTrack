import { test, expect } from '@playwright/test';

test('write success', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // Verify 'Successes' link and click it
  await expect(page.locator('a >> text=Successes')).toBeVisible();
  await page.locator('a >> text=Successes').click();

  // Verify 'Schrijven' button and click it
  await expect(page.locator('button >> text=Schrijven')).toBeVisible();
  await page.locator('button >> text=Schrijven').click();

  // Verify 'extra success' button and click it
  await expect(page.locator('button >> text=extra success')).toBeVisible();
  await page.locator('button >> text=extra success').click();

  // Verify input field and click it
  await expect(page.locator('input[type="text"]')).toBeVisible();
  await page.locator('input[type="text"]').click();

  // Verify 'Today' button and click it
  await expect(page.locator('button >> text=Today')).toBeVisible();
  await page.locator('button >> text=Today').click();

  // Verify textarea and fill it with 'test input'
  await expect(page.locator('textarea')).toBeVisible();
  await page.locator('textarea').fill('test input');

  // Verify and click on 'Behaald (gewenst) resultaat'
  await expect(page.locator('text=Behaald (gewenst) resultaat')).toBeVisible();
  await page.locator('text=Behaald (gewenst) resultaat').click();

  // Verify and click on 'In actie komen'
  await expect(page.locator('text=In actie komen')).toBeVisible();
  await page.locator('text=In actie komen').click();

  // Verify and click on 'Inzicht opdoen(aha)'
  await expect(page.locator('text=Inzicht opdoen(aha)')).toBeVisible();
  await page.locator('text=Inzicht opdoen(aha)').click();

  // Verify and click on '(H)erken de fout'
  await expect(page.locator('text=(H)erken de fout')).toBeVisible();
  await page.locator('text=(H)erken de fout').click();

  // Verify and click on 'Nieuw begrip (iets geleerd)'
  await expect(page.locator('text=Nieuw begrip (iets geleerd)')).toBeVisible();
  await page.locator('text=Nieuw begrip (iets geleerd)').click();

  // Verify 'Save' button and click it
  await expect(page.locator('button >> text=Save')).toBeVisible();
  await page.locator('button >> text=Save').click();

  // Verify dialog and click the second button in the dialog
  await page.getByRole('dialog').getByRole('button').nth(1).click();

  // Verify and click on a specific cell containing 'test input'
  await expect(page.locator('text=test input')).toBeVisible();
  await page.locator('text=test input').click();

  // Verify and click on a specific cell containing the desired text
  await expect(page.getByRole('cell', { name: 'Behaald (gewenst) resultaat In actie komen Inzicht opdoen(aha) (H)erken de fout Nieuw begrip (iets geleerd)' })).toBeVisible();
});
