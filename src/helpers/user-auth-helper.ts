import { navigate } from 'gatsby';

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

  public static redirectToSignIn() {
    navigate('/signin', {
      state: { message: 'You need to be signed in to join a project' },
    });
  }
}
