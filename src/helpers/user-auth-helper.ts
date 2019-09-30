import SessionStorageHelper from './session-storage-helper';
import JwtTokenHelper from './jwt-token-helper';

export default class UserAuthHelper {
  public static isUserAuthenticated() {
    const jwt = SessionStorageHelper.getJwt();

    return jwt && jwt.token;
  }

  public static getMember() {
    return JwtTokenHelper.getJwtObject(
      SessionStorageHelper.getJwt().token,
      true,
    );
  }

  public static getUserId() {
    return this.getMember().id;
  }

  public static getUsername() {
    return this.getMember().username;
  }
}
