import { Login, Register } from '@/api/auth-service';
import { loginResponse } from './responses/login-response';
import { registerResponse } from './responses/register-response';

export class MockAuthService {
  public login(login: Login) {
    return Promise.resolve(loginResponse);
  }

  public async register(register: Register) {
    return Promise.resolve(registerResponse);
  }
}
