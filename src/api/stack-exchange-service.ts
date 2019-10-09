import { HttpClient } from './http-client';

export default class StackExchangeService {
  private apiVersion: string = '2.2';
  private apiEndpoint: string = `https://api.stackexchange.com/${
    this.apiVersion
  }`;
  private stackExchangeKey: string = 'DmNUhvkCC4qooqkj6E6Dwg((';

  public async searchTags(searchTerm: string) {
    return await HttpClient.get(
      `${this.apiEndpoint}/tags?site=stackoverflow&key=${
        this.stackExchangeKey
      }&inname=${encodeURIComponent(searchTerm)}`,
    );
  }
}
