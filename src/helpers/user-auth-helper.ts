import { SessionStorageHelper } from './session-storage-helper';
import { JwtTokenHelper } from './jwt-token-helper';

export class UserAuthHelper {
  public static isUserAuthenticated() {
    const jwt = SessionStorageHelper.getJwt();

    return !!jwt.token;
  }

  public static getMember() {
    const token = SessionStorageHelper.getJwt().token;
    if (!!token) {
      return JwtTokenHelper.getJwtObject(token);
    }
  }

  public static getUserId() {
    return this.getMember().id;
  }
}
