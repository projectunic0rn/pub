import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { SignUpForm } from '../sign-up';
import { MockThemeProvider } from '@mocks';

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

test('shows message when at least one field is invalid', async () => {
  expect.assertions(2);

  const { getByText, getByLabelText, findByText, findAllByText } = render(
    <MockThemeProvider>
      <SignUpForm />
    </MockThemeProvider>,
  );

  fireEvent.click(getByText(/sign up/i, { selector: 'button' }));

  const messages = await findAllByText(/invalid/i);

  expect(messages).not.toHaveLength(0);

  fireEvent.change(getByLabelText('Password', { selector: 'input' }), {
    target: { value: 'password1' },
  });

  fireEvent.change(getByLabelText('Confirm Password', { selector: 'input' }), {
    target: { value: 'password2' },
  });

  fireEvent.click(getByText(/sign up/i, { selector: 'button' }));

  const message = await findByText(/passwords do not match/i);

  expect(message).toBeInTheDocument();
});
