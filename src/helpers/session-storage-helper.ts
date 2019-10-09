import { JwtToken } from '@/api/types/jwt-token';

export default class SessionStorageHelper {
  public static storeJwt(jsonWebToken: object) {
    const jwtData = this.stringifySessionData(jsonWebToken);
    localStorage.setItem('currentJwt', jwtData);
  }

  public static getJwt(): JwtToken {
    const storedJwt = localStorage.getItem('currentJwt');
    const emptyjwt: JwtToken = {
      token: undefined,
    };

    if (storedJwt === null) {
      return emptyjwt;
    }

    try {
      const currentJwt = this.parseSessionData(storedJwt);

      return currentJwt;
    } catch (err) {
      return emptyjwt;
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
