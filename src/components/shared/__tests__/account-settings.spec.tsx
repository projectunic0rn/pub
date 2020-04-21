import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MockThemeProvider } from '@mocks';
import { AccountSettings } from '../containers';
import { MockAuthService } from '@mocks';
import { SignIn, JwtToken } from '@api';
import { SessionStorageHelper } from '@helpers';

describe('test account settings component', () => {
  // Test suite setup
  beforeEach(() => {
    // emulate existing user login
    const credentials: SignIn = {
      email: 'email@email.com',
      password: 'password',
    };

    const response = new MockAuthService().signIn(credentials);
    SessionStorageHelper.storeJwt(response.data as JwtToken);
  });

  test('general tab displays username input with label', async () => {
    // Arrange
    const { getByLabelText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const text = await waitFor(() => getByLabelText('Username'));
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeVisible();
  });

  test('general tab displays bio with label', async () => {
    // Arrange
    const { getByLabelText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const text = await waitFor(() => getByLabelText('Bio'));
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeVisible();
  });

  test('general tab displays technologies with label', async () => {
    // Arrange
    const { getByLabelText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const text = await waitFor(() => getByLabelText('Technologies'));
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeVisible();
  });

  test('current menu item is emphasized', async () => {
    // Arrange
    // Act
    // Assert
  });

  test('edit user api is called successfully when saved', async () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const saveButton = await waitFor(() => getByText('Save'));
    fireEvent.click(saveButton);
    const banner = await waitFor(() => getByText('Settings saved'));
    // Assert
    expect(banner).toBeDefined();
  });

  test('username is updated successfully', async () => {
    // Arrange
    const { getByLabelText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const usernameInput = await waitFor(() => getByLabelText('Username'));
    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });
    const updatedUsername = await waitFor(() => getByLabelText('Username'));
    const inputElement = updatedUsername as HTMLInputElement;
    // Assert
    expect(inputElement.value).toBe('newUsername');
  });

  test('bio is updated successfully', async () => {
    // Arrange
    const { getByLabelText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const bioInput = await waitFor(() => getByLabelText('Bio'));
    fireEvent.change(bioInput, { target: { value: 'new bio' } });
    const updatedUsername = await waitFor(() => getByLabelText('Bio'));
    const inputElement = updatedUsername as HTMLTextAreaElement;
    // Assert
    expect(inputElement.value).toBe('new bio');
  });
});
