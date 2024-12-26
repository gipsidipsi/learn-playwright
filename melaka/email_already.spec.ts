import { test, expect } from '@playwright/test';

test('Registration failed with already-used email or phone number', async ({ page }) => {
  await page.goto('https://dashboard.melaka.app/register');
  // Fill the registration form
  await page.getByTestId('register__text-field__name').fill('newuser');
  await page.getByTestId('register__text-field__phone-number').fill('81289145651'); //Existing phone number
  await page.getByTestId('register__text-field__business-name').fill('maezenclo');
  await page.getByTestId('register__radio-button__penjual-online').check();
  await page.getByTestId('register__text-field__email').fill('newuser@example.com'); //Existing email
  await page.getByTestId('register__text-field__password').fill('Mypassword23');
  await page.getByTestId('register__text-field__confirm-password').fill('Mypassword23');
  await page.getByTestId('register__checkbox__tnc').check();
  await page.getByTestId('register__button__sign-up').click();
  // Validate error messages
  await expect(page.getByTestId('register__text-field__phone-number__error')).toContainText('identitas sudah digunakan');
  await expect(page.getByTestId('register__text-field__email__error')).toContainText('identitas sudah digunakan');
  // Ensure the user stays on the registration page
  await expect(page).toHaveURL('https://dashboard.melaka.app/register');
});