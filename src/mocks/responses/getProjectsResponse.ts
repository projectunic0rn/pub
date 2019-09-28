import { ApiResponse } from '@/api/types/api-response';
import { Project } from '@/api/types/project';

export const getProjects: ApiResponse<Project[]> = {
  ok: true,
  data: [
    {
      id: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
      name: 'Project One',
      projectTechnologies: [
        {
          name: 'HTML',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
        {
          name: 'CSS',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
      projectUsers: [
        {
          id: 'ea968cc5-7834-4ff9-9472-6afb1bf00c42',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
          userId: '08d74265-f020-e7a2-ce8c-e68276021e83',
          isOwner: false,
          username: 'Roy',
        },
      ],
      communicationPlatformUrl: 'https://slack.com/fw43rf',
      projectType: 'community',
      repositoryUrl: 'https://github.com/projectunic0rn/repo1',
      launchDate: new Date(),
      lookingForMembers: true,
      communicationPlatform: 'slack',
    },
    {
      id: '1e7caa89-40cd-4d16-aea9-10c1cf0dabcd',
      name: 'Mentrship',
      projectTechnologies: [
        {
          name: 'HTML',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
        {
          name: 'CSS',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
      projectUsers: [
        {
          id: '676da886-3b66-4b03-a18c-9c4e1a9e1abf',
          projectId: '1e7caa89-40cd-4d16-aea9-10c1cf0dabcd',
          userId: '7c73bf17-ccf7-4757-bdaa-84a37edac3ab',
          isOwner: false,
          username: 'dclark',
        },
      ],
      communicationPlatformUrl: 'https://discordapp.com/5qwc',
      projectType: 'community',
      repositoryUrl: 'https://github.com/projectunic0rn/repo1',
      launchDate: new Date(),
      lookingForMembers: true,
      communicationPlatform: 'discord',
    },
    {
      id: '1e7caa89-40cd-4d16-aea9-10c1cf0dabcd',
      name: 'Travel Map',
      projectTechnologies: [
        {
          name: 'NodeJS',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
        {
          name: 'Angular',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
      projectUsers: [
        {
          id: 'ea968cc5-7834-4ff9-9472-6afb1bf00c42',
          projectId: '0e1d758e-1d1b-43e6-a658-2df898165557',
          userId: 'cff2c023-8647-4fc8-af09-5ac436d10622',
          isOwner: false,
          username: 'Kkm',
        },
      ],
      communicationPlatformUrl: 'https://discordapp.com/5qwc',
      projectType: 'community',
      repositoryUrl: 'https://github.com/projectunic0rn/repo1',
      launchDate: new Date(),
      lookingForMembers: true,
      communicationPlatform: 'discord',
    },
    {
      id: '0858f182-918e-4b4c-adee-feced0e5e2e5',
      name: 'Project Two',
      projectTechnologies: [
        {
          name: 'TypeScript',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
        {
          name: 'GraphQL',
          projectId: '3b721e49-a1b4-4253-a3c9-adaa134b5876',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
      projectUsers: [
        {
          id: 'ea968cc5-7834-4ff9-9472-6afb1bf00c42',
          projectId: '0858f182-918e-4b4c-adee-feced0e5e2e5',
          userId: '7029e8fa-8fb0-4ab3-b933-b26eab0f6687',
          isOwner: false,
          username: 'Ricky',
        },
      ],
      communicationPlatformUrl: 'https://slack.com/68urujs',
      projectType: 'community',
      repositoryUrl: 'https://github.com/projectunic0rn/repo1',
      launchDate: new Date(),
      lookingForMembers: true,
      communicationPlatform: 'slack',
    },
  ],
};
