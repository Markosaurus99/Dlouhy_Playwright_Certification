import { Page, APIRequestContext } from "@playwright/test";
import { UserApi } from "../api/user_api.ts";

type UserData = {
  username: string;
  password: string;
  email: string;
  startBalance: number;
  type: string;
  name: string;
  surname: string;
  age: number;
  phone: string;
};

export async function registerSetupAccountWithProfile(
  page: Page,
  request: APIRequestContext,
  userData: UserData
): Promise<number> {
  const userApi = new UserApi(request);

  await userApi.registerUser(
    userData.username,
    userData.password,
    userData.email
  );

  const token = await userApi.loginAndgetAccessToken(
    userData.username,
    userData.password
  );

  const accountResponse = await userApi.createAccount(
    token,
    userData.startBalance,
    userData.type
  );

  const body = await accountResponse.json();
  const accountNumber = body.accountNumber;

  await userApi.updateUserProfile(
    token,
    userData.name,
    userData.surname,
    userData.age,
    userData.email,
    userData.phone
  );
  return accountNumber;
}
