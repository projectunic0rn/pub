export default class SessionStorageHelper {
  public static storeJwt(jsonWebToken: object) {
    const jwtData = this.stringifySessionData(jsonWebToken);
    localStorage.setItem('currentJwt', jwtData);
  }

  public static getJwt() {
    const storedJwt = localStorage.getItem('currentJwt');

    if (storedJwt === null) {
      const emptyjwt = {
        refreshToken: undefined,
        token: undefined,
      };

      return emptyjwt;
    }

    try {
      const currentJwt = this.parseSessionData(storedJwt);

      return currentJwt;
    } catch (err) {
      return null;
    }
  }

  public static parseSessionData(data: string) {
    return JSON.parse(data);
  }

  public static stringifySessionData(data: object) {
    return JSON.stringify(data);
  }

  public static deleteJwt() {
    localStorage.removeItem('currentJwt');
  }
}
