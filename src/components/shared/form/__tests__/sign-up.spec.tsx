import { render } from '@testing-library/react';
import React from 'react';

import { MockThemeProvider } from '@mocks';
import { SignUpForm } from '../sign-up';

test('shows all the required inputs', () => {
  const { getByLabelText } = render(
    <MockThemeProvider>
      <SignUpForm />
    </MockThemeProvider>,
  );

  const email = getByLabelText(/email/i, { selector: 'input' });
  const username = getByLabelText(/username/i, { selector: 'input' });
  const password = getByLabelText('Password', { selector: 'input' });
  const password2 = getByLabelText(/confirm password/i, { selector: 'input' });

  expect(email).toBeInTheDocument();
  expect(email).toHaveAttribute('type', 'email');
  expect(username).toBeInTheDocument();
  expect(username).toHaveAttribute('type', 'text');
  expect(password).toBeInTheDocument();
  expect(password).toHaveAttribute('type', 'password');
  expect(password2).toBeInTheDocument();
  expect(password2).toHaveAttribute('type', 'password');
});
