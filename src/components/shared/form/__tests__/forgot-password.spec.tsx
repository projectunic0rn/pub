import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { MockThemeProvider } from '@mocks';
import { ForgotPasswordForm } from '../forgot-password';

describe('Forgot password form tests', () => {
  test('show email input', () => {
    const { getByLabelText } = render(
      <MockThemeProvider>
        <ForgotPasswordForm />
      </MockThemeProvider>,
    );

    const email = getByLabelText(/email/i, { selector: 'input' });

    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute('type', 'email');
  });

  test('show message when email field left empty', () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <ForgotPasswordForm />
      </MockThemeProvider>,
    );

    // Act
    const submit = getByText('Submit');
    fireEvent.click(submit);
    const message = getByText('Email is required.');
    // Assert
    expect(message).toBeInTheDocument();
  });

  test('shows message when email is invalid', () => {
    // Arrange
    const { getByText, getByLabelText } = render(
      <MockThemeProvider>
        <ForgotPasswordForm />
      </MockThemeProvider>,
    );

    // Act
    const submit = getByText('Submit');
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    fireEvent.click(submit);
    const message = getByText('Enter valid email.');

    // Assert
    expect(message).toBeInTheDocument();
  });

  test('shows message when email submitted successfully', async () => {
    // Arrange
    const { getByText, getByLabelText, findByText } = render(
      <MockThemeProvider>
        <ForgotPasswordForm />
      </MockThemeProvider>,
    );

    // Act
    const submit = getByText('Submit');
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'pub@email.com' } });
    fireEvent.click(submit);
    const message = await findByText(
      'Check your email for the password reset link.',
    );

    // Assert
    expect(message).toBeInTheDocument();
  });
});
