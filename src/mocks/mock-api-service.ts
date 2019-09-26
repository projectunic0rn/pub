import { Project } from '@/api/types/project';

import { getProjects } from './responses';
import { projectUser } from './responses';

export class MockApiService {
  public async createProject(project: Project) {
    return Promise.resolve({});
  }

  public async getProjects() {
    return Promise.resolve(getProjects);
  }

  public async joinProject() {
    return Promise.resolve(projectUser);
  }

  public async leaveProject() {
    return Promise.resolve(projectUser);
  }
}
