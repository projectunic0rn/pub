import { render } from '@testing-library/react';
import React from 'react';

import Card from '../card';
import { Project, ProjectUser } from '@api';
import { MockThemeProvider } from '@mocks';
import { noop } from '@utils';

test('display project details', () => {
  const projectUsers: ProjectUser[] = [
    {
      isOwner: true,
      userId: 'abc-123',
    },
    {
      isOwner: false,
      userId: 'bcd-234',
    },
    {
      isOwner: false,
      userId: 'cde-345',
    },
  ];

  const project: Project = {
    name: 'Grocerhub',
    description: 'Grocery list application',
    launchDate: new Date(),
    projectType: '',
    repositoryUrl: '',
    communicationPlatformUrl: 'https://slack.com',
    lookingForMembers: true,
    communicationPlatform: '',
    projectTechnologies: [
      {
        name: 'Artifact',
        projectId: 'abcdef-12345',
      },
      {
        name: 'Creature',
        projectId: 'bcdefg-23456',
      },
      {
        name: 'Enchantment',
        projectId: 'cdefgh-34567',
      },
      {
        name: 'Instant',
        projectId: 'defghi-45678',
      },
      {
        name: 'Land',
        projectId: 'efghij-56789',
      },
      {
        name: 'Planeswalker',
        projectId: 'fghijk-67890',
      },
      {
        name: 'Tribal',
        projectId: 'ghijkl-12345',
      },
      {
        name: 'Sorcery',
        projectId: 'hijklm-23456',
      },
    ],
    projectUsers: [],
  };

  const card = (content = project) => (
    <MockThemeProvider>
      <Card content={content} setError={noop} />
    </MockThemeProvider>
  );

  const { getAllByTestId, getByText, rerender, queryByText } = render(card());

  expect(getByText(/grocerhub/i)).toBeInTheDocument();
  expect(getByText(/grocery/i)).toBeInTheDocument();

  const cardPills = getAllByTestId('project-card-pill').map(
    (v) => v.textContent,
  );

  expect(cardPills).toEqual(
    expect.arrayContaining([
      'Artifact',
      'Creature',
      'Enchantment',
      'Instant',
      'Land',
      '+3',
    ]),
  );

  expect(queryByText(/members?/i)).toBeNull();

  project.projectUsers = projectUsers.filter((v) => v.isOwner);
  rerender(card(project));

  expect(getByText(/1 member/i)).toBeInTheDocument();

  project.projectUsers = projectUsers.filter((v) => !v.isOwner);
  rerender(card(project));

  expect(getByText(/2 members/i)).toBeInTheDocument();
});
