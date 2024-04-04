import { test, expect } from '@playwright/test';
import { ContactDetails } from '../../page-objects/contact-details';
import { MainPage } from '../../page-objects/main-page';

test.describe('contact details cases', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://onboard-dev.henrymeds.com/?kameleoon_override');
        await page.waitForSelector('button[data-testid]');
        const mainPage = new MainPage(page);
        await mainPage.clickOnStateButton('California');
        await page.waitForSelector('button[data-testid]');
        await page.getByRole('button', { name: 'Close this dialog' }).click();
        const buttons = await page.$$(`button[data-testid]`);
        await buttons[1].click();
    });

    test('valid contact details', async ({ page }) => {
        const contactDetails = new ContactDetails(page);
        await page.waitForSelector('button[data-testid]');
        await contactDetails.clickAppointmentOverviewContinue();
        const element = contactDetails.continue;
        await element.scrollIntoViewIfNeeded();
        await contactDetails.fillForm('David', 'Tan', 'david@henry.com', 'david@henry.com', '01/01/1987', '2025551234','Male', 'He/Him', true, true);
        await page.waitForSelector('button[data-testid]');
        await expect(contactDetails.continue).toBeEnabled();
        await contactDetails.submitForm();
        await expect(page.getByTestId('addressLine1')).toBeVisible();
    });

    test('not matching emails', async ({ page }) => {
        const contactDetails = new ContactDetails(page);
        await page.waitForSelector('button[data-testid]');
        await contactDetails.clickAppointmentOverviewContinue();
        const element = contactDetails.continue;
        await element.scrollIntoViewIfNeeded();
        await contactDetails.fillForm('David', 'Tan', 'david@henry.com', 'da@henry.com', '01/01/1987', '2025551234','Male', 'He/Him', false, true);
        await expect(page.locator('form')).toContainText('Emails must match.');

    });

    test('invalid contact details with nulls', async ({ page }) => {
        const contactDetails = new ContactDetails(page);
        await page.waitForSelector('button[data-testid]');
        await contactDetails.clickAppointmentOverviewContinue();
        const element = contactDetails.continue;
        await element.scrollIntoViewIfNeeded();
        await contactDetails.fillForm('', '', '', '', '', '','', '', true, true);
        await expect(contactDetails.continue).not.toBeEnabled();
    });

    // can add more negative test cases here
});