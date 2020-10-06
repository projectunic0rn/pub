import { ApiResponse, Project } from '@api';

export const createProject: ApiResponse<Project> = {
  ok: true,
  data: {
    name: '',
    description: '',
    repositoryUrl: '',
    communicationPlatform: '',
    communicationPlatformUrl: '',
    lookingForMembers: true,
    projectTechnologies: [],
    projectUsers: [],
  },
};
