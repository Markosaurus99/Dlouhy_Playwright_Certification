import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { EditProfileModal } from "./edit_profile_modal.ts";

export class DashboardPage {
  private readonly page: Page;
  readonly logoutButton: Locator;
  readonly editProfileButton: Locator;
  readonly firstNameProfileInfo: Locator;
  readonly surnameProfileInfo: Locator;
  readonly emailProfileInfo: Locator;
  readonly telephoneProfileInfo: Locator;
  readonly ageProfileInfo: Locator;
  readonly accountNumber: Locator;
  readonly accountBalance: Locator;
  readonly accountType: Locator;
  readonly profileDetailTitle: Locator;
  readonly accountsTitle: Locator;
  readonly accountNumberHeading: Locator;
  readonly accountBalanceHeading: Locator;
  readonly accountTypeHeading: Locator;
  readonly dashboardFooter: Locator;
  readonly firstNameProfileLabel: Locator;
  readonly surnameProfileLabel: Locator;
  readonly emailProfileLabel: Locator;
  readonly telephoneProfileLabel: Locator;
  readonly ageProfileLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameProfileLabel = page.locator(`[data-testid='name'] strong`);
    this.surnameProfileLabel = page.locator(`[data-testid='surname'] strong`);
    this.emailProfileLabel = page.locator(`[data-testid='email'] strong`);
    this.telephoneProfileLabel = page.locator(`[data-testid='phone'] strong`);
    this.ageProfileLabel = page.locator(`div[data-testid='phone'] strong`);
    this.accountNumberHeading = page.locator(
      `[data-testid='account-number-heading']`
    );
    this.accountBalanceHeading = page.locator(
      `[data-testid='account-balance-heading']`
    );
    this.accountTypeHeading = page.locator(
      `[data-testid='account-type-heading']`
    );
    this.dashboardFooter = page.locator(`.dashboard-footer`);
    this.profileDetailTitle = page.locator(
      `[data-testid='profile-details-title']`
    );
    this.accountsTitle = page.locator(`[data-testid='accounts-title']`);
    this.logoutButton = page.locator(`.logout-link`);
    this.editProfileButton = page.locator(
      `[data-testid='toggle-edit-profile-button']`
    );
    this.firstNameProfileInfo = page.locator(`[data-testid='name']`);
    this.surnameProfileInfo = page.locator(`[data-testid='surname']`);
    this.emailProfileInfo = page.locator(`[data-testid='email']`);
    this.telephoneProfileInfo = page.locator(`[data-testid='phone']`);
    this.ageProfileInfo = page.locator(`[data-testid='age']`);
    this.accountNumber = page.locator(`[data-testid='account-number']`);
    this.accountBalance = page.locator(`[data-testid='account-balance']`);
    this.accountType = page.locator(`[data-testid='account-type']`);
  }

  async accountTypeHasText(accountType: string): Promise<DashboardPage> {
    await expect(this.accountType).toContainText(accountType);
    return this;
  }

  async accountTypeIsVisible(): Promise<DashboardPage> {
    await expect(this.accountType).toBeVisible();
    return this;
  }

  async accountBalanceIsVisible(): Promise<DashboardPage> {
    await expect(this.accountBalance).toBeVisible();
    return this;
  }

  async accountBalanceHasText(accountBalance: number): Promise<DashboardPage> {
    await expect(this.accountBalance).toContainText(accountBalance.toString());
    return this;
  }

  async accountNumberIsVisible(): Promise<DashboardPage> {
    await expect(this.accountNumber).toBeVisible();
    return this;
  }

  async accountNumberHasText(accountNumber: string): Promise<DashboardPage> {
    await expect(this.accountNumber).toContainText(accountNumber);
    return this;
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
