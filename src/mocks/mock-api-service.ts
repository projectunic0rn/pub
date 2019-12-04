import { Project } from '@/api/types/project';

import {
  getProjects,
  projectUser,
  getProjectTypes,
  validateUser,
  feedback,
  createProject,
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

  public async sendFeedback() {
    return feedback;
  }
}
