/* eslint-disable @typescript-eslint/no-unused-vars */
import { WorkspaceInfo } from '@api';
import { getWorkspaceInfo } from './responses';

export class MockWorkspaceService {
  public async getWorkspaceInfo(workspaceType: string): Promise<WorkspaceInfo> {
    return getWorkspaceInfo;
  }
}
