import { ApiResponse, Project } from '@api';

export const getProject: ApiResponse<Project> = {
  ok: true,
  data: {
    id: '08d6c5e7-6100-c770-61c3-834f6474a77b',
    name: 'Project Unicorn UI',
    description:
      'A frontend to streamline the starting and joining of projects on the project unicorn slack team.',
    launchDate: new Date(),
    projectType: 'Community',
    repositoryUrl: 'null',
    communicationPlatformUrl: 'https://slack.com',
    lookingForMembers: true,
    communicationPlatform: 'slack',
    projectTechnologies: [
      {
        name: 'illustrator',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      },
      {
        name: 'xd',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      },
      {
        name: 'javascript',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      },
      {
        name: 'react',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      },
      {
        name: 'c#',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      },
    ],
    projectUsers: [
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c53',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-b575-f71e-dc9a-2e6dfeb94f96',
        username: 'unicorn1',
        isOwner: false,
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c54',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-e4c4-46a6-63bc-c68a81a8154f',
        username: 'unicorn91',
        isOwner: false,
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c55',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-de33-4d5a-1451-69111480ee74',
        username: 'unicorn77',
        isOwner: false,
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-e007-d7b8-235d-165330930563',
        username: 'unicorn81',
        isOwner: false,
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c57',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-df95-b688-b09b-243fd0e32dfe',
        username: 'unicorn80',
        isOwner: false,
      },
    ],
  },
};
