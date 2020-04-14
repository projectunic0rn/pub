import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { MockThemeProvider } from '@mocks';
import { SignInForm } from '../sign-in';

test('shows email and password inputs', () => {
  const { getByLabelText } = render(
    <MockThemeProvider>
      <SignInForm location={{ state: { message: '' } }} />
    </MockThemeProvider>,
  );

  const email = getByLabelText(/email/i, { selector: 'input' });
  const password = getByLabelText(/password/i, { selector: 'input' });

  expect(email).toBeInTheDocument();
  expect(email).toHaveAttribute('type', 'email');
  expect(password).toBeInTheDocument();
  expect(password).toHaveAttribute('type', 'password');
});

test('shows message when email or password is invalid', async () => {
  expect.assertions(1);

  const { getByText, findByText } = render(
    <MockThemeProvider>
      <SignInForm location={{ state: { message: '' } }} />
    </MockThemeProvider>,
  );

  fireEvent.click(getByText(/sign in/i, { selector: 'button' }));

  const message = await findByText(/invalid email or password/i);

  expect(message).toBeInTheDocument();
});
