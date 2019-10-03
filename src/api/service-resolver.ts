import { MockApiService } from '@/mocks/mock-api-service';
import { ApiService } from './api-service';
import { MockAuthService } from '@/mocks/mock-auth-service';
import { AuthService } from './auth-service';
import StackExchangeService from './stack-exchange-service';
import MockStackExchangeService from '../mocks/mock-stack-exchange-service';

export default class ServiceResolver {
  public ApiResolver() {
    return this.useMock() ? new MockApiService() : new ApiService();
  }

  public AuthResolver() {
    return this.useMock() ? new MockAuthService() : new AuthService();
  }

  public StackExchangeResolver() {
    return this.useMock()
      ? new MockStackExchangeService()
      : new StackExchangeService();
  }

  private useMock() {
    return (
      !process.env.NODE_ENV ||
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    );
  }
}
