import { HttpClient } from './http-client';
import { Feedback, ProjectUser, Project, User, Username } from './types';
import { SessionStorageHelper } from '@helpers';

export class ApiService {
  private headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${SessionStorageHelper.getJwt().token}`,
    'Content-Type': 'application/json; charset=utf-8',
  };

  private apiEndpoint: string;

  public constructor() {
    this.apiEndpoint = process.env.GATSBY_API_ENDPOINT || '';
  }

  public async createProject(project: Project) {
    return await HttpClient.post(
      `${this.apiEndpoint}/projects`,
      this.headers,
      project,
    );
  }

  public async getProjectTypes() {
    return await HttpClient.get(
      `${this.apiEndpoint}/util/projecttypes`,
      this.headers,
    );
  }

  public async getProjects() {
    return await HttpClient.get(`${this.apiEndpoint}/projects`, this.headers);
  }

  public async joinProject(projectUser: ProjectUser) {
    return await HttpClient.post(
      `${this.apiEndpoint}/projectusers/`,
      this.headers,
      projectUser,
    );
  }

  public async leaveProject(id: string) {
    return await HttpClient.delete(
      `${this.apiEndpoint}/projectusers/${id}`,
      this.headers,
    );
  }

  public async validateUsername(username: Username) {
    return await HttpClient.post(
      `${this.apiEndpoint}/util`,
      this.headers,
      username,
    );
  }

  public updateAuthHeader(token: string) {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  public async sendFeedback(feedback: Feedback) {
    return await HttpClient.post(
      `${this.apiEndpoint}/util/send-feedback`,
      this.headers,
      feedback,
    );
  }

  public async getUser(id: string) {
    return await HttpClient.get(
      `${this.apiEndpoint}/users/${id}`,
      this.headers,
    );
  }

  public async editUser(user: User) {
    return await HttpClient.put(
      `${this.apiEndpoint}/users`,
      this.headers,
      user,
    );
  }
}
