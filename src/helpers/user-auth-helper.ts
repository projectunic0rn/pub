import SessionStorageHelper from './session-storage-helper';
import JwtTokenHelper from './jwt-token-helper';

export default class UserAuthHelper {
  static isUserAuthenticated() {
    const jwt = SessionStorageHelper.getJwt();

    return jwt && jwt.token;
  }

  static getMember() {
    return JwtTokenHelper.getJwtObject(
      SessionStorageHelper.getJwt().token,
      true,
    );
  }

  static getUserId() {
    return this.getMember().id;
  }

  static getUsername() {
    return this.getMember().username;
  }
}
