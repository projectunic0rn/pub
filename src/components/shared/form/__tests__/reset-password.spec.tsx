import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { MockThemeProvider } from '@mocks';
import { ResetPasswordForm } from '../reset-password';

describe('Reset password form tests', () => {
  test('shows both password fields', () => {
    const { getByLabelText } = render(
      <MockThemeProvider>
        <ResetPasswordForm token="test_token" />
      </MockThemeProvider>,
    );

    const newPassword = getByLabelText('New Password', { selector: 'input' });
    const confirmNewPassword = getByLabelText('Confirm New Password', {
      selector: 'input',
    });

    expect(newPassword).toBeInTheDocument();
    expect(newPassword).toBeInTheDocument();
    expect(confirmNewPassword).toHaveAttribute('type', 'password');
    expect(confirmNewPassword).toHaveAttribute('type', 'password');
  });

  test('show message when password field(s) left empty', () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <ResetPasswordForm token="test_token" />
      </MockThemeProvider>,
    );

    // Act
    const reset = getByText('Reset');
    fireEvent.click(reset);
    const message = getByText('Both password fields required.');
    // Assert
    expect(message).toBeInTheDocument();
  });

  test('show message when password token param not provided', () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <ResetPasswordForm token={null} />
      </MockThemeProvider>,
    );

    // Act
    const message = getByText("Missing required 'token' query parameter.");
    // Assert
    expect(message).toBeInTheDocument();
  });

  test('show message when password dont match', () => {
    // Arrange
    const { getByText, getByLabelText } = render(
      <MockThemeProvider>
        <ResetPasswordForm token="test_token" />
      </MockThemeProvider>,
    );

    // Act
    const newPassword = getByLabelText('New Password', { selector: 'input' });
    const confirmNewPassword = getByLabelText('Confirm New Password', {
      selector: 'input',
    });
    fireEvent.change(newPassword, { target: { value: 'non-matching' } });
    fireEvent.change(confirmNewPassword, { target: { value: 'passwords' } });

    const reset = getByText('Reset');
    fireEvent.click(reset);
    const message = getByText('Password fields must match.');
    // Assert
    expect(message).toBeInTheDocument();
  });
});
