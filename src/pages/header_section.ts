import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class HeaderSection {
  private readonly page: Page;
  readonly logoutButton: Locator;
  readonly headerTitle: Locator;
  readonly tegLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator(`.logout-link`);
    this.headerTitle = page.locator(`.app-title`);
    this.tegLogo = page.locator(`[data-testid='logo-img']`);
  }

  async clickLogout(): Promise<LoginPage> {
    this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
