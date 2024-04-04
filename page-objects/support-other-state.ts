import { test, expect, Locator, Page } from '@playwright/test';

export class SupportOtherState {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly phone: Locator;
    readonly email: Locator;
    readonly okButton: Locator;
    readonly stateDropdown: Locator;
    readonly alabamaOption: Locator;
    readonly submitButton: Locator;
    readonly thankYouMessage: Locator;
   
    constructor(page: Page) {
        this.page = page;
        //this.FIRST_NAME_INPUT = page.getByPlaceholder('Jane');
        this.firstName = page.locator('[name="given-name"]');
        this.lastName = page.locator('[name="family-name"]');
        this.phone = page.locator('[name="tel"]');
        this.email = page.locator('[name="email"]');
        this.okButton = page.getByRole('button', { name: 'OK' });
        this.stateDropdown = page.getByPlaceholder('Type or select an option');
        this.alabamaOption = page.locator('div').filter({ hasText: /^Alabama$/ });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.thankYouMessage = page.getByRole('heading');
    }

    async fillForm(firstName: string, lastName: string, phone: string, email: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPhone(phone);
        await this.enterEmail(email);
    }

    async enterFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async enterPhone(phone: string) {
        await this.phone.fill(phone);
    }

    async enterEmail(email: string) {
        await this.email.fill(email);
    }

    async clickOkButton() {
        await this.okButton.click();
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async selectState(state: string) {  
        await this.stateDropdown.click();
        await this.alabamaOption.click();
    }

    async getThankYouMessage() {
        return await this.thankYouMessage.innerText();
    }
}