/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  getProjects,
  projectUser,
  validateUser,
  feedback,
  createProject,
  user,
  getProject,
  getWorkspaceTypes,
  getRecentDevs,
  userContact,
} from './responses';
import { Project, User, ChangePassword } from '@api';

export class MockApiService {
  public async createProject(project: Project) {
    return createProject;
  }

  public async getProject(projectId: string) {
    return getProject;
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

  public async getUserContact(id: string) {
    return userContact;
  }

  public async editUser(_user: User) {
    return user;
  }

  public async getRecentDevs() {
    return getRecentDevs;
  }

  public async changePassword(changePassword: ChangePassword) {
    return changePassword;
  }

  public async getWorkspaceTypes() {
    return getWorkspaceTypes;
  }
}
