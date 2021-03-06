import { ApiResponse, Project } from '@api';

export const getProjects: ApiResponse<Project[]> = {
  ok: true,
  data: [
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      name: 'Project Unicorn UI',
      description:
        'A frontend to streamline the starting and joining of projects on the project unicorn slack team. ',
      repositoryUrl: 'null',
      communicationPlatformUrl: 'https://slack.com',
      lookingForMembers: true,
      communicationPlatform: 'gitter',
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
    {
      id: '08d6c75d-2425-3fd6-6ad0-463de001630c',
      name: 'Puzzle',
      description:
        'Puzzle is a highly customizable CMS that allows you to build websites from scratch without any code.',
      repositoryUrl: 'https://github.com/projectunic0rn/Puzzle',
      communicationPlatformUrl: 'https://discordapp.com',
      lookingForMembers: true,
      communicationPlatform: 'discord',
      projectTechnologies: [
        {
          name: 'html',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
        },
        {
          name: 'css',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
        },
        {
          name: 'javascript',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
        },
        {
          name: 'vue',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
        },
        {
          name: 'nodejs',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
        },
        {
          name: 'postgresql',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
        },
      ],
      projectUsers: [
        {
          id: '08d6c75d-246a-6d19-0fe0-140fa505e75a',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
          userId: '08d6c5c9-b5f7-6966-79a7-c982b5dcc6ad',
          username: 'unicorn2',
          isOwner: false,
        },
        {
          id: '08d6cef5-c1bc-69b2-e763-03ff3daf751e',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
          userId: '08d6cef0-bc48-16ce-1300-6e395b3b3eba',
          username: 'unicorn167',
          isOwner: false,
        },
        {
          id: '08d6cff3-cbb1-69d0-8b8c-edb405c931c9',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
          userId: '08d6c5c9-e4c4-46a6-63bc-c68a81a8154f',
          username: 'unicorn91',
          isOwner: false,
        },
        {
          id: '08d6dba5-45bb-d5db-be08-c7c8452e2cd4',
          projectId: '08d6c75d-2425-3fd6-6ad0-463de001630c',
          userId: '08d6db86-757b-fa77-3013-0cc556222670',
          username: 'unicorn207',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6c91a-5dd1-ed5a-d227-cbdae06fe83c',
      name: 'Motivware',
      description:
        'Motivware is an open source customer relationship management application to assist auto-mechanic shops with organization and business process improvements. ',
      repositoryUrl: 'https://github.com/projectunic0rn/Motivware',
      communicationPlatformUrl: 'https://slack.com',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '08d6c91a-5e36-4402-c4c9-a3f3e0d537ad',
          projectId: '08d6c91a-5dd1-ed5a-d227-cbdae06fe83c',
          userId: '08d6c5c9-cdb3-f312-c74f-719d900f335f',
          username: 'unicorn43',
          isOwner: false,
        },
        {
          id: '08d6cbd8-7036-7855-e946-941b9f542cc4',
          projectId: '08d6c91a-5dd1-ed5a-d227-cbdae06fe83c',
          userId: '08d6cbd6-bade-f451-9ded-37b21389454c',
          username: 'unicorn128',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
      name: 'Travel Map',
      description:
        'Full-screen, modern map which lets you see where you and your friends have been or plan to go in the world. ',
      repositoryUrl: 'https://github.com/projectunic0rn/Travel-Map',
      communicationPlatformUrl: 'https://slack.com',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [
        {
          name: 'react',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
        },
        {
          name: 'javascript',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
        },
        {
          name: 'css',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
        },
        {
          name: 'html',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
        },
        {
          name: 'xd',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
        },
        {
          name: 'illustrator',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
        },
      ],
      projectUsers: [
        {
          id: '08d6ccf0-ee12-6db0-5247-c1e9c96f259e',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d6c5c9-de33-4d5a-1451-69111480ee74',
          username: 'unicorn77',
          isOwner: false,
        },
        {
          id: '08d6ccf1-6dc7-a4d0-9747-5b76f68f997f',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d6cbd6-bade-f451-9ded-37b21389454c',
          username: 'unicorn128',
          isOwner: false,
        },
        {
          id: '08d6cd70-5367-bfe4-833e-0a62b21f6112',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d6ccdd-13c6-0938-cf5f-1e5606638200',
          username: 'unicorn145',
          isOwner: false,
        },
        {
          id: '08d6ce75-f6e5-8943-1c77-49efd3cb230b',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d6ce75-185f-45c5-1aa0-d18ad943326b',
          username: 'unicorn157',
          isOwner: false,
        },
        {
          id: '08d6d697-609a-e774-7265-7593f9ba7d8e',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d6cfd4-6b29-8b75-5b7d-84cfa87d7a9b',
          username: 'unicorn177',
          isOwner: false,
        },
        {
          id: '08d6e6df-ad4d-e1b0-438b-e2e0855d6117',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d6e6dd-39f3-a456-5135-611319b0cbb2',
          username: 'unicorn243',
          isOwner: false,
        },
        {
          id: '08d6e9ff-9524-b504-a977-6c3fb84cfd94',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d6e621-80c1-1ea0-b764-77396e36b2ad',
          username: 'unicorn242',
          isOwner: false,
        },
        {
          id: '08d71917-ccad-f1f0-37e6-bca68c0720e5',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d718ac-386e-26b1-5be1-fa6af0fd885c',
          username: 'unicorn281',
          isOwner: false,
        },
        {
          id: '08d719e7-21de-48a1-8ab2-ec12873ed6bf',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d717f1-156e-db2a-71c5-cee0e4c9fc52',
          username: 'unicorn278',
          isOwner: false,
        },
        {
          id: '08d72f04-9d75-fe95-6a00-8ae23842bed1',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d72e7e-3223-c878-9952-3b748c94e5f6',
          username: 'unicorn307',
          isOwner: false,
        },
        {
          id: '08d737b3-0d03-4f60-dbed-27a6d0a37b5b',
          projectId: '08d6ccf0-edbe-d39b-8d80-60f06a4c9799',
          userId: '08d73798-a173-6c10-cb63-85e3deaf2db8',
          username: 'unicorn329',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
      name: 'Remote Hackathon',
      description:
        'Software to help organizers setup and execute a hackathon for 100% remote teams and communities. ',
      repositoryUrl: 'https://github.com/projectunic0rn/remote-hackathon',
      communicationPlatformUrl: 'https://discord.gg',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [
        {
          name: 'react',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
        },
        {
          name: 'typescript',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
        },
        {
          name: 'c#',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
        },
      ],
      projectUsers: [
        {
          id: '08d6cff0-c9ec-4a0b-e0f4-eef504947cd8',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6c5c9-b575-f71e-dc9a-2e6dfeb94f96',
          username: 'unicorn1',
          isOwner: false,
        },
        {
          id: '08d6d3dd-fc8e-01f6-6a68-f21bbbd514fd',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6cc23-c332-671b-6da9-0a123b6729eb',
          username: 'unicorn135',
          isOwner: false,
        },
        {
          id: '08d6d8a9-4ded-ad2e-ab1e-39d17e06efdb',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6d28e-a15e-7cf8-5c0e-63ba524e3857',
          username: 'unicorn204',
          isOwner: false,
        },
        {
          id: '08d6dba2-347d-89bf-7510-5cfdcea285cb',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6c5c9-e4c4-46a6-63bc-c68a81a8154f',
          username: 'unicorn91',
          isOwner: false,
        },
        {
          id: '08d6dbc2-a58a-5d0d-5596-c608b6ecf29d',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6d109-6bb2-1f99-8e14-3f661f4e57b5',
          username: 'unicorn183',
          isOwner: false,
        },
        {
          id: '08d6dd40-427b-7713-6165-cb8397b5f020',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6dd3b-45bb-f7bf-6583-1e6b6c9a9a86',
          username: 'unicorn211',
          isOwner: false,
        },
        {
          id: '08d6e5ff-a181-a552-8ee8-9cacbef58135',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6e5fd-ec40-0d01-6e43-e7627b485876',
          username: 'unicorn241',
          isOwner: false,
        },
        {
          id: '08d6e660-1a16-28b6-4b70-f59a1a618077',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6e47a-669f-8f85-578f-636b00fdfe04',
          username: 'unicorn226',
          isOwner: false,
        },
        {
          id: '08d6e965-b348-4e45-9ddf-5785c3c1973b',
          projectId: '08d6cff0-c9bf-0343-48db-e2b7bc1576b2',
          userId: '08d6d167-5281-6d27-3fac-bc60e496c4b7',
          username: 'unicorn194',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6d4b7-6fb8-2f8c-62e8-3efef55285e8',
      name: 'Stjorn',
      description:
        "Stjorn is (actually will be) a task management app. It's built with microservices written in various languages.\nApp is using many different technologies, at this moment:\nFrontend:\n-Vue.js\n-Apollo\n-GraphQL\nBackend:\nAPI Gateway:\n-graphql-tools (apollo)\n-Node.js\nAuth-service:\n-Golang\n-Ginkgo (test framework)\n-REST\nTask-management-service:\n-Ruby on Rails\n-GraphQL\n-Rspec (test framework)\nUser-service:\n-Ruby on Rails\n-GraphQL\n-Rspec (test framework)\nThere are a lot of services without choosen language, including notification-service and mailing-service, later maybe also chat-service. If you want to contribute project you will probably find whatever you are looking for, even if you don't have skills you are thinking we are looking for. At this moment, when I write these features we have 5 people in project, 4 programmers and one UI/UX designer.\ngithub: github.com/stjorn",
      repositoryUrl: 'null',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '08d6d4b7-6fe6-b635-37bc-76b49908d985',
          projectId: '08d6d4b7-6fb8-2f8c-62e8-3efef55285e8',
          userId: '08d6c5c9-e447-4e8a-466d-fe04e9d2e06b',
          username: 'unicorn90',
          isOwner: false,
        },
        {
          id: '08d6dd14-3363-9d18-fdc3-752e65e6cc7f',
          projectId: '08d6d4b7-6fb8-2f8c-62e8-3efef55285e8',
          userId: '08d6c5c9-eb8f-d8ce-f2ef-7f81c02d36bd',
          username: 'unicorn105',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
      name: 'Action Events',
      description:
        'Life Planner to get your life on track and measure your progress',
      repositoryUrl: 'https://github.com/projectunic0rn/action-events',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [
        {
          name: 'javascript',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
        },
        {
          name: 'react',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
        },
        {
          name: 'typescript',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
        },
        {
          name: 'postgresql',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
        },
      ],
      projectUsers: [
        {
          id: '08d6d9cb-3e7a-6ef5-3594-e1e6e36c2038',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
          userId: '08d6cf35-551c-4ad2-59b4-a5aa1eaf9021',
          username: 'unicorn174',
          isOwner: false,
        },
        {
          id: '08d6d9d2-798c-b9fd-40ae-380e7ee187b9',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
          userId: '08d6cc28-6a33-dbe4-bc46-fa84cf312ff7',
          username: 'unicorn137',
          isOwner: false,
        },
        {
          id: '08d6da1d-fba2-8e6f-0ebe-b12bd3221fdd',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
          userId: '08d6d162-4e41-66c7-ac96-739d4826ec8e',
          username: 'unicorn193',
          isOwner: false,
        },
        {
          id: '08d71f73-bcda-90dd-f1aa-9016643628a5',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
          userId: '08d71235-be40-8255-352b-87200b0c334b',
          username: 'unicorn272',
          isOwner: false,
        },
        {
          id: '08d7228c-dcd8-f552-2deb-66dd41b3697c',
          projectId: '08d6d9cb-3e5f-9fbf-6f86-6d6bb3fcf034',
          userId: '08d70305-0bd8-167a-0018-48fc16c7efc6',
          username: 'unicorn258',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6ea0a-7756-6def-7636-19826fba88ba',
      name: 'Detrashed',
      description:
        'A website where visitors can view, create, and join meetups planned to ‘detrash’ (cleanup) an area.',
      repositoryUrl: 'null',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '08d6ea0a-7761-b140-eff9-182d2d89774a',
          projectId: '08d6ea0a-7756-6def-7636-19826fba88ba',
          userId: '08d6e47a-669f-8f85-578f-636b00fdfe04',
          username: 'unicorn226',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6ea2c-de7a-ba6e-62ff-f31228b7f955',
      name: 'Warmr',
      description:
        'Mobile app to encourage people to find and interact with people/places/things, by allowing users to create location based, categorical, and social alerts.',
      repositoryUrl: 'https://github.com/projectunic0rn/warmr',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '08d6ea2c-de86-893c-b6eb-a7874f780344',
          projectId: '08d6ea2c-de7a-ba6e-62ff-f31228b7f955',
          userId: '08d6e6f4-fb25-85dc-5f79-488e15ec0a0c',
          username: 'unicorn244',
          isOwner: false,
        },
        {
          id: '08d6ea9e-6e20-7647-6f02-7397ef442c98',
          projectId: '08d6ea2c-de7a-ba6e-62ff-f31228b7f955',
          userId: '08d6e621-80c1-1ea0-b764-77396e36b2ad',
          username: 'unicorn242',
          isOwner: false,
        },
        {
          id: '08d6f8e7-8c57-d9b3-a7c8-c1cf4127d47f',
          projectId: '08d6ea2c-de7a-ba6e-62ff-f31228b7f955',
          userId: '08d6e4b1-2f3a-5502-fef9-87009521c7c3',
          username: 'unicorn230',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6eaa4-3c2b-aef4-f42e-6ef4d16f5677',
      name: 'Petomo',
      description:
        "A web app to streamline pet adoption process. With good UI/UX and one centralized location pets will have a better reach and better chances of going to a loving owner. (psst it's Tinder for pet adoption)",
      repositoryUrl: 'null',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '08d6eaa4-3c33-23b6-fd0e-46b18872a520',
          projectId: '08d6eaa4-3c2b-aef4-f42e-6ef4d16f5677',
          userId: '08d6e508-5e56-e3e1-2397-3449fae2ea4a',
          username: 'unicorn234',
          isOwner: false,
        },
        {
          id: '08d6eabf-60da-04d7-2f0c-b2986078ae42',
          projectId: '08d6eaa4-3c2b-aef4-f42e-6ef4d16f5677',
          userId: '08d6e473-e1d6-d9c2-586f-9d460d30a61f',
          username: 'unicorn223',
          isOwner: false,
        },
        {
          id: '08d6eeb8-b406-baf0-8db2-b99fd2ed626a',
          projectId: '08d6eaa4-3c2b-aef4-f42e-6ef4d16f5677',
          userId: '08d6c5c9-ce98-887e-380a-bb3ddd5cf438',
          username: 'unicorn45',
          isOwner: false,
        },
        {
          id: '08d6ef1f-30ad-9012-bf2b-34324e389942',
          projectId: '08d6eaa4-3c2b-aef4-f42e-6ef4d16f5677',
          userId: '08d6e470-cde7-0ca3-d14e-812a04b42798',
          username: 'unicorn220',
          isOwner: false,
        },
        {
          id: '08d6f0f2-c565-966c-ab8a-19001a4eebe1',
          projectId: '08d6eaa4-3c2b-aef4-f42e-6ef4d16f5677',
          userId: '08d6e503-cd4f-413e-c79a-d35f17a1b96d',
          username: 'unicorn232',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d6eab5-f9fc-61a3-de84-97c4c8f4edfb',
      name: 'Nuevo Foundation ',
      description:
        'Nuevo Foundation is a 501c3 non-profit. One of the challenges underserved communities face is the unequal distribution of opportunity. With Nuevo Foundation, we are making an effort to expose students in these communities to careers in STEM, and give them the opportunity to be excited about technology. The site is currently active at https://www.nuevofoundation.org. ',
      repositoryUrl: 'null',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '08d6eab5-fa0b-8903-fbfb-3b92e39ce5d5',
          projectId: '08d6eab5-f9fc-61a3-de84-97c4c8f4edfb',
          userId: '08d6c5c9-b575-f71e-dc9a-2e6dfeb94f96',
          username: 'unicorn1',
          isOwner: false,
        },
      ],
    },
    {
      id: '08d7043c-20c8-25fd-c6f2-abd6563f7896',
      name: 'F-Droid Kotlin Apps',
      description:
        'An app that lets you find android apps listed in F-Droid that use the Kotlin programming language.',
      repositoryUrl: 'null',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '08d7043c-2108-a9ef-304a-ed36c839c59a',
          projectId: '08d7043c-20c8-25fd-c6f2-abd6563f7896',
          userId: '08d703ab-9fbc-98a8-8f53-f1082eeb31b5',
          username: 'unicorn259',
          isOwner: false,
        },
        {
          id: '08d71baa-fba9-d20a-d256-41193a2308e5',
          projectId: '08d7043c-20c8-25fd-c6f2-abd6563f7896',
          userId: '08d6c5c9-b575-f71e-dc9a-2e6dfeb94f96',
          username: 'unicorn1',
          isOwner: false,
        },
      ],
    },
    {
      id: '3600c8cb-c631-49e9-9d3b-f6abe146c4da',
      name: 'FoundIT',
      description:
        'FoundIT allows users to post lost or found items in hope that it gets returned back to its original owners.',
      repositoryUrl: 'null',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [],
      projectUsers: [
        {
          id: '1856f701-f691-4fdf-b38e-6c1aea2c1bad',
          projectId: '3600c8cb-c631-49e9-9d3b-f6abe146c4da',
          userId: '08d6c5c9-be8f-1984-0c1b-2f6028efdb87',
          username: 'unicorn15',
          isOwner: false,
        },
        {
          id: 'd17f6326-cf64-4da2-9fc5-ca166bdd3a03',
          projectId: '3600c8cb-c631-49e9-9d3b-f6abe146c4da',
          userId: '08d6c5c9-dabc-f266-33ed-ab980acab56a',
          username: 'unicorn70',
          isOwner: false,
        },
      ],
    },
    {
      id: '723e356d-47d4-4ac3-a143-282c56eefe8a',
      name: 'Mentrship',
      description:
        'A mentoring platform to connect industry professionals with students.',
      repositoryUrl: 'null',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      communicationPlatform: 'slack',
      projectTechnologies: [
        {
          name: 'c#',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
        },
        {
          name: 'react',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
        },
        {
          name: 'typescript',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
        },
      ],
      projectUsers: [
        {
          id: '09534407-0a34-4e15-95a6-94734e3aee7f',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
          userId: '08d6c5c9-be8f-1984-0c1b-2f6028efdb87',
          username: 'unicorn15',
          isOwner: false,
        },
        {
          id: 'a2d8f4dc-4ab9-40c3-aadb-89770d2b1272',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
          userId: '08d6c5c9-b575-f71e-dc9a-2e6dfeb94f96',
          username: 'unicorn1',
          isOwner: false,
        },
        {
          id: 'a4715c8b-7dc5-4b5d-a752-485051db84f2',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
          userId: '08d6c5c9-c44e-3e86-9935-7424b0638f6e',
          username: 'unicorn25',
          isOwner: false,
        },
        {
          id: 'efa3bb36-baaf-4336-92a4-478ec1cf6283',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
          userId: '08d6c5c9-b7f7-6afe-d9fc-8808ddd3d2b4',
          username: 'unicorn6',
          isOwner: false,
        },
        {
          id: 'f9d08dde-1192-4616-aa6d-4fbf782589ad',
          projectId: '723e356d-47d4-4ac3-a143-282c56eefe8a',
          userId: '08d6c5c9-c073-bf5c-4d85-b0dfb04e33ab',
          username: 'unicorn19',
          isOwner: false,
        },
      ],
    },
  ],
};
