import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MockThemeProvider } from '@mocks';
import { AccountSettings } from '../account-settings';
import { MockAuthService } from '@mocks';
import { SignIn, JwtToken } from '@api';
import { SessionStorageHelper } from '@helpers';
import { menuItems } from '../content/menu-items';

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

  test('edit profile tab displays username input with label', () => {
    // Arrange
    const { getByLabelText, getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const tab = getByText('Edit Profile');
    fireEvent.click(tab);
    const text = getByLabelText('Username');
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeVisible();
  });

  test('edit profile tab displays bio with label', () => {
    // Arrange
    const { getByLabelText, getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const tab = getByText('Edit Profile');
    fireEvent.click(tab);
    const text = getByLabelText('About');
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeVisible();
  });

  test('edit profile tab displays technologies with label', () => {
    // Arrange
    const { getByLabelText, getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const tab = getByText('Edit Profile');
    fireEvent.click(tab);
    const text = getByLabelText('Technologies');
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeVisible();
  });

  test('active menu item is emphasized', async () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );

    // Assumed active item is always first
    // element in list
    const activeItem = menuItems[0].name;
    // Act
    const menuItem = getByText(activeItem);
    // Assert
    expect(menuItem).toHaveStyle('font-weight: bold;');
    expect(menuItem).toHaveStyle('border-left: black solid 2px;');
  });

  test('inactive menu item is not emphasized', async () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );

    // Assumed active item is always first
    // element in list
    const activeItem = menuItems[1].name;
    // Act
    const menuItem = getByText(activeItem);
    // Assert
    expect(menuItem).toHaveStyle('font-weight: 400;');
    expect(menuItem).toHaveStyle('border-left: ;');
  });

  test('edit user api is called successfully when saved from edit profile tab', async () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const tab = getByText('Edit Profile');
    fireEvent.click(tab);
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    const banner = await waitFor(() => getByText('Settings saved'));
    // Assert
    expect(banner).toBeDefined();
    expect(banner).toBeVisible();
  });

  test('username is updated successfully from edit profile tab', () => {
    // Arrange
    const { getByLabelText, getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const tab = getByText('Edit Profile');
    fireEvent.click(tab);
    const usernameInput = getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });
    const updatedUsername = getByLabelText('Username');
    const inputElement = updatedUsername as HTMLInputElement;
    // Assert
    expect(inputElement).toHaveValue('newUsername');
  });

  test('bio is updated successfully from edit profile tab', () => {
    // Arrange
    const { getByLabelText, getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const tab = getByText('Edit Profile');
    fireEvent.click(tab);
    const bioInput = getByLabelText('About');
    fireEvent.change(bioInput, { target: { value: 'new bio' } });
    const updatedUsername = getByLabelText('About');
    const inputElement = updatedUsername as HTMLTextAreaElement;
    // Assert
    expect(inputElement.value).toBe('new bio');
  });

  test('change password tab contains 3 fields', async () => {
    // Arrange
    const { getByText, findAllByAltText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    // Act
    const tab = getByText('Change Password');
    fireEvent.click(tab);
    const passwordFields = await findAllByAltText('password-field');
    // Assert
    expect(passwordFields.length).toBe(3);
  });

  test('change password form shows error if any or all fields left blank', () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    const tab = getByText('Change Password');
    fireEvent.click(tab);

    // Act
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    const message = getByText('Provide a value for all fields.');

    // Assert
    expect(message).toBeDefined();
    expect(message).toBeVisible();
  });

  test("change password form shows error if new passwords don't match", () => {
    // Arrange
    const { getByText, getByLabelText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    const tab = getByText('Change Password');
    fireEvent.click(tab);

    const newPasswordInput = getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });

    const confirmNewPasswordInput = getByLabelText('Confirm New Password');
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'newPassword1' },
    });

    const oldPasswordInput = getByLabelText('Old Password');
    fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword' } });

    // Act
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    const message = getByText("New passwords don't match.");
    // Assert
    expect(message).toBeDefined();
    expect(message).toBeVisible();
  });

  test('change password form submits successfully with banner message', async () => {
    // Arrange
    const { getByText, getByLabelText } = render(
      <MockThemeProvider>
        <AccountSettings />
      </MockThemeProvider>,
    );
    const tab = getByText('Change Password');
    fireEvent.click(tab);

    const newPasswordInput = getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });

    const confirmNewPasswordInput = getByLabelText('Confirm New Password');
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'newPassword' },
    });

    const oldPasswordInput = getByLabelText('Old Password');
    fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword' } });

    // Act
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    const banner = await waitFor(() => getByText('Password updated.'));
    // Assert
    expect(banner).toBeDefined();
    expect(banner).toBeVisible();
  });
});
