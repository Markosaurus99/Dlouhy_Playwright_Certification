import { test } from "@playwright/test";
import { UserApi } from "../../src/api/user_api.ts";
import { faker } from "@faker-js/faker";

test.describe("TegB Banking App Api Tests", () => {
  let username: string;
  let password: string;
  let email: string;

  test.beforeEach(async ({ request }) => {
    username = faker.internet.username();
    password = faker.internet.password();
    email = faker.internet.exampleEmail();
    const userApi = new UserApi(request);
    await userApi.registerUser(username, password, email);
  });

  test("Login User Test", async ({ request }) => {
    const userApi = new UserApi(request);
    await userApi.successLoginUser(username, password);
  });
});
