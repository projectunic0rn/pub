import { act, fireEvent, render, wait } from '@testing-library/react';
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

  const { getByText } = render(
    <MockThemeProvider>
      <SignInForm location={{ state: { message: '' } }} />
    </MockThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByText(/sign in/i, { selector: 'button' }));
  });

  await wait(() =>
    expect(getByText(/invalid email or password/i)).toBeInTheDocument(),
  );
});
