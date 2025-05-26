import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AuthHelper } from "../../src/utils/auth_helper.ts";
import { LoginPage } from "../../src/pages/login_page.ts";
import { HeaderSection } from "../../src/pages/header_section.ts";
import { MenuSection } from "../../src/pages/menu_section.ts";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";
import { EditProfileModal } from "../../src/pages/edit_profile_modal.ts";

test.describe.serial("Atomic Tests Dashboard TegB Banking App", () => {
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

    accountNumber = await AuthHelper.registerSetupAccountWithProfile(
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
    await loginPage
      .openTegBankingApp()
      .then((login) => login.loginAndGetToken(username, password));
  });

  test("Header Section Tests", async ({ page }) => {
    const headerSection = new HeaderSection(page);

    await test.step("TeGB Logo Visibility Test", async () => {
      await expect.soft(headerSection.tegLogo).toBeVisible();
    });

    await test.step("Dashboard Title Visibility Test", async () => {
      await expect.soft(headerSection.headerTitle).toBeVisible();
    });

    await test.step("Dashboard Title Has Text Test", async () => {
      await expect.soft(headerSection.headerTitle).toHaveText(`TEG#B Dashboard
`);
    });

    await test.step("Logout Button Visibility Test", async () => {
      await expect.soft(headerSection.logoutButton).toBeVisible();
    });

    await test.step("Logout Button Has Text Test", async () => {
      await expect.soft(headerSection.logoutButton).toHaveText(`Odhlásit se`);
    });

    await test.step("Logout Button Click Test", async () => {
      const loginPage = new LoginPage(page);
      await headerSection.clickLogout();
      await expect.soft(loginPage.loginForm).toBeVisible();
    });
  });

  test("Menu Section Tests", async ({ page }) => {
    const menuSection = new MenuSection(page);

    await test.step("Home Button Visibility Test", async () => {
      await expect.soft(menuSection.homeButton).toBeVisible();
    });
    await test.step("Home Button Has Text Test", async () => {
      await expect.soft(menuSection.homeButton).toHaveText(`Domů`);
    });
    await test.step("Accounts Button Visibility Test", async () => {
      await expect.soft(menuSection.accountsButton).toBeVisible();
    });
    await test.step("Accounts Button Has Text Test", async () => {
      await expect.soft(menuSection.accountsButton).toHaveText(`Účty`);
    });
    await test.step("Transactions Button Visibility Test", async () => {
      await expect.soft(menuSection.transactionButton).toBeVisible();
    });
    await test.step("Transactions Button Has Text Test", async () => {
      await expect.soft(menuSection.transactionButton).toHaveText(`Transakce`);
    });
    await test.step("Support Button Visibility Test", async () => {
      await expect.soft(menuSection.supportButton).toBeVisible();
    });
    await test.step("Support Button Has Text Test", async () => {
      await expect.soft(menuSection.supportButton).toHaveText(`Podpora`);
    });
  });

  test("Dashboard Content Tests", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await test.step("Profile Detail Title Visibility Test", async () => {
      await expect.soft(dashboardPage.profileDetailTitle).toBeVisible();
    });

    await test.step("Profile Detail Title Has Text Test", async () => {
      await expect
        .soft(dashboardPage.profileDetailTitle)
        .toHaveText(`Detaily Profilu`);
    });

    await test.step("Profile First Name Visibility Test", async () => {
      await expect.soft(dashboardPage.firstNameProfileInfo).toBeVisible();
    });

    await test.step("Profile First Name Label Has Text Test", async () => {
      await expect
        .soft(dashboardPage.firstNameProfileLabel)
        .toHaveText(`Jméno:`);
    });

    await test.step("Profile First Name Has Value Test", async () => {
      await expect.soft(dashboardPage.firstNameProfileInfo).toContainText(name);
    });

    await test.step("Profile Surname Visibility Test", async () => {
      await expect.soft(dashboardPage.surnameProfileInfo).toBeVisible();
    });

    await test.step("Profile Surname Label Has Text Test", async () => {
      await expect
        .soft(dashboardPage.surnameProfileLabel)
        .toHaveText(`Příjmení:`);
    });

    await test.step("Profile Surname Has Value Test", async () => {
      await expect
        .soft(dashboardPage.surnameProfileInfo)
        .toContainText(surname);
    });

    await test.step("Profile Email Visibility Test", async () => {
      await expect.soft(dashboardPage.emailProfileInfo).toBeVisible();
    });

    await test.step("Profile Email Label Has Text Test", async () => {
      await expect.soft(dashboardPage.emailProfileLabel).toHaveText(`Email:`);
    });

    await test.step("Profile Email Has Value Test", async () => {
      await expect.soft(dashboardPage.emailProfileInfo).toContainText(email);
    });

    await test.step("Profile Telephone Visibility Test", async () => {
      await expect.soft(dashboardPage.telephoneProfileInfo).toBeVisible();
    });

    await test.step("Profile Telephone Label Has Text Test", async () => {
      await expect
        .soft(dashboardPage.telephoneProfileLabel)
        .toHaveText(`Telefon:`);
    });

    await test.step("Profile Telephone Has Value Test", async () => {
      await expect
        .soft(dashboardPage.telephoneProfileInfo)
        .toContainText(phone);
    });

    await test.step("Profile Age Visibility Test", async () => {
      await expect.soft(dashboardPage.ageProfileInfo).toBeVisible();
    });

    await test.step("Profile Age Label Has Text Test", async () => {
      await expect.soft(dashboardPage.ageProfileLabel).toHaveText(`Věk:`);
    });

    await test.step("Profile Age Has Value Test", async () => {
      await expect
        .soft(dashboardPage.ageProfileInfo)
        .toContainText(age.toString());
    });

    await test.step("Accounts Title Visibility Test", async () => {
      await expect.soft(dashboardPage.accountsTitle).toBeVisible();
    });

    await test.step("Accounts Title Has Text Test", async () => {
      await expect.soft(dashboardPage.accountsTitle).toHaveText(`Účty`);
    });

    await test.step("Account Number Heading Visibility Test", async () => {
      await expect.soft(dashboardPage.accountNumberHeading).toBeVisible();
    });

    await test.step("Account Number Heading Has Text Test", async () => {
      await expect
        .soft(dashboardPage.accountNumberHeading)
        .toHaveText(`Číslo účtu	`);
    });

    await test.step("Account Balance Heading Visibility Test", async () => {
      await expect.soft(dashboardPage.accountBalanceHeading).toBeVisible();
    });

    await test.step("Account Balance Heading Has Text Test", async () => {
      await expect
        .soft(dashboardPage.accountBalanceHeading)
        .toHaveText(`Zůstatek	`);
    });

    await test.step("Account Type Heading Visibility Test", async () => {
      await expect.soft(dashboardPage.accountTypeHeading).toBeVisible();
    });

    await test.step("Account Type Heading Has Text Test", async () => {
      await expect.soft(dashboardPage.accountTypeHeading).toHaveText(`Typ účtu
`);
    });

    await test.step("Account Number Visibility Test", async () => {
      await expect.soft(dashboardPage.accountNumber).toBeVisible();
    });

    await test.step("Account Number Has Value Test", async () => {
      await expect
        .soft(dashboardPage.accountNumber)
        .toHaveText(accountNumber.toString());
    });

    await test.step("Account Balance Visibility Test", async () => {
      await expect.soft(dashboardPage.accountBalance).toBeVisible();
    });

    await test.step("Account Balance Has Value Test", async () => {
      await expect
        .soft(dashboardPage.accountBalance)
        .toHaveText(`${startBalance.toFixed(2)} Kč`);
    });

    await test.step("Account Type Visibility Check", async () => {
      await expect.soft(dashboardPage.accountType).toBeVisible();
    });

    await test.step("Account Type Has Text Test", async () => {
      await expect.soft(dashboardPage.accountType).toHaveText(type);
    });

    await test.step("Dashboard Footer Visibility Check", async () => {
      await expect.soft(dashboardPage.dashboardFooter).toBeVisible();
    });

    await test.step("Dashboard Footer Has Text Test", async () => {
      await expect
        .soft(dashboardPage.dashboardFooter)
        .toHaveText(`© 2023 Banking App`);
    });

    await test.step("Add Acount Button Visibility Check", async () => {
      await expect.soft(dashboardPage.addAccountButton).toBeVisible();
    });

    await test.step("Add Account Button Has Text Test", async () => {
      await expect
        .soft(dashboardPage.addAccountButton)
        .toHaveText(`Přidat účet`);
    });

    // Až by bylo funkční, tak bych přidal kontrolu na funkčnost/proklik a jestli směřuje button správně

    await test.step("Edit Profile Button Visibility Check", async () => {
      await expect.soft(dashboardPage.editProfileButton).toBeVisible();
    });

    await test.step("Edit Profile Button Has Text", async () => {
      await expect
        .soft(dashboardPage.editProfileButton)
        .toHaveText(`Upravit profil`);
    });

    await test.step("Edit Profile Button Function Test", async () => {
      await dashboardPage.clickEditProfile();
      const editProfileModal = new EditProfileModal(page);
      await expect.soft(editProfileModal.cancelChangesButton).toBeVisible();
      await editProfileModal.cancelChangesButton.click();
    });
  });
});
