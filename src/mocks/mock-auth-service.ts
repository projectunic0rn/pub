import { Login, Register } from '@/api/auth-service';
import { loginResponse } from './responses/loginResponse';
import { registerResponse } from './responses/registerResponse';

export class MockAuthService {
  public login(login: Login) {
    return Promise.resolve(loginResponse);
  }

  public async register(register: Register) {
    return Promise.resolve(registerResponse);
  }
}
