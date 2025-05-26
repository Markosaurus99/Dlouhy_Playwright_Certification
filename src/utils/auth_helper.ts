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

    await userApi.registerUser(username, password, email);

    const token = await userApi.getAccessToken(username, password);

    const accountResponse = await userApi.createAccount(
      token,
      startBalance,
      type
    );

    const body = await accountResponse.json();
    const accountNumber = body.accountNumber;

    await userApi.updateUserProfile(token, name, surname, age, email, phone);
    return accountNumber;
  }
}
