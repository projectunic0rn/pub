import { HttpClient } from './http-client';

export default class StackExchangeService {
  private apiVersion: string = '2.2';
  private apiEndpoint: string = `https://api.stackexchange.com/${
    this.apiVersion
  }`;
  private stackExchangeKey: string = '*08t5pMLzA0X50xU9dNGbQ((';

  public async searchTags(searchTerm: string) {
    return await HttpClient.get(
      `${this.apiEndpoint}/tags?site=stackoverflow&key=${
        this.stackExchangeKey
      }&inname=${encodeURIComponent(searchTerm)}`,
    );
  }
}
