export interface Data {
  name: string;
  technologies: string[];
  description: string;
  members: string[];
  communicationPlatformUrl: string;
}

const allProjects = [
  {
    name: 'Project One',
    technologies: [
      'Java',
      'JavaScript',
      'HTML',
      'GraphQL',
      'Django',
      'Ruby on Rails',
      'CSS',
      'HTML5',
      'CSS3',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    members: [
      'Aaron Garton',
      'Oussama',
      'Roy',
      'Kkm',
      'Oussama',
      'Roy',
      'Kkm',
      'Oussama',
      'Roy',
      'Kkm',
      'Oussama',
      'Roy',
    ],
    communicationPlatformUrl: 'https://slack.com/fw43rf',
  },
  {
    name: 'Mentrship',
    technologies: ['JavaScript', 'HTML'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    members: ['Kkm', 'ruj', 'Roy'],
    communicationPlatformUrl: 'https://slack.com/fw43rf',
  },
  {
    name: 'Travel Map',
    technologies: ['JavaScript', 'CSS', 'HTML'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    members: ['Kkm', 'Oussama', 'Roy'],
    communicationPlatformUrl: 'https://discordapp.com/5qwc',
  },
  {
    name: 'Project Two',
    technologies: ['TypeScript', 'JavaScript', 'HTML', 'GraphQL'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    members: ['ruj', 'Oussama', 'Roy'],
    communicationPlatformUrl: 'https://slack.com/68urujs',
  },
  {
    name: 'Grocerhub',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    members: ['Kkm', 'ruj', 'Roy'],
    communicationPlatformUrl: 'https://discordapp.com/37eh8d',
  },
  {
    name: 'Remote Hackaton',
    technologies: ['JavaScript', 'HTML'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    members: ['Kkm', 'Oussama', 'Roy'],
    communicationPlatformUrl: 'https://discordapp.com/fw284rh',
  },
];

export const content = allProjects;
