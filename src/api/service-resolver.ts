import {
  ApiService,
  AuthService,
  ProfilingService,
  StackExchangeService,
  WorkspaceService,
} from './';
import {
  MockApiService,
  MockAuthService,
  MockProfilingService,
  MockStackExchangeService,
  MockWorkspaceService,
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
  private static workspaceServiceInstance?:
    | MockWorkspaceService
    | WorkspaceService;

  public static apiResolver() {
    return this.getApiServiceInstance();
  }

  public static authResolver() {
    return this.getAuthServiceInstance();
  }

  public static profilingResolver() {
    return this.getProfilingServiceInstance();
  }

  public static stackExchangeResolver() {
    return this.getStackExchangeServiceInstance();
  }

  public static workspaceServiceResolver() {
    return this.getWorkspaceServiceInstance();
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

  private static getProfilingServiceInstance() {
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

  private static getWorkspaceServiceInstance() {
    if (this.workspaceServiceInstance === undefined) {
      this.workspaceServiceInstance = this.useMock()
        ? new MockWorkspaceService()
        : new WorkspaceService();
    }
    return this.workspaceServiceInstance;
  }

  private static useMock() {
    return process.env.GATSBY_USE_MOCK === '1';
  }
}
