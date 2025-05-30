import { expect, Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";

export class EditProfileModal {
  private readonly page: Page;
  readonly saveChangesButton: Locator;
  private readonly nameInput: Locator;
  private readonly surnameInput: Locator;
  private readonly emailInput: Locator;
  private readonly ageInput: Locator;
  private readonly telephoneInput: Locator;
  readonly cancelChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveChangesButton = page.locator(
      `[data-testid='save-changes-button']`
    );
    this.cancelChangesButton = page.locator(
      `[data-testid='toggle-edit-profile-button']`
    );
    this.nameInput = page.locator(`input[data-testid='chage-name-input']`);
    this.surnameInput = page.locator(
      `input[data-testid='chage-surname-input']`
    );
    this.emailInput = page.locator(`input[data-testid='chage-email-input']`);
    this.ageInput = page.locator(`input[data-testid='chage-age-input']`);
    this.telephoneInput = page.locator(
      `input[data-testid='chage-phone-input']`
    );
  }

  async waitUntilVisible(): Promise<EditProfileModal> {
    await expect(this.cancelChangesButton).toBeVisible();
    return this;
  }
  async clickSaveChanges(): Promise<DashboardPage> {
    const loginResponsePromise = this.page.waitForResponse(/\/tegb\/profile/);
    await this.saveChangesButton.click();
    const loginResponse = await loginResponsePromise;
    expect(loginResponse.status()).toBe(200);
    return new DashboardPage(this.page);
  }
  // s fill testy velmi často padaly (cca v 50 %), proto takovéto řešení
  async fillFirstName(firstName: string): Promise<EditProfileModal> {
    await this.nameInput.waitFor({ state: "visible" });
    await this.nameInput.click();
    await this.nameInput.fill("");
    await this.nameInput.pressSequentially(firstName, { delay: 100 });
    await expect(this.nameInput).toHaveValue(firstName, { timeout: 10000 });
    return this;
  }

  async fillSurname(surname: string): Promise<EditProfileModal> {
    await this.surnameInput.waitFor({ state: "visible" });
    await this.surnameInput.fill(surname);
    await expect(this.surnameInput).toHaveValue(surname, { timeout: 10000 });
    return this;
  }

  async fillEmail(email: string): Promise<EditProfileModal> {
    await this.emailInput.waitFor({ state: "visible" });
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email, { timeout: 5000 });
    return this;
  }

  async fillTelephone(telephone: string): Promise<EditProfileModal> {
    await this.telephoneInput.fill(telephone);
    await expect(this.telephoneInput).toHaveValue(telephone, { timeout: 5000 });
    return this;
  }

  async fillAge(age: number): Promise<EditProfileModal> {
    await this.ageInput.fill(age.toString());
    await expect(this.ageInput).toHaveValue(age.toString(), { timeout: 5000 });
    return this;
  }
}
