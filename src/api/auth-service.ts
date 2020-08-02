import { HttpClient } from './http-client';
import { SignIn, SignUp, ResetPasswordRequest, ResetPassword } from './types';
import { ProfilingUtils } from '@utils';

export class AuthService {
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
  private apiEndpoint: string;
  private profiler: ProfilingUtils;

  public constructor() {
    this.apiEndpoint = process.env.GATSBY_API_ENDPOINT || '';
    this.profiler = new ProfilingUtils();
  }

  public async signIn(signIn: SignIn) {
    const endpoint = `${this.apiEndpoint}/auth/login`;
    this.profiler.setReportInfo(endpoint, 'signIn');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(endpoint, this.headers, signIn);
    this.profiler.endTimeRecord();
    return result;
  }

  public async signUp(signUp: SignUp) {
    const endpoint = `${this.apiEndpoint}/auth/register`;
    this.profiler.setReportInfo(endpoint, 'signUp');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(endpoint, this.headers, signUp);
    this.profiler.endTimeRecord();
    return result;
  }

  public async resetPasswordRequest(
    resetPasswordRequest: ResetPasswordRequest,
  ) {
    const endpoint = `${this.apiEndpoint}/auth/reset-passsword-request`;
    this.profiler.setReportInfo(endpoint, 'resetPasswordRequest');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(
      endpoint,
      this.headers,
      resetPasswordRequest,
    );
    this.profiler.endTimeRecord();
    return result;
  }

  public async resetPassword(resetPassword: ResetPassword) {
    const endpoint = `${this.apiEndpoint}/auth/reset-passsword`;
    this.profiler.setReportInfo(endpoint, 'resetPassword');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(
      `${this.apiEndpoint}/auth/reset-passsword`,
      this.headers,
      resetPassword,
    );
    this.profiler.endTimeRecord();
    return result;
  }
}
