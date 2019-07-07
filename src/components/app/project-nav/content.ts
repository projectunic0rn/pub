export interface Data {
  name: string;
  imageUrl: string;
  tags: string[];
  description: string;
  stars: number;
  members: string[];
}

export interface Content {
  [key: string]: Data[];
}

const allProjects = [
  {
    name: 'Project One',
    imageUrl: '',
    tags: ['Java', 'JavaScript', 'HTML', 'GraphQL'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    stars: 1.2,
    members: ['Kkm', 'Oussama', 'Roy'],
  },
  {
    name: 'Mentrship',
    imageUrl: '',
    tags: ['JavaScript', 'HTML'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    stars: 4,
    members: ['Kkm', 'ruj', 'Roy'],
  },
  {
    name: 'Travel Map',
    imageUrl: '',
    tags: ['JavaScript', 'CSS', 'HTML'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    stars: 3.4,
    members: ['Kkm', 'Oussama', 'Roy'],
  },
  {
    name: 'Project Two',
    imageUrl: '',
    tags: ['TypeScript', 'JavaScript', 'HTML', 'GraphQL'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    stars: 2,
    members: ['ruj', 'Oussama', 'Roy'],
  },
  {
    name: 'Grocerhub',
    imageUrl: '',
    tags: ['JavaScript', 'HTML', 'CSS'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    stars: 1,
    members: ['Kkm', 'ruj', 'Roy'],
  },
  {
    name: 'Remote Hackaton',
    imageUrl: '',
    tags: ['JavaScript', 'HTML'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec est posuere, eget lobortis turpis tristique.',
    stars: 3.4,
    members: ['Kkm', 'Oussama', 'Roy'],
  },
];

export const content: Content = {
  Trending: allProjects.filter((v) => v.name.includes('o')),
  'A-Z': [...allProjects].sort((a, b) => a.name.localeCompare(b.name)),
  Experience: allProjects.slice(0, 6),
};
