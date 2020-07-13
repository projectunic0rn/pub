import {
  ApiService,
  AuthService,
  ProfilingService,
  StackExchangeService,
} from './';
import {
  MockApiService,
  MockAuthService,
  MockProfilingService,
  MockStackExchangeService,
} from '@mocks';

export class ServiceResolver {
  private static apiServiceInstance?: MockApiService | ApiService;
  private static authServiceInstance?: MockAuthService | AuthService;
  private static profilingServiceInstance?:
    | MockProfilingService
    | ProfilingService;
  private static stackExchangeServiceInstance?:
    | MockStackExchangeService
    | StackExchangeService;

  public static apiResolver() {
    return this.getApiServiceInstance();
  }

  public static authResolver() {
    return this.getAuthServiceInstance();
  }

  public static profilingResolver() {
    return this.getProfilingServiceInstancxe();
  }

  public static stackExchangeResolver() {
    return this.getStackExchangeServiceInstance();
  }

  private static getApiServiceInstance() {
    if (this.apiServiceInstance === undefined) {
      this.apiServiceInstance = this.useMock()
        ? new MockApiService()
        : new ApiService();
    }
    return this.apiServiceInstance;
  }

  private static getAuthServiceInstance() {
    if (this.authServiceInstance === undefined) {
      this.authServiceInstance = this.useMock()
        ? new MockAuthService()
        : new AuthService();
    }
    return this.authServiceInstance;
  }

  private static getProfilingServiceInstancxe() {
    if (this.profilingServiceInstance === undefined) {
      this.profilingServiceInstance = this.useMock()
        ? new MockProfilingService()
        : new ProfilingService();
    }
    return this.profilingServiceInstance;
  }

  private static getStackExchangeServiceInstance() {
    if (this.stackExchangeServiceInstance === undefined) {
      this.stackExchangeServiceInstance = this.useMock()
        ? new MockStackExchangeService()
        : new StackExchangeService();
    }
    return this.stackExchangeServiceInstance;
  }

  private static useMock() {
    return (
      !process.env.NODE_ENV ||
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    );
  }
}
