import { test, expect, Locator, Page } from '@playwright/test';

export class ContactDetails {
    readonly page: Page;
    readonly appointmentOverviewContinue: Locator;
    readonly image: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly emailVerify: Locator;
    readonly dateOfBirth: Locator;
    readonly phone: Locator;
    readonly sex: Locator;
    readonly prefGenderPronouns: Locator;
    readonly termsAndConditions: Locator;
    readonly marketing: Locator;
    readonly continue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appointmentOverviewContinue = page.getByTestId('appointmentOverviewContinue');
        this.image = page.getByAltText('Obi-wan Kenobi, PA');
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.email = page.getByTestId('email');
        this.emailVerify = page.getByTestId('verifyEmail');
        this.dateOfBirth = page.getByTestId('dob');
        this.phone = page.getByTestId('phoneNumber');
        this.sex = page.getByTestId('sex');
        this.prefGenderPronouns = page.getByTestId('preferredPronouns');        
        this.termsAndConditions = page.getByTestId('tosConsent');
        this.marketing = page.getByTestId('marketingConsent');
        this.continue = page.getByTestId('contactDetailsContinue');
    }

    async clickAppointmentOverviewContinue() {
        await this.appointmentOverviewContinue.click();
    }

    async fillForm(firstName: string, lastName: string, email: string, emailVerify: string, dateOfBirth: string, phone: string, sex: string, prefGenderPronouns: string, termsAndConditions: boolean, marketing: boolean) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.emailVerify.fill(emailVerify);
        await this.dateOfBirth.fill(dateOfBirth);
        await this.phone.fill(phone);
        await this.sex.selectOption(sex);
        await this.prefGenderPronouns.selectOption(prefGenderPronouns);
        if (termsAndConditions) {
            await this.termsAndConditions.check();
        }
        if (marketing) {
            await this.marketing.check();
        }
    }

    async submitForm() {
        await this.continue.click();
    }
}