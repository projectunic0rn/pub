import { Login, Register } from '@/api/auth-service';

export class MockAuthService {
  public login(login: Login) {
    return Promise.resolve({});
  }

  public async register(register: Register) {
    return Promise.resolve({});
  }
}
