import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { EditProfileModal } from "./edit_profile_modal.ts";

export class DashboardPage {
  private readonly page: Page;
  private readonly logoutButton: Locator;
  private readonly editProfileButton: Locator;
  private readonly firstNameProfileInfo: Locator;
  private readonly surnameProfileInfo: Locator;
  private readonly emailProfileInfo: Locator;
  private readonly telephoneProfileInfo: Locator;
  private readonly ageProfileInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator(`.logout-link`);
    this.editProfileButton = page.locator(
      `[data-testid='toggle-edit-profile-button']`
    );
    this.firstNameProfileInfo = page.locator(`[data-testid='name']`);
    this.surnameProfileInfo = page.locator(`[data-testid='surname']`);
    this.emailProfileInfo = page.locator(`[data-testid='email']`);
    this.telephoneProfileInfo = page.locator(`[data-testid='phone']`);
    this.ageProfileInfo = page.locator(`[data-testid='age']`);
  }

  async firstNameProfileHasText(firstName: string): Promise<DashboardPage> {
    await expect(this.firstNameProfileInfo).toContainText(firstName);
    return this;
  }

  async surnameProfileHasText(surname: string): Promise<DashboardPage> {
    await expect(this.surnameProfileInfo).toContainText(surname);
    return this;
  }

  async emailProfileHasText(email: string): Promise<DashboardPage> {
    await expect(this.emailProfileInfo).toContainText(email);
    return this;
  }

  async telephoneProfileHasText(telephone: string): Promise<DashboardPage> {
    await expect(this.telephoneProfileInfo).toContainText(telephone);
    return this;
  }

  async ageProfileHasText(age: number): Promise<DashboardPage> {
    await expect(this.ageProfileInfo).toContainText(age.toString());
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async clickEditProfile(): Promise<EditProfileModal> {
    await this.editProfileButton.click();
    return new EditProfileModal(this.page);
  }
}
