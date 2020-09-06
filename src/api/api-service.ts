import { HttpClient } from './http-client';
import {
  Feedback,
  ProjectUser,
  Project,
  User,
  Username,
  ChangePassword,
} from './types';
import { SessionStorageHelper } from '@helpers';
import { ProfilingUtils } from '@utils';

export class ApiService {
  private headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${SessionStorageHelper.getJwt().token}`,
    'Content-Type': 'application/json; charset=utf-8',
  };

  private apiEndpoint: string;
  private profiler: ProfilingUtils;

  public constructor() {
    this.apiEndpoint = process.env.GATSBY_API_ENDPOINT || '';
    this.profiler = new ProfilingUtils();
  }

  public async createProject(project: Project) {
    const endpoint = `${this.apiEndpoint}/projects`;
    this.profiler.setReportInfo(endpoint, 'createProject');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(endpoint, this.headers, project);
    this.profiler.endTimeRecord();
    return result;
  }

  public async getProject(projectId: string) {
    const endpoint = `${this.apiEndpoint}/projects/${projectId}`;
    this.profiler.setReportInfo(endpoint, 'getProject');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result;
  }

  public async getProjects() {
    const endpoint = `${this.apiEndpoint}/projects`;
    this.profiler.setReportInfo(endpoint, 'getProjects');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result;
  }

  public async joinProject(projectUser: ProjectUser) {
    const endpoint = `${this.apiEndpoint}/projectusers`;
    this.profiler.setReportInfo(endpoint, 'joinProject');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(endpoint, this.headers, projectUser);
    this.profiler.endTimeRecord();
    return result;
  }

  public async leaveProject(id: string) {
    const endpoint = `${this.apiEndpoint}/projectusers/${id}`;
    this.profiler.setReportInfo(endpoint, 'leaveProject');
    this.profiler.startTimeRecord();
    const result = await HttpClient.delete(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result;
  }

  public async validateUsername(username: Username) {
    const endpoint = `${this.apiEndpoint}/util`;
    this.profiler.setReportInfo(endpoint, 'validateUsername');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(endpoint, this.headers, username);
    this.profiler.endTimeRecord();
    return result;
  }

  public async getWorkspaceTypes() {
    const endpoint = `${this.apiEndpoint}/util/workspaces`;
    this.profiler.setReportInfo(endpoint, 'getWorkspaceTypes');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result;
  }

  public updateAuthHeader(token: string) {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  public async sendFeedback(feedback: Feedback) {
    const endpoint = `${this.apiEndpoint}/util/send-feedback`;
    this.profiler.setReportInfo(endpoint, 'sendFeedback');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(endpoint, this.headers, feedback);
    this.profiler.endTimeRecord();
    return result;
  }

  public async getUser(id: string) {
    const endpoint = `${this.apiEndpoint}/users/${id}`;
    this.profiler.setReportInfo(endpoint, 'getUser');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result;
  }

  public async getUserContact(id: string) {
    const endpoint = `${this.apiEndpoint}/users/contact/${id}`;
    this.profiler.setReportInfo(endpoint, 'getUserContact');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result;
  }

  public async editUser(user: User) {
    const endpoint = `${this.apiEndpoint}/users`;
    this.profiler.setReportInfo(endpoint, 'editUser');
    this.profiler.startTimeRecord();
    const result = await HttpClient.put(endpoint, this.headers, user);
    this.profiler.endTimeRecord();
    return result;
  }

  public async getRecentDevs() {
    const endpoint = `${this.apiEndpoint}/users/recent`;
    this.profiler.setReportInfo(endpoint, 'getRecentDevs');
    this.profiler.startTimeRecord();
    const result = await HttpClient.get(endpoint, this.headers);
    this.profiler.endTimeRecord();
    return result;
  }

  public async changePassword(changePassword: ChangePassword) {
    const endpoint = `${this.apiEndpoint}/auth/change-password`;
    this.profiler.setReportInfo(endpoint, 'changePassword');
    this.profiler.startTimeRecord();
    const result = await HttpClient.post(
      endpoint,
      this.headers,
      changePassword,
    );
    this.profiler.endTimeRecord();
    return result;
  }
}
