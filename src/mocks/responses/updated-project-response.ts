import { ApiResponse, ProjectDetailed } from '@api';

export const updatedProject: ApiResponse<ProjectDetailed> = {
  ok: true,
  data: {
    id: '08d6c5e7-6100-c770-61c3-834f6474a77b',
    name: 'Project Unicorn UI',
    description:
      'A frontend to streamline the starting and joining of projects on the project unicorn slack team.',
    extendedMarkdownDescription: '**Bold description**',
    launchDate: new Date(),
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
      {
        name: 'java',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      },
      {
        name: 'reactjs',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      },
    ],
    projectUsers: [
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c53',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d73d50-6ff3-594e-1014-059b9f6d9317',
        username: 'roy',
        isOwner: true,
        timezone: 'America/Los_Angeles',
        fullName: 'roy',
        profilePictureUrl:
          'https://ca.slack-edge.com/TBUA4NSQZ-UBW8QQG86-d975c9e1b069-512',
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c54',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-e4c4-46a6-63bc-c68a81a8154f',
        username: 'unicorn91',
        isOwner: false,
        timezone: 'America/Los_Angeles',
        fullName: '',
        profilePictureUrl:
          'https://ca.slack-edge.com/TBUA4NSQZ-UBW8QQG86-d975c9e1b069-512',
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c55',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-de33-4d5a-1451-69111480ee74',
        username: 'unicorn77',
        isOwner: false,
        timezone: 'America/Los_Angeles',
        profilePictureUrl:
          'https://ca.slack-edge.com/TBUA4NSQZ-UBW8QQG86-d975c9e1b069-512',
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-e007-d7b8-235d-165330930563',
        username: 'unicorn81',
        isOwner: false,
        fullName: 'roy',
        profilePictureUrl:
          'https://ca.slack-edge.com/TBUA4NSQZ-UBW8QQG86-d975c9e1b069-512',
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c57',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-df95-b688-b09b-243fd0e32da1',
        username: 'unicorn80',
        isOwner: false,
        timezone: 'America/Los_Angeles',
        fullName: 'roy',
        profilePictureUrl: '',
      },
      {
        id: '08d6c5e7-618f-0a0b-f6bb-b8600e4e4c57',
        projectId: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5c9-df95-b688-b09b-243fd0e32da2',
        username: 'unicorn80',
        isOwner: false,
        timezone: 'America/Los_Angeles',
        fullName: 'roy',
      },
    ],
    projectCollaboratorSuggestions: [
      {
        id: '08d6c5e7-6100-c770-61c3-834f6474a77b',
        userId: '08d6c5e7-6100-c770-61c3-834f6474a77c',
        username: 'roy',
        profilePictureUrl:
          'https://lh3.googleusercontent.com/a-/AOh14GieAe3KQueYz4OmZRJ1QXMBgcn7Ij7fLDnWmHAYMQ=s88-c-k-c0x00ffffff-no-rj-mo',
      },
    ],
  },
};
