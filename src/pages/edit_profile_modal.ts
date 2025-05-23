import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";

export class EditProfileModal {
  private readonly page: Page;
  private readonly saveChangesButton: Locator;
  private readonly nameInput: Locator;
  private readonly surnameInput: Locator;
  private readonly emailInput: Locator;
  private readonly ageInput: Locator;
  private readonly telephoneInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveChangesButton = page.locator(
      `[data-testid='save-changes-button']`
    );
    this.nameInput = page.locator(`[data-testid='chage-name-input']`);
    this.surnameInput = page.locator(`[data-testid='chage-surname-input']`);
    this.emailInput = page.locator(`[data-testid='chage-email-input']`);
    this.ageInput = page.locator(`[data-testid='chage-age-input']`);
    this.telephoneInput = page.locator(`[data-testid='chage-phone-input']`);
  }
  async clickSaveChanges(): Promise<DashboardPage> {
    await this.saveChangesButton.click();
    return new DashboardPage(this.page);
  }

  async fillFirstName(firstName: string): Promise<EditProfileModal> {
    await this.nameInput.fill(firstName);
    return this;
  }

  async fillSurname(surname: string): Promise<EditProfileModal> {
    await this.surnameInput.fill(surname);
    return this;
  }

  async fillEmail(email: string): Promise<EditProfileModal> {
    await this.emailInput.fill(email);
    return this;
  }

  async fillTelephone(telephone: string): Promise<EditProfileModal> {
    await this.telephoneInput.fill(telephone);
    return this;
  }

  async fillAge(age: number): Promise<EditProfileModal> {
    await this.ageInput.fill(age.toString());
    return this;
  }
}
