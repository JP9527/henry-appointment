import { test, expect } from '@playwright/test';
import { MainPage } from '../../page-objects/main-page';
import { ContactDetails } from '../../page-objects/contact-details';

test.describe('appointments workflow testing', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://onboard-dev.henrymeds.com/?kameleoon_override');
        await page.waitForSelector('button[data-testid]');
        await page.getByRole('button', { name: 'Close this dialog' }).click();
        const mainPage = new MainPage(page);
        await mainPage.clickOnStateButton('California');
        await page.waitForSelector('button[data-testid]');
    });


    test('available appointments header and footer', async ({ page }) => {
        //validate context in header and footer
    });


    test('select first appt continue to appt details', async ({ page }) => {
        const buttons = await page.$$(`button[data-testid]`);
        await buttons[0].click();
        await page.waitForSelector('button');
        const contactDetails = new ContactDetails(page);
        await contactDetails.clickAppointmentOverviewContinue();
        await expect(page.url()).toContain('checkout');
        await expect(contactDetails.firstName).toBeVisible();
    });

    test('select last appt continue to appt details', async ({ page }) => {
        const buttons = await page.$$(`button[data-testid]`);
        await buttons[buttons.length - 1].click();
        await page.waitForSelector('button');
        const contactDetails = new ContactDetails(page);
        await contactDetails.clickAppointmentOverviewContinue();
        await expect(page.url()).toContain('checkout');
        await expect(contactDetails.firstName).toBeVisible();
    });

    test('reservation made in 24 hours in advance', async ({ page }) => {
        const buttons = await page.$$(`button[data-testid]`);
        const firstAppointment = await buttons[0].getAttribute('data-testid');
        await expect(buttons.length).toBeGreaterThan(0);
        const now = new Date();
        const firstAppointmentDate = new Date(firstAppointment);
        await expect(firstAppointmentDate - now).toBeGreaterThan(24 * 60 * 60 * 1000);
    });


    test('reservation expire after 30 mins', async ({ page }) => {
        test.setTimeout(60 * 60 * 1000);
        await page.waitForSelector('button[data-testid]');
        const buttons = await page.$$(`button[data-testid]`);
        buttons[1].click();
        await page.waitForSelector('button');
        const contactDetails = new ContactDetails(page);
        await contactDetails.clickAppointmentOverviewContinue();
        // wait for 31 minutes for page to expire
        await page.waitForTimeout(31 * 60 * 1000);
        // refresh current page
        await page.reload();
        // Wait for the popup to appear
        const dialog = await page.waitForEvent('dialog');
        const dialogMessage = dialog.message();
        await expect(dialogMessage).toContain('Sorry, this appointment time is no longer valid. Please select another time.');
    });
})