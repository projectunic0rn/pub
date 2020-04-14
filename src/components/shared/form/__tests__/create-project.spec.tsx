import { render } from '@testing-library/react';
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
  expect.assertions(11);

  const { findByLabelText } = render(
    <MockThemeProvider>
      <CreateProjectForm />
    </MockThemeProvider>,
  );

  const projectName = await findByLabelText(/project name/i, {
    selector: 'input',
  });

  const description = await findByLabelText(/description/i, {
    selector: 'textarea',
  });

  const projectType = await findByLabelText(/project type/i, {
    selector: 'select',
  });

  const projectRepo = await findByLabelText(/project repo/i, {
    selector: 'input',
  });

  const launchDate = await findByLabelText(/launch date/i, {
    selector: 'input',
  });

  const commPlatform = await findByLabelText(/communication platform/i, {
    selector: 'input',
  });

  const technologies = await findByLabelText(/technologies/i);

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
