// api/tegb
// user_api.ts

import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class UserApi {
  private readonly request: APIRequestContext;
  private readonly apiUrl = "https://tegb-backend-877a0b063d29.herokuapp.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<APIResponse> {
    const response = await this.request.post(`${this.apiUrl}/tegb/register`, {
      data: {
        username,
        password,
        email,
      },
    });
    expect(response.status()).toBe(201);
    return response;
  }

  async successLoginUser(
    username: string,
    password: string
  ): Promise<APIResponse> {
    const response = await this.request.post(`${this.apiUrl}/tegb/login`, {
      data: {
        username,
        password,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    const accessToken = responseBody.access_token;
    expect(accessToken).toBeDefined();
    return accessToken;
  }

  async createAccount(
    accessToken: string,
    startBalance: number,
    type: string
  ): Promise<APIResponse> {
    const response = await this.request.post(
      `${this.apiUrl}/tegb/accounts/create`,
      {
        headers: {
          authorization: "Bearer " + accessToken,
        },
        data: {
          startBalance,
          type,
        },
      }
    );
    expect(response.status()).toBe(201);
    return response;
  }
}
