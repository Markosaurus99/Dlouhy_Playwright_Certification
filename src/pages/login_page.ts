import { expect, Locator, Page } from "@playwright/test";
import { RegistrationPage } from "./registration_page.ts";
import { DashboardPage } from "./dashboard_page.ts";

export class LoginPage {
  private readonly page: Page;
  private readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly registerButton: Locator;
  private readonly successRegisterMessage: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("[data-testid='username-input']");
    this.passwordInput = page.locator(`[data-testid='password-input']`);
    this.loginButton = page.locator(`[data-testid='submit-button']`);
    this.loginForm = page.locator(`.Form`);
    this.registerButton = page.locator(`[data-testid='register-button']`);
    this.successRegisterMessage = page.locator(
      `[data-testid='success-message']`
    );
  }

  async loginAndGetToken(
    username: string,
    password: string,
    tokenObj: { accessToken?: string }
  ): Promise<DashboardPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    const loginResponsePromise = this.page.waitForResponse(/\/tegb\/login/);
    await this.loginButton.click();
    const loginResponse = await loginResponsePromise;
    const responseBody = await loginResponse.json();
    tokenObj.accessToken = responseBody.access_token;
    await expect(tokenObj.accessToken).toBeDefined();
    return new DashboardPage(this.page);
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

  async clickRegister(): Promise<RegistrationPage> {
    await this.registerButton.click();
    return new RegistrationPage(this.page);
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
