import { Locator, Page } from "@playwright/test";

export class MenuSection {
  private readonly page: Page;
  readonly homeButton: Locator;
  readonly accountsButton: Locator;
  readonly transactionButton: Locator;
  readonly supportButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.locator(
      `//aside[@class="dashboard-sidebar"]//li[.='Domů']`
    );
    this.accountsButton = page.locator(
      `//aside[@class="dashboard-sidebar"]//li[.='Účty']`
    );
    this.transactionButton = page.locator(
      `//aside[@class="dashboard-sidebar"]//li[.='Transakce']`
    );
    this.supportButton = page.locator(
      `//aside[@class="dashboard-sidebar"]//li[.='Podpora']`
    );
  }
}
