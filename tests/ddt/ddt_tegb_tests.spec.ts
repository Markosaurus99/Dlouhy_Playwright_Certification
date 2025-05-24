import test from "@playwright/test";
import newAccountBalance from "../../src/assets/ddt/account_balance.json";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../src/api/user_api.ts";
import { LoginPage } from "../../src/pages/login_page.ts";

test.describe("DDT TegB Tests", () => {
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

  newAccountBalance.forEach((startBalance: number) =>
    test(`DDT Create Account With ${startBalance} Balance Test`, async ({
      page,
    }) => {
      await userApi.createAccount(accessToken, startBalance, "test");
      const loginPage = new LoginPage(page);
      await loginPage
        .openTegBankingApp()
        .then((login) => login.fillUsername(username))
        .then((login) => login.fillPassword(password))
        .then((login) => login.clickLogin())
        .then((dashboard) => dashboard.accountBalanceHasText(startBalance));
    })
  );
});
