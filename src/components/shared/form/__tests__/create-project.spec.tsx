import { render, wait } from '@testing-library/react';
import React from 'react';

import { CreateProjectForm } from '../create-project';
import { SignIn, JwtToken } from '@api';
import { SessionStorageHelper } from '@helpers';
import { MockAuthService, MockThemeProvider } from '@mocks';

beforeEach(() => {
  const credentials: SignIn = {
    email: 'email@email.com',
    password: 'password',
  };

  const response = new MockAuthService().signIn(credentials);
  SessionStorageHelper.storeJwt(response.data as JwtToken);
});

test('shows all the required inputs', async () => {
  const { getByLabelText } = render(
    <MockThemeProvider>
      <CreateProjectForm />
    </MockThemeProvider>,
  );

  await wait(() => {
    const projectName = getByLabelText(/project name/i, { selector: 'input' });
    const description = getByLabelText(/description/i, {
      selector: 'textarea',
    });
    const projectType = getByLabelText(/project type/i, { selector: 'input' });
    const projectRepo = getByLabelText(/project repo/i, { selector: 'input' });
    const launchDate = getByLabelText(/launch date/i, { selector: 'input' });
    const commPlatform = getByLabelText(/communication platform/i, {
      selector: 'input',
    });
    const technologies = getByLabelText(/technologies/i, { selector: 'input' });

    expect(projectName).toBeInTheDocument();
    expect(projectName).toHaveAttribute('type', 'text');
    expect(description).toBeInTheDocument();
    expect(projectType).toBeInTheDocument();
    expect(projectRepo).toBeInTheDocument();
    expect(projectRepo).toHaveAttribute('type', 'text');
    expect(launchDate).toBeInTheDocument();
    expect(launchDate).toHaveAttribute('type', 'date');
    expect(commPlatform).toBeInTheDocument();
    expect(commPlatform).toHaveAttribute('type', 'text');
    expect(technologies).toBeInTheDocument();
  });
});
