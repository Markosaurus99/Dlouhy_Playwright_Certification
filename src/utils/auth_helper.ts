import { Page, APIRequestContext } from "@playwright/test";
import { UserApi } from "../api/user_api.ts";

/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export class AuthHelper {
  static async registerSetupAccountWithProfile(
    page: Page,
    request: APIRequestContext,
    username: string,
    password: string,
    email: string,
    startBalance: number,
    type: string,
    name: string,
    surname: string,
    age: number,
    phone: string
  ) {
    const userApi = new UserApi(request);

    // 1. Registrace
    await userApi.registerUser(username, password, email);

    // 2. Login + získání tokenu
    const token = await userApi.getAccessToken(username, password);

    // 3. Vytvoření bankovního účtu
    await userApi.createAccount(token, startBalance, type);

    await userApi.updateUserProfile(token, name, surname, age, email, phone);
  }
}
