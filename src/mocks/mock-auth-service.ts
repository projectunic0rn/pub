import { signUpResponse } from './responses/signup-response';
import { signInResponse } from './responses/signin-response';
import { SignUp } from '@/api/types/sign-up';
import { SignIn } from '@/api/types/sign-in';

export class MockAuthService {
  public signIn(signIn: SignIn) {
    return Promise.resolve(signInResponse);
  }

  public async signUp(signUp: SignUp) {
    return Promise.resolve(signUpResponse);
  }
}
