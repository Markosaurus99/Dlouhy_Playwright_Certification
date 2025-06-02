import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { registerSetupAccountWithProfile } from "../../src/utils/auth_helper.ts";
import { LoginPage } from "../../src/pages/login_page.ts";
import { HeaderSection } from "../../src/pages/header_section.ts";
import { MenuSection } from "../../src/pages/menu_section.ts";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";
import { EditProfileModal } from "../../src/pages/edit_profile_modal.ts";

test.describe("Atomic Tests TegB Banking App", { tag: "@atomic" }, () => {
  let name: string;
  let surname: string;
  let phone: string;
  let age: number;
  let email: string;
  let startBalance: number;
  let type: string;
  let accountNumber: number;

  test.beforeEach(async ({ page, request }) => {
    const username = faker.internet.username();
    const password = faker.internet.password();
    email = faker.internet.exampleEmail();
    startBalance = 1000;
    type = "Test";
    name = faker.person.firstName();
    surname = faker.person.lastName();
    phone = faker.phone.number();
    age = faker.number.int({ min: 15, max: 100 });

    accountNumber = await registerSetupAccountWithProfile(
      page,
      request,
      username,
      password,
      email,
      startBalance,
      type,
      name,
      surname,
      age,
      phone
    );

    const loginPage = new LoginPage(page);
    const tokenObj: { accessToken?: string } = {};
    await loginPage
      .openTegBankingApp()
      .then((login) => login.loginAndGetToken(username, password, tokenObj));
  });

  test("Dashboard tests", async ({ page }) => {
    const headerSection = new HeaderSection(page);
    const loginPage = new LoginPage(page);
    const editProfileModal = new EditProfileModal(page);
    const dashboardPage = new DashboardPage(page);
    const menuSection = new MenuSection(page);

    await test.step("Dashboard Content Tests", async () => {
      await expect
        .soft(
          dashboardPage.profileDetailTitle,
          "Profile Detail Title Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.profileDetailTitle,
          "Profile Detail Title Has Text Test"
        )
        .toHaveText(`Detaily Profilu`);

      await expect
        .soft(
          dashboardPage.firstNameProfileInfo,
          "Profile First Name Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.firstNameProfileLabel,
          "Profile First Name Label Has Text Test"
        )
        .toHaveText(`Jméno:`);

      await expect
        .soft(
          dashboardPage.firstNameProfileInfo,
          "Profile First Name Has Value Test"
        )
        .toContainText(name);

      await expect
        .soft(
          dashboardPage.surnameProfileInfo,
          "Profile Surname Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.surnameProfileLabel,
          "Profile Surname Label Has Text Test"
        )
        .toHaveText(`Příjmení:`);

      await expect
        .soft(
          dashboardPage.surnameProfileInfo,
          "Profile Surname Has Value Test"
        )
        .toContainText(surname);

      await expect
        .soft(dashboardPage.emailProfileInfo, "Profile Email Visibility Test")
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.emailProfileLabel,
          "Profile Email Label Has Text Test"
        )
        .toHaveText(`Email:`);

      await expect
        .soft(dashboardPage.emailProfileInfo, "Profile Email Has Value Test")
        .toContainText(email);

      await expect
        .soft(
          dashboardPage.telephoneProfileInfo,
          "Profile Telephone Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.telephoneProfileLabel,
          "Profile Telephone Label Has Text Test"
        )
        .toHaveText(`Telefon:`);

      await expect
        .soft(
          dashboardPage.telephoneProfileInfo,
          "Profile Telephone Has Value Test"
        )
        .toContainText(phone);

      await expect
        .soft(dashboardPage.ageProfileInfo, "Profile Age Visibility Test")
        .toBeVisible();

      await expect
        .soft(dashboardPage.ageProfileLabel, "Profile Age Label Has Text Test")
        .toHaveText(`Věk:`);

      await expect
        .soft(dashboardPage.ageProfileInfo, "Profile Age Has Value Test")
        .toContainText(age.toString());

      await expect
        .soft(dashboardPage.accountsTitle, "Accounts Title Visibility Test")
        .toBeVisible();

      await expect
        .soft(dashboardPage.accountsTitle, "Accounts Title Has Text Test")
        .toHaveText(`Účty`);

      await expect
        .soft(
          dashboardPage.accountNumberHeading,
          "Account Number Heading Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.accountNumberHeading,
          "Account Number Heading Has Text Test"
        )
        .toHaveText(`Číslo účtu	`);

      await expect
        .soft(
          dashboardPage.accountBalanceHeading,
          "Account Balance Heading Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.accountBalanceHeading,
          "Account Balance Heading Has Text Test"
        )
        .toHaveText(`Zůstatek	`);

      await expect
        .soft(
          dashboardPage.accountTypeHeading,
          "Account Type Heading Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.accountTypeHeading,
          "Account Type Heading Has Text Test"
        )
        .toHaveText(`Typ účtu`);

      await expect
        .soft(dashboardPage.accountNumber, "Account Number Visibility Test")
        .toBeVisible();

      await expect
        .soft(dashboardPage.accountNumber, "Account Number Has Value Test")
        .toHaveText(accountNumber.toString());

      await expect
        .soft(dashboardPage.accountBalance, "Account Balance Visibility Test")
        .toBeVisible();

      await expect
        .soft(dashboardPage.accountBalance, "Account Balance Has Value Test")
        .toHaveText(`${startBalance.toFixed(2)} Kč`);

      await expect
        .soft(dashboardPage.accountType, "Account Type Visibility Check")
        .toBeVisible();

      await expect
        .soft(dashboardPage.accountType, "Account Type Has Text Test")
        .toHaveText(type);

      await expect
        .soft(
          dashboardPage.dashboardFooter,
          "Dashboard Footer Visibility Check"
        )
        .toBeVisible();

      await expect
        .soft(dashboardPage.dashboardFooter, "Dashboard Footer Has Text Test")
        .toHaveText(`© 2023 Banking App`);

      await expect
        .soft(
          dashboardPage.addAccountButton,
          "Add Acount Button Visibility Check"
        )
        .toBeVisible();

      await expect
        .soft(
          dashboardPage.addAccountButton,
          "Add Account Button Has Text Test"
        )
        .toHaveText(`Přidat účet`);

      // Až by bylo tlačítko unkční, tak bych přidal kontrolu na funkčnost/proklik a jestli směřuje button správně

      await expect
        .soft(
          dashboardPage.editProfileButton,
          "Edit Profile Button Visibility Check"
        )
        .toBeVisible();

      await expect
        .soft(dashboardPage.editProfileButton, "Edit Profile Button Has Text")
        .toHaveText(`Upravit profil`);

      await dashboardPage.clickEditProfile();

      await expect
        .soft(
          editProfileModal.cancelChangesButton,
          "Edit Profile Button Function Test"
        )
        .toBeVisible();
      await editProfileModal.cancelChangesButton.click();
    });

    await test.step("Menu Section Tests", async () => {
      await expect
        .soft(menuSection.homeButton, "Home Button Visibility Test")
        .toBeVisible();

      await expect
        .soft(menuSection.homeButton, "Home Button Has Text Test")
        .toHaveText(`Domů`);

      await expect
        .soft(menuSection.accountsButton, "Accounts Button Visibility Test")
        .toBeVisible();

      await expect
        .soft(menuSection.accountsButton, "Accounts Button Has Text Test")
        .toHaveText(`Účty`);

      await expect
        .soft(
          menuSection.transactionButton,
          "Transactions Button Visibility Test"
        )
        .toBeVisible();

      await expect
        .soft(
          menuSection.transactionButton,
          "Transactions Button Has Text Test"
        )
        .toHaveText(`Transakce`);

      await expect
        .soft(menuSection.supportButton, "Support Button Visibility Test")
        .toBeVisible();

      await expect
        .soft(menuSection.supportButton, "Support Button Has Text Test")
        .toHaveText(`Podpora`);
    });

    await test.step("Header Section Tests", async () => {
      await expect
        .soft(headerSection.tegLogo, "TeGB Logo Visibility Test")
        .toBeVisible();
      await expect
        .soft(headerSection.headerTitle, "Dashboard Title Visibility Test")
        .toBeVisible();
      await expect
        .soft(headerSection.headerTitle, "Dashboard Title Has Text Test")
        .toHaveText(`TEG#B Dashboard`);
      await expect
        .soft(headerSection.logoutButton, "Logout Button Visibility Test")
        .toBeVisible();
      await expect
        .soft(headerSection.logoutButton, "Logout Button Has Text Test")
        .toHaveText(`Odhlásit se`);
      await headerSection.clickLogout();
      await expect
        .soft(loginPage.loginForm, "Logout Button Click Test")
        .toBeVisible();
    });
  });
});
