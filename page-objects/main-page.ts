import { test, expect, Locator, Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly url = 'https://onboard-dev.henrymeds.com?kameleoon_override';
    readonly companyLogo: Locator;
    readonly headerText: Locator;
    readonly alabamaButton: Locator;
    readonly californiaButton: Locator;
    readonly coloradoButton: Locator;
    readonly floridaButton: Locator;
    readonly georgiaButton: Locator;
    readonly illinoisButton: Locator;
    readonly marylandButton: Locator;
    readonly massachusettsButton: Locator;
    readonly newhampshireButton: Locator;
    readonly texasButton: Locator;
    readonly utahButton: Locator;
    readonly virginiaButton: Locator;
    readonly washingtonButton: Locator;
    readonly otherstateButton: Locator;
    readonly footerText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.companyLogo = page.getByRole('img', { name: 'Henry Logo' });
        this.headerText = page.locator('text=Welcome to Henry????');
        this.alabamaButton = page.getByTestId('alabama');
        this.californiaButton = page.getByTestId('california');
        this.coloradoButton = page.getByTestId('colorado');
        this.floridaButton = page.getByTestId('florida');
        this.georgiaButton = page.getByTestId('georgia');
        this.illinoisButton = page.getByTestId('illinois');
        this.marylandButton = page.getByTestId('maryland');
        this.massachusettsButton = page.getByTestId('massachusetts');
        this.newhampshireButton = page.getByTestId('newhampshire');
        this.texasButton = page.getByTestId('texas');
        this.utahButton = page.getByTestId('utah');
        this.virginiaButton = page.getByTestId('virginia');
        this.washingtonButton = page.getByTestId('washington');
        this.otherstateButton = page.getByTestId('otherstate');
        this.footerText = page.locator('text=© 2022 Henry Inc. All rights reserved.????');
    }

    async clickOnStateButton(state: string) {
        switch (state) {
            case 'Alabama':
                await this.alabamaButton.click();
                break;
            case 'California':
                await this.californiaButton.click();
                break;
            case 'Colorado':
                await this.coloradoButton.click();
                break;
            case 'Florida':
                await this.floridaButton.click();
                break;
            case 'Georgia':
                await this.georgiaButton.click();
                break;
            case 'Illinois':
                await this.illinoisButton.click();
                break;
            case 'Maryland':
                await this.marylandButton.click();
                break;
            case 'Massachusetts':
                await this.massachusettsButton.click();
                break;
            case 'New Hampshire':
                await this.newhampshireButton.click();
                break;
            case 'Texas':
                await this.texasButton.click();
                break;
            case 'Utah':
                await this.utahButton.click();
                break;
            case 'Virginia':
                await this.virginiaButton.click();
                break;
            case 'Washington':
                await this.washingtonButton.click();
                break;
            case 'Other State':
                await this.otherstateButton.click();
                break;
            default:
                throw new Error('Invalid state');
        }
    }
}