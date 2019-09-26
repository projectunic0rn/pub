import { Project } from '@/api/api-service';

import { getProjectTypes } from './responses/getProjectTypes';

export class MockApiService {
  public async createProject(project: Project) {
    return Promise.resolve({});
  }

  public async getProjectTypes() {
    return Promise.resolve(getProjectTypes);
  }
}
