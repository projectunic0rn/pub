export default class JwtTokenHelper {
  static JwtClaimType =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata';

  static getJwtObject(token: string, getMemberObject: boolean) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jwtObject = JSON.parse(window.atob(base64));

      console.log(jwtObject);

      return getMemberObject
        ? JSON.parse(jwtObject[this.JwtClaimType])
        : jwtObject;
    } catch (err) {
      return null;
    }
  }

  static jwtExpired(token: string) {
    const jwtObject = this.getJwtObject(token, false);

    if (!jwtObject) {
      return true;
    }

    // Initialize date to unix epoch time with 'new Date(0)'
    // and set to 'jwtObject.exp' before comparing
    const currentTime = new Date().getTime();
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(jwtObject.exp);

    return currentTime >= expirationDate.getTime();
  }
}
