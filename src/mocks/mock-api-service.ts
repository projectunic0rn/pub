import { Project } from '@/api/types/project';

import { getProjects } from './responses';
import { projectUser } from './responses';
import { getProjectTypes } from './responses';
import { validateUser } from './responses';
import { feedback } from './responses';

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

  public async sendFeedback() {
    return feedback;
  }
}
