import test from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";

test.describe("TegB Visual Tests", () => {
  test("Profile Info Visual Test", async ({ page }) => {
    const username = process.env.TEGB_BANKING_USERNAME as string;
    const password = process.env.TEGB_BANKING_PASSWORD as string;
    const loginPage = new LoginPage(page);
    await loginPage
      .openTegBankingApp()
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLogin())
      .then((dashboard) =>
        dashboard.profileSummaryVisualCheck(`profile_summary`)
      );
  });
});
