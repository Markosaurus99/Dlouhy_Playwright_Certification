import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("[data-testid='username-input']");
    this.passwordInput = page.locator(`[data-testid='password-input']`);
    this.loginButton = page.locator(`[data-testid='submit-button']`);
  }

  async openTegBankingApp(): Promise<LoginPage> {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string): Promise<LoginPage> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<LoginPage> {
    await this.passwordInput.fill(password);
    return this;
  }
}
