import { test, expect } from '@playwright/test';

test('Successful registration', async ({ page }) => {
  await page.goto('https://dashboard.melaka.app/register');

  // Fill registration form with valid data
  await page.getByTestId('register__text-field__name').fill('newuser');
  await page.getByTestId('register__text-field__phone-number').fill('81345678764');
  await page.getByTestId('register__text-field__business-name').fill('maezenclo');
  await page.getByTestId('register__radio-button__brand').check();
  await page.getByTestId('register__text-field__email').fill('newusermelaka@example.com');
  await page.getByTestId('register__text-field__password').fill('Mypassword23');
  await page.getByTestId('register__text-field__confirm-password').fill('Mypassword23');
  await page.getByTestId('register__checkbox__tnc').check();
  // Toggle password visibility and verify
  await page.getByTestId('register__icon__eye-password').click();
  await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'text');
  await page.getByTestId('register__icon__eye-confirm-password').click();
  await expect(page.getByTestId('register__text-field__confirm-password')).toHaveAttribute('type', 'text');
  // Submit the form
  await page.getByTestId('register__button__sign-up').click();
});
