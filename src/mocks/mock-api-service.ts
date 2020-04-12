/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  getProjects,
  projectUser,
  getProjectTypes,
  validateUser,
  feedback,
  createProject,
  user,
} from './responses';
import { Project, User } from '@api';

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

  public async getUser(id: string) {
    return user;
  }

  public async editUser(_user: User) {
    return user;
  }
}
