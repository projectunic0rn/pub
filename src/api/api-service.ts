import { HttpClient } from './http-client';
import { Project } from './types/project';
import { ProjectUser } from './types/project-user';
import { UserAuthHelper, SessionStorageHelper } from '@/helpers';

export class ApiService {
  private headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${SessionStorageHelper.getJwt().token}`,
    'Content-Type': 'application/json; charset=utf-8',
  };

  private apiEndpoint: string;

  public constructor() {
    this.apiEndpoint = process.env.API_ENDPOINT || '';
  }

  public async createProject(project: Project) {
    return await HttpClient.post(
      `${this.apiEndpoint}/projects`,
      this.headers,
      project,
    );
  }

  public async getProjects() {
    return await HttpClient.get(`${this.apiEndpoint}/projects`);
  }

  public async joinProject(projectUser: ProjectUser) {
    return await HttpClient.post(
      `${this.apiEndpoint}/projectusers/`,
      this.headers,
    );
  }

  public async leaveProject(id: string) {
    return await HttpClient.delete(
      `${this.apiEndpoint}/projectusers/${id}`,
      this.headers,
    );
  }
}
