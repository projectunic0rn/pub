import { Project } from '@/api/types/project';

import {
  getProjects,
  createProject,
  projectUser,
  getProjectTypes,
  validateUser,
} from './responses';

export class MockApiService {
  public async createProject(project: Project) {
    return createProject;
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
