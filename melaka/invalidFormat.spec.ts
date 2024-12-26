import { test, expect } from '@playwright/test';

test('Invalid format data', async ({ page }) => {
  await page.goto('https://dashboard.melaka.app/register');
   // Fill registration form with invalid data
   await page.getByTestId('register__text-field__name').fill('newuser');
   await page.getByTestId('register__text-field__phone-number').fill('8127614'); // Too short
   await page.getByTestId('register__text-field__business-name').fill('maezen');
   await page.getByTestId('register__text-field__password').fill('abc'); // Weak password
   await page.getByTestId('register__text-field__confirm-password').fill('abc'); // Weak password
   await page.getByTestId('register__checkbox__tnc').check();
   await page.getByTestId('register__button__sign-up').click();
   // Validate error messages
   await expect(page.getByTestId('register__text-field__phone-number__error'))
     .toContainText('Wajib diisi. Nomor telepon tidak boleh kurang dari 10 atau lebih dari 12 karakter.');
   await expect(page.getByTestId('register__text-field__phone-number')).toHaveValue('8127614');
   await expect(page.getByTestId('register__text-field__email__error')).toContainText('Wajib diisi.');
   await expect(page.getByTestId('register__text-field__email')).toBeEmpty();
   await expect(page.getByTestId('register__text-field__password__error'))
     .toContainText('Min. 8 karakter, harus kombinasi dari huruf dan angka.');
   await expect(page.getByTestId('register__text-field__password')).toHaveValue('abc');
});