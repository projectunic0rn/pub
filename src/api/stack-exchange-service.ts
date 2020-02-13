import { HttpClient } from './http-client';

export class StackExchangeService {
  private apiVersion = '2.2';
  private apiEndpoint = `https://api.stackexchange.com/${this.apiVersion}`;
  private stackExchangeKey = 'DmNUhvkCC4qooqkj6E6Dwg((';

  public async searchTags(searchTerm: string) {
    const inname = encodeURIComponent(searchTerm);

    return await HttpClient.get(
      `${this.apiEndpoint}/tags?site=stackoverflow&key=${this.stackExchangeKey}&inname=${inname}`,
    );
  }
}
