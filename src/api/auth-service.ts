import { HttpClient } from './http-client';

export interface Login {
  username: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  local: string;
  timezone: string;
}

export class AuthService {
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
  private apiEndpoint: string;

  public constructor() {
    this.apiEndpoint = process.env.API_ENDPOINT ? process.env.API_ENDPOINT : '';
  }

  public async login(login: Login) {
    return await HttpClient.post(
      `${this.apiEndpoint}/auth/login`,
      this.headers,
      login,
    );
  }

  public async register(register: Register) {
    return await HttpClient.post(
      `${this.apiEndpoint}/auth/register`,
      this.headers,
      register,
    );
  }
}
