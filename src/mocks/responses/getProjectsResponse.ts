import { ApiResponse } from '@/api/types/api-response';

export const getProjects: ApiResponse = {
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
          userId: '',
          isOwner: false,
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
      members: ['Kkm', 'ruj', 'Roy'],
      communicationPlatformUrl: 'https://discordapp.com/5qwc',
      projectType: 'community',
      repositoryUrl: 'https://github.com/projectunic0rn/repo1',
      launchDate: new Date(),
      lookingForMembers: true,
      communicationPlatform: 'discord',
    },
    {
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
      members: ['Kkm', 'Oussama', 'Roy'],
      communicationPlatformUrl: 'https://discordapp.com/5qwc',
      projectType: 'community',
      repositoryUrl: 'https://github.com/projectunic0rn/repo1',
      launchDate: new Date(),
      lookingForMembers: true,
      communicationPlatform: 'discord',
    },
    {
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
      members: ['ruj', 'Oussama', 'Roy'],
      communicationPlatformUrl: 'https://slack.com/68urujs',
      projectType: 'community',
      repositoryUrl: 'https://github.com/projectunic0rn/repo1',
      launchDate: new Date(),
      lookingForMembers: true,
      communicationPlatform: 'slack',
    },
  ],
};
