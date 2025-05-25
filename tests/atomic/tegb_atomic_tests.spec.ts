import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AuthHelper } from "../../src/utils/auth_helper.ts";
import { LoginPage } from "../../src/pages/login_page.ts";
import { HeaderSection } from "../../src/pages/header_section.ts";
import { MenuSection } from "../../src/pages/menu_section.ts";

test.describe("Atomic Tests Dashboard TegB Banking App", () => {
  test.beforeEach(async ({ page, request }) => {
    const username = faker.internet.username();
    const password = faker.internet.password();
    const email = faker.internet.exampleEmail();
    const startBalance = 1000;
    const type = "Test";
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const phone = faker.phone.number();
    const age = faker.number.int({ min: 15, max: 100 });

    await AuthHelper.registerSetupAccountWithProfile(
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

  /* test("Dashboard Content Tests", async ({ page }) => {}); */
});
