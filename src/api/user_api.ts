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
    return response;
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

  async getAccessToken(username: string, password: string): Promise<string> {
    const response = await this.successLoginUser(username, password);
    const body = await response.json();
    const accessToken = body.access_token;
    expect(accessToken).toBeDefined();
    return accessToken;
  }

  async updateUserProfile(
    accessToken: string,
    name: string,
    surname: string,
    age: number,
    email: string,
    phone: string
  ): Promise<APIResponse> {
    const response = await this.request.patch(`${this.apiUrl}/tegb/profile`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
      data: {
        name,
        surname,
        age,
        email,
        phone,
      },
    });

    expect(response.status()).toBe(200);
    return response;
  }
}
