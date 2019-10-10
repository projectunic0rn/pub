import { Project } from '@/api/types/project';

import { getProjects } from './responses';
import { projectUser } from './responses';
import { getProjectTypes } from './responses/get-project-types';
import { validateUser } from './responses/validate-user';

export class MockApiService {
  public async createProject(project: Project) {
    return {};
  }

  public async getProjectTypes() {
    return getProjectTypes;
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

  public async validateUsername() {
    return validateUser;
  }
}
