import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class MenuSection {
  private readonly page: Page;
  private readonly logoutButton: Locator;
  private readonly headerTitle: Locator;
  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator(`.logout-link`);
    this.headerTitle = page.locator(`.app-title`);
  }

  async clickLogout(): Promise<LoginPage> {
    this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async titleIsVisible(): Promise<MenuSection> {
    await expect(this.headerTitle).toBeVisible();
    return this;
  }
}
