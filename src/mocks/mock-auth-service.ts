/* eslint-disable @typescript-eslint/no-unused-vars */
import { signUpResponse } from './responses/signup-response';
import { signInResponse } from './responses/signin-response';
import { SignUp, SignIn, ResetPasswordRequest, ResetPassword } from '@api';

export class MockAuthService {
  public signIn(signIn: SignIn) {
    return signInResponse;
  }

  public async signUp(signUp: SignUp) {
    return signUpResponse;
  }

  public async resetPasswordRequest(
    resetPasswordRequest: ResetPasswordRequest,
  ) {
    return resetPasswordRequest;
  }

  public async resetPassword(resetPassword: ResetPassword) {
    return resetPassword;
  }
}
