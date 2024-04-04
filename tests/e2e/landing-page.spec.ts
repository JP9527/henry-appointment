import { test, expect } from '@playwright/test';
import { MainPage } from '../../page-objects/main-page';
import { SupportOtherState } from '../../page-objects/support-other-state';
import { ContactDetails } from '../../page-objects/contact-details';


test.describe('Landing page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://onboard-dev.henrymeds.com/?kameleoon_override');
        await page.waitForSelector('button[data-testid]');
        await page.getByRole('button', { name: 'Close this dialog' }).click();
    });
    
    test('Landing page header and footer', async ({ page }) => {
        // validate the header and footer information are correct
    });

    test('state with available appointments slots', async ({ page }) => {  
        const mainPage = new MainPage(page);
        await mainPage.clickOnStateButton('California');
        await page.waitForSelector('button[data-testid]');
        const buttons = await page.$$(`button[data-testid]`);
        await buttons[1].click();
        await page.waitForSelector('button')
        const contactDetails = new ContactDetails(page);
        await expect(contactDetails.appointmentOverviewContinue).toBeVisible();
        // can add more assertions for text validation
    }); 

    test('state with no available appointments slots', async ({ page }) => { 
        const mainPage = new MainPage(page);
        await mainPage.clickOnStateButton('Maryland');
        await page.waitForSelector('img');
        await expect(page.locator('.css-1r3vilw')).toContainText("Sorry! We currently have no availabilities for ");
    });


    test('other state information', async ({ page }) => {
        const mainPage = new MainPage(page);
        const supportOtherState = new SupportOtherState(page);
        await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
        const element = mainPage.otherstateButton;
        await element.scrollIntoViewIfNeeded();
        await mainPage.clickOnStateButton('Other State');
        await page.waitForSelector('button');
        await supportOtherState.fillForm('David', 'Anthony', '2015550432', 'davidanthony@henry.com');
        await supportOtherState.clickOkButton();
        await page.waitForSelector('button');
        await supportOtherState.selectState('Alabama');
        await supportOtherState.clickSubmitButton();
        await expect(supportOtherState.getThankYouMessage()).toBe('Thank you!');
    });
})