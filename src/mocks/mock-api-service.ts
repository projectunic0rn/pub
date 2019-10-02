import { Project } from '@/api/types/project';

import { getProjects } from './responses';
import { projectUser } from './responses';

export class MockApiService {
  public async createProject(project: Project) {
    return {};
  }

  public async getProjects() {
    return getProjects;
  }

  public async joinProject() {
    return projectUser;
  }

  public async leaveProject() {
    return projectUser;
  }
}
