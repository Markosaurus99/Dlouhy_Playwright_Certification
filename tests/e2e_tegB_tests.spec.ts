import test from "@playwright/test";
import { LoginPage } from "../src/pages/login_page.ts";
import { faker } from "@faker-js/faker";

test("E2E TegB Banking App Test", async ({ page }) => {
  const username = faker.internet.username();
  const password = faker.internet.password();
  const email = faker.internet.exampleEmail();
  const firstName = faker.person.firstName();
  const surname = faker.person.lastName();
  const telephone = faker.phone.number();
  const age = faker.number.int({ min: 15, max: 100 });

  const loginPage = new LoginPage(page);
  await loginPage
    .openTegBankingApp()
    .then((login) => login.clickRegister())
    .then((register) => register.fillUsername(username))
    .then((register) => register.fillPassword(password))
    .then((register) => register.fillEmail(email))
    .then((register) => register.clickSubmit())
    .then((login) => login.successMessageIsVisible())
    .then((login) => login.fillUsername(username))
    .then((login) => login.fillPassword(password))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickEditProfile())
    .then((edit) => edit.fillFirstName(firstName))
    .then((edit) => edit.fillSurname(surname))
    .then((edit) => edit.fillEmail(email))
    .then((edit) => edit.fillTelephone(telephone))
    .then((edit) => edit.fillAge(age))
    .then((edit) => edit.clickSaveChanges())
    .then((dashboard) => dashboard.firstNameProfileHasText(firstName))
    .then((dashboard) => dashboard.surnameProfileHasText(surname))
    .then((dashboard) => dashboard.emailProfileHasText(email))
    .then((dashboard) => dashboard.telephoneProfileHasText(telephone))
    .then((dashboard) => dashboard.ageProfileHasText(age));
});
