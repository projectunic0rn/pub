/* eslint-disable @typescript-eslint/no-unused-vars */
import { signUpResponse } from './responses/signup-response';
import { signInResponse } from './responses/signin-response';
import { SignUp, SignIn, PasswordReset } from '@api';

export class MockAuthService {
  public signIn(signIn: SignIn) {
    return signInResponse;
  }

  public async signUp(signUp: SignUp) {
    return signUpResponse;
  }

  public async resetPassword(passwordReset: PasswordReset) {
    return passwordReset;
  }
}
