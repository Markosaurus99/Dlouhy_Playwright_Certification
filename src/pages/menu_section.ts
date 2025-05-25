import { Locator, Page } from "@playwright/test";

export class MenuSection {
  private readonly page: Page;
  readonly homeButton: Locator;
  readonly accountsButton: Locator;
  readonly transactionButton: Locator;
  readonly supportButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.locator(``);
    this.accountsButton = page.locator(``);
    this.transactionButton = page.locator(``);
    this.supportButton = page.locator(``);
  }
}
