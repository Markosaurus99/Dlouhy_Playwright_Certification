import test from "@playwright/test";
import accountBalanceData from "../../src/assets/ddt/account_balance.json";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../src/api/user_api.ts";
import { LoginPage } from "../../src/pages/login_page.ts";

test.describe.serial("DDT TegB Tests", { tag: "@ddt"}, () => {
  let username: string;
  let password: string;
  let email: string;
  let accessToken: string;
  let userApi: UserApi;

  test.beforeEach(async ({ request }) => {
    username = faker.internet.username();
    password = faker.internet.password();
    email = faker.internet.exampleEmail();
    userApi = new UserApi(request);
    await userApi.registerUser(username, password, email);
    accessToken = await userApi.getAccessToken(username, password);
  });

  accountBalanceData.forEach((entry) => {
    const testName = `DDT Create Account With Balance ${entry.balance} `;

    if (!entry.disabled) {
      test(testName, async ({ page }) => {
        await userApi.createAccount(accessToken, entry.balance, "test");

        const formattedBalance = `${entry.balance.toFixed(2)} Kč`;

        const loginPage = new LoginPage(page);
        await loginPage
          .openTegBankingApp()
          .then((login) => login.fillUsername(username))
          .then((login) => login.fillPassword(password))
          .then((login) => login.clickLogin())
          .then((dashboard) =>
            dashboard.accountBalanceHasText(formattedBalance)
          );
      });
    } else {
      test.skip(`${testName} – SKIPPED: ${entry.disabledReason}`, () => {});
    }
  });
});
