import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class RegisterPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly emailInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(`[data-testid='username-input']`);
    this.passwordInput = page.locator(`[data-testid='password-input']`);
    this.emailInput = page.locator(`[data-testid='email-input']`);
    this.submitButton = page.locator(`[data-testid='submit-button']`);
  }

  async fillUsername(username: string): Promise<RegisterPage> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<RegisterPage> {
    await this.passwordInput.fill(password);
    return this;
  }

  async fillEmail(email: string): Promise<RegisterPage> {
    await this.emailInput.fill(email);
    return this;
  }

  async clickSubmit(): Promise<LoginPage> {
    await this.submitButton.click();
    return new LoginPage(this.page);
  }
}
