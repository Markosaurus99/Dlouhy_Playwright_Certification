import { expect, Locator, Page } from "@playwright/test";
import { RegisterPage } from "./register_page.ts";
import { DashboardPage } from "./dashboard_page.ts";

export class LoginPage {
  private readonly page: Page;
  private readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly registerButton: Locator;
  private readonly successRegisterMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("[data-testid='username-input']");
    this.passwordInput = page.locator(`[data-testid='password-input']`);
    this.loginButton = page.locator(`[data-testid='submit-button']`);
    this.registerButton = page.locator(`[data-testid='register-button']`);
    this.successRegisterMessage = page.locator(
      `[data-testid='success-message']`
    );
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

  async clickRegister(): Promise<RegisterPage> {
    await this.registerButton.click();
    return new RegisterPage(this.page);
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async successMessageIsVisible(): Promise<LoginPage> {
    await expect(this.successRegisterMessage).toBeVisible();
    return this;
  }
}
