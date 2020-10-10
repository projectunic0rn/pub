/* eslint-disable @typescript-eslint/no-unused-vars */
import { WorkspaceAppAuth, WorkspaceInfo } from '@api';
import { getWorkspaceInfo } from './responses';

export class MockWorkspaceService {
  public async getWorkspaceInfo(workspaceType: string): Promise<WorkspaceInfo> {
    return getWorkspaceInfo;
  }

  public async finishAuth(
    workspaceType: string,
    workspaceAppAuth: WorkspaceAppAuth,
  ) {
    return;
  }
}
