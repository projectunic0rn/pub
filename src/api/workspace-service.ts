import { ProfilingUtils } from '@utils';
import { HttpClient } from './http-client';
import { WorkspaceInfo } from './types';

export class WorkspaceService {
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
  private apiEndpoint: string;
  private profiler: ProfilingUtils;

  public constructor() {
    this.apiEndpoint = process.env.GATSBY_WORKSPACE_API_ENDPOINT || '';
    this.profiler = new ProfilingUtils();
  }

  public async getWorkspaceInfo(workspaceType: string): Promise<WorkspaceInfo> {
    const apiEndpoint = this.apiEndpoint.replace(
      'workspaceType',
      workspaceType,
    );
    const endpoint = `${apiEndpoint}/info`;
    this.profiler.setReportInfo(endpoint, 'getWorkspaceInfo');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result as Promise<WorkspaceInfo>;
  }
}
