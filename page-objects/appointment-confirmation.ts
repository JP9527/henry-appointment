import { test, expect, Locator, Page } from '@playwright/test';

export class AppointmentConfirmation {
    readonly page: Page;
    readonly pendingAppointmentTime: Locator;
    //add more locators while working on text validation

    constructor(page: Page) {
        this.page = page;
        this.pendingAppointmentTime = page.getByTestId('pending-appointment-time');
    }
}