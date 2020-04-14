import { act, fireEvent, render, wait } from '@testing-library/react';
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

  const { getByText, getAllByText, getByLabelText, rerender } = render(
    <MockThemeProvider>
      <SignUpForm />
    </MockThemeProvider>,
  );

  act(() => {
    fireEvent.click(getByText(/sign up/i, { selector: 'button' }));
  });

  await wait(() => expect(getAllByText(/invalid/i)).not.toHaveLength(0));

  rerender(
    <MockThemeProvider>
      <SignUpForm />
    </MockThemeProvider>,
  );

  act(() => {
    fireEvent.change(getByLabelText('Password', { selector: 'input' }), {
      target: { value: 'password1' },
    });
    fireEvent.change(
      getByLabelText('Confirm Password', { selector: 'input' }),
      {
        target: { value: 'password2' },
      },
    );
    fireEvent.click(getByText(/sign up/i, { selector: 'button' }));
  });

  await wait(() =>
    expect(getAllByText(/passwords do not match/i)).not.toHaveLength(0),
  );
});
