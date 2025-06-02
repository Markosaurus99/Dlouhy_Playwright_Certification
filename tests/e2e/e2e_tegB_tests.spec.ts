import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../src/api/user_api.ts";
import { LoginPage } from "../../src/pages/login_page.ts";

test.describe("E2E TegB Banking App Tests", { tag: "@e2e" }, () => {
  test("E2E Register, Login, Create Account And Info Check Test", async ({
    page,
    request,
  }) => {
    const loginPage = new LoginPage(page);
    const accountBalance = 10000;
    const formattedBalance = `${accountBalance.toFixed(2)} Kč`;
    const accountType = "CZK";
    const username = faker.internet.username();
    const password = faker.internet.password();
    const email = faker.internet.exampleEmail();
    const firstName = faker.person.firstName();
    const surname = faker.person.lastName();
    const telephone = faker.phone.number();
    const age = faker.number.int({ min: 15, max: 100 });
    let accountNumber: string;

    await test.step("Register User", async () => {
      await loginPage
        .openTegBankingApp()
        .then((login) => login.clickRegister())
        .then((register) => register.fillUsername(username))
        .then((register) => register.fillPassword(password))
        .then((register) => register.fillEmail(email))
        .then((register) => register.clickSubmit())
        .then((login) => login.successMessageIsVisible());
    });

    await test.step("Create Banking Account API", async () => {
      const userApi = new UserApi(request);
      const accessToken = await userApi.loginAndgetAccessToken(
        username,
        password
      );
      const response = await userApi.createAccount(
        accessToken,
        accountBalance,
        accountType
      );
      const body = await response.json();
      accountNumber = body.accountNumber;
      expect(accountNumber).toBeDefined();
    });

    await test.step("Login User, Update Profile and Check Info Then Logout", async () => {
      await loginPage
        .fillUsername(username)
        .then((login) => login.fillPassword(password))
        .then((login) => login.clickLogin())
        .then((dashboard) => dashboard.clickEditProfile())
        .then((edit) => edit.waitUntilVisible())
        .then((edit) => edit.fillFirstName(firstName))
        .then((edit) => edit.fillSurname(surname))
        .then((edit) => edit.fillEmail(email))
        .then((edit) => edit.fillTelephone(telephone))
        .then((edit) => edit.fillAge(age))
        .then((edit) => edit.clickSaveChanges())
        .then((dashboard) => dashboard.updatedProfileMessageIsVisible())
        .then((dashboard) => dashboard.firstNameProfileHasText(firstName))
        .then((dashboard) => dashboard.surnameProfileHasText(surname))
        .then((dashboard) => dashboard.emailProfileHasText(email))
        .then((dashboard) => dashboard.telephoneProfileHasText(telephone))
        .then((dashboard) => dashboard.ageProfileHasText(age))
        .then((dashboard) => dashboard.accountNumberIsVisible())
        .then((dashboard) => dashboard.accountNumberHasText(accountNumber))
        .then((dashboard) => dashboard.accountBalanceIsVisible())
        .then((dashboard) => dashboard.accountBalanceHasText(formattedBalance))
        .then((dashboard) => dashboard.accountTypeIsVisible())
        .then((dashboard) => dashboard.accountTypeHasText(accountType))
        .then((dashboard) => dashboard.header.clickLogout());
    });
  });
});
