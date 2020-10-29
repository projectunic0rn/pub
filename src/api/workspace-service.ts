import { ProfilingUtils } from '@utils';
import { HttpClient } from './http-client';
import { WorkspaceAppAuth, WorkspaceInfo } from './types';

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
    const apiEndpoint = this.resolveWorkspaceEndpoint(workspaceType);
    const endpoint = `${apiEndpoint}/info`;
    this.profiler.setReportInfo(endpoint, 'getWorkspaceInfo');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result as Promise<WorkspaceInfo>;
  }

  public async finishAuth(
    workspaceType: string,
    workspaceAppAuth: WorkspaceAppAuth,
  ) {
    const apiEndpoint = this.resolveWorkspaceEndpoint(workspaceType);
    const endpoint = `${apiEndpoint}/finish_auth?code=${workspaceAppAuth.code}&project=${workspaceAppAuth.project}&workspace=${workspaceAppAuth.workspace}&permissions=${workspaceAppAuth.permissions}`;
    this.profiler.setReportInfo(endpoint, 'finishAuth');
    this.profiler.startTimeRecord();
    await HttpClient.post(endpoint, this.headers, workspaceAppAuth);
    this.profiler.endTimeRecord();
    return;
  }

  private resolveWorkspaceEndpoint(workspaceType: string) {
    if (
      process.env.GATSBY_USE_MOCK === '0' &&
      process.env.GATSBY_ACTIVE_ENV === 'development'
    ) {
      switch (workspaceType) {
        case 'slack':
          return this.apiEndpoint.replace('workspaceType', '8003');
        case 'discord':
          return this.apiEndpoint.replace('workspaceType', '8002');
        default:
          return this.apiEndpoint.replace('workspaceType', '8003');
      }
    } else {
      return this.apiEndpoint.replace('workspaceType', workspaceType);
    }
  }
}
