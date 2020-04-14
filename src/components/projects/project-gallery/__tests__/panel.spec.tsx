import { render } from '@testing-library/react';
import React from 'react';

import Panel from '../panel';
import { Project } from '@api';
import { noop } from '@utils';
import { MockThemeProvider } from '@mocks';

test('renders correctly', () => {
  const { getByText, container, rerender } = render(
    <MockThemeProvider>
      <Panel setError={noop} />
    </MockThemeProvider>,
  );

  expect(container.firstElementChild?.childNodes).toHaveLength(0);

  const content: Project[] = [
    {
      name: 'Awesome Project',
      description: '',
      launchDate: new Date(),
      projectType: '',
      repositoryUrl: '',
      communicationPlatform: '',
      communicationPlatformUrl: '',
      lookingForMembers: true,
      projectTechnologies: [],
      projectUsers: [],
    },
  ];

  rerender(
    <MockThemeProvider>
      <Panel content={content} setError={noop} />
    </MockThemeProvider>,
  );

  expect(getByText(/awesome project/i)).toBeInTheDocument();
  expect(container.firstElementChild?.childNodes).toHaveLength(1);
});
