export default class SessionStorageHelper {
  static storeJwt(jsonWebToken: object) {
    const jwtData = this.stringifySessionData(jsonWebToken);
    localStorage.setItem('currentJwt', jwtData);
  }

  static getJwt() {
    const storedJwt = localStorage.getItem('currentJwt');

    if (storedJwt === null) {
      const emptyjwt = {
        refreshToken: 'null',
        token: 'null',
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

  static parseSessionData(data: string) {
    return JSON.parse(data);
  }

  static stringifySessionData(data: object) {
    return JSON.stringify(data);
  }

  static deleteJwt() {
    localStorage.removeItem('currentJwt');
  }
}
