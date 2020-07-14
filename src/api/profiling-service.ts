import { HttpClient } from './http-client';

export interface ProfilingReport {
  name: string;
  value: number;
  additionalInfo: string;
}

export class ProfilingService {
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };

  private apiEndpoint: string;

  public constructor() {
    this.apiEndpoint = process.env.GATSBY_PROFILING_API_ENDPOINT || '';
  }

  public async sendReport(report: ProfilingReport) {
    return await HttpClient.post(
      `${this.apiEndpoint}/report`,
      this.headers,
      report,
    );
  }
}
