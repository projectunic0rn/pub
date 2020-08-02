import { HttpClient } from './http-client';
import { ProfilingUtils } from '@utils';

export class StackExchangeService {
  private apiVersion = '2.2';
  private apiEndpoint = `https://api.stackexchange.com/${this.apiVersion}`;
  private stackExchangeKey = 'DmNUhvkCC4qooqkj6E6Dwg((';
  private profiler = new ProfilingUtils();

  public async searchTags(searchTerm: string) {
    const inname = encodeURIComponent(searchTerm);
    const endpoint = `${this.apiEndpoint}/tags?site=stackoverflow&key=${this.stackExchangeKey}&inname=${inname}`;
    this.profiler.setReportInfo(endpoint, 'searchTags');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint);
    this.profiler.endTimeRecord();
    return result;
  }
}
