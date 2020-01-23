import { HttpClient } from './http-client';
import { SignIn, SignUp } from './types';

export class AuthService {
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
  private apiEndpoint: string;

  public constructor() {
    this.apiEndpoint = process.env.GATSBY_API_ENDPOINT || '';
  }

  public async signIn(signIn: SignIn) {
    return await HttpClient.post(
      `${this.apiEndpoint}/auth/login`,
      this.headers,
      signIn,
    );
  }

  public async signUp(signUp: SignUp) {
    return await HttpClient.post(
      `${this.apiEndpoint}/auth/register`,
      this.headers,
      signUp,
    );
  }
}
