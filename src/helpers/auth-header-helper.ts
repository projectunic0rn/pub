import { AuthService } from '../api/auth-service';
import JwtTokenHelper from './jwt-token-helper';
import SessionStorageHelper from './session-storage-helper';

export default class AuthHeaderHelper {
  static validAuthToken(token: string) {
    return token !== null && !JwtTokenHelper.jwtExpired(token);
  }

  static async refreshAuthToken(requestConfig: any) {
    const jwtAuthToken = SessionStorageHelper.getJwt();
    const authService = new AuthService();
    const newJwtAuthToken = await authService.refreshJwtToken(jwtAuthToken);

    SessionStorageHelper.storeJwt(newJwtAuthToken);
    requestConfig.headers['Authorization'] = `Bearer ${newJwtAuthToken.token}`;

    return Promise.resolve();
  }

  static async validateAuthorizationHeader(requestConfig: any) {
    const authorization = requestConfig.headers['Authorization'];

    if (!authorization) {
      // Authorization header not present, return empty promise to caller
      return Promise.resolve();
    }

    const token = authorization.split(' ')[1];

    if (token !== 'null') {
      if (!this.validAuthToken(token)) {
        return await this.refreshAuthToken(requestConfig);
      }
    }
    // Token is still valid, return empty promise to caller
    return Promise.resolve();
  }
}
