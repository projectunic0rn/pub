import { HttpClient } from './http-client';

export interface Project {
  name: string;
  description: string;
  projectType: number;
  technologies: string[];
  projectRepo: string;
  launchDate: Date;
  communicationPlatform: string;
}

export class ApiService {
  private headers = {
    Accept: 'application/json',
    Authorization: `Bearer `,
    'Content-Type': 'application/json; charset=utf-8',
  };

  private apiEndpoint: string;

  public constructor() {
    this.apiEndpoint = process.env.API_ENDPOINT ? process.env.API_ENDPOINT : '';
  }

  public async createProject(project: Project) {
    return await HttpClient.post(
      `${this.apiEndpoint}/projects`,
      this.headers,
      project,
    );
  }
}
