import { test, expect } from '@playwright/test';
test.describe('Melaka Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Successful registration', async ({ page }) => {
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

  test('Invalid format data', async ({ page }) => {
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

  test('Registration failed with already-used email or phone number', async ({ page }) => {
    // Fill the registration form
    await page.getByTestId('register__text-field__name').fill('newuser');
    await page.getByTestId('register__text-field__phone-number').fill('81289145651'); // Existing phone number
    await page.getByTestId('register__text-field__business-name').fill('maezenclo');
    await page.getByTestId('register__radio-button__penjual-online').check();
    await page.getByTestId('register__text-field__email').fill('newuser@example.com'); // Existing email
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
});