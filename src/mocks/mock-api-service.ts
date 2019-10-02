import { Project } from '@/api/types/project';

import { getProjects } from './responses';
import { projectUser } from './responses';

import { getProjectTypes } from './responses/get-project-types';

export class MockApiService {
  public async createProject(project: Project) {
    return Promise.resolve({});
  }

  public async getProjectTypes() {
    return Promise.resolve(getProjectTypes);
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
