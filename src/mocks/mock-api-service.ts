import { Project } from '@/api/api-service';

export class MockApiService {
  public async createProject(project: Project) {
    return Promise.resolve({});
  }
}
