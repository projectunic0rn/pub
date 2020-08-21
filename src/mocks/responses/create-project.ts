import { ApiResponse, Project } from '@api';

export const createProject: ApiResponse<Project> = {
  ok: true,
  data: {
    name: '',
    description: '',
    launchDate: new Date(),
    repositoryUrl: '',
    communicationPlatform: '',
    communicationPlatformUrl: '',
    lookingForMembers: true,
    projectTechnologies: [],
    projectUsers: [],
  },
};
