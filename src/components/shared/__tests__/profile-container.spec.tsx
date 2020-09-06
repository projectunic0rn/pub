import { ProfileContainer } from '@components/shared/containers';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MockThemeProvider } from '@mocks';
import { user, signInResponse } from '@mocks/responses';
import { JwtToken } from '@api';
import { AuthProvider } from '@contexts';
import { SessionStorageHelper } from '@helpers';

describe('profile container', () => {
  test('displays username returned by api', async () => {
    // Arrange
    const apiUsernameData = user.data.username;
    const { getByText } = render(
      <MockThemeProvider>
        <ProfileContainer id="1" path="profile/1" />
      </MockThemeProvider>,
    );
    // Act
    const profileUsername = await waitFor(() => getByText(apiUsernameData));
    // Assert
    expect(profileUsername).toBeVisible();
    expect(profileUsername).toHaveTextContent(apiUsernameData);
  });

  test('displays all user technologies returned by api', async () => {
    // Arrange
    const apiTechnologiesData = user.data.technologies;

    const { getAllByTestId } = render(
      <MockThemeProvider>
        <ProfileContainer id="1" path="profile/1" />
      </MockThemeProvider>,
    );
    // Act
    const profileTechnology = await waitFor(() => getAllByTestId('technology'));
    // Assert
    expect(profileTechnology.length).toBe(apiTechnologiesData?.length);
  });

  test('displays user bio returned by api', async () => {
    // Arrange
    const apiBioData = user.data.bio;
    const { getByText } = render(
      <MockThemeProvider>
        <ProfileContainer id="1" path="profile/1" />
      </MockThemeProvider>,
    );
    // Act
    const profileBio = await waitFor(() => getByText(apiBioData));
    // Assert
    expect(profileBio).toBeVisible();
    expect(profileBio).toHaveTextContent(apiBioData);
  });

  test('displays user profile picture', async () => {
    // Arrange
    const altText = 'Profile Picture';
    const { getByAltText } = render(
      <MockThemeProvider>
        <ProfileContainer id="1" path="profile/1" />
      </MockThemeProvider>,
    );
    // Act
    const profilePictureAltText = await waitFor(() => getByAltText(altText));

    // Assert
    expect(profilePictureAltText).toBeVisible();
    expect(profilePictureAltText).toBeDefined();
  });

  test('displays user contact info', async () => {
    // Arrange
    const { getByTestId } = render(
      <MockThemeProvider>
        <ProfileContainer id="1" path="profile/1" />
      </MockThemeProvider>,
    );
    // Act
    const profileContact = await waitFor(() => getByTestId('contact-info'));

    // Assert
    expect(profileContact).toBeVisible();
    expect(profileContact).toBeDefined();
  });

  test('email contact not present if user not autheticated', async () => {
    // Arrange
    const { findByText } = render(
      <MockThemeProvider>
        <ProfileContainer id="1" path="profile/1" />
      </MockThemeProvider>,
    );
    // Act
    const signInMessage = await findByText(/Sign in to view email/i);

    // Assert
    expect(signInMessage).toBeVisible();
    expect(signInMessage).toBeDefined();
  });

  test('email contact present if user is authenticated', async () => {
    // Arrange
    SessionStorageHelper.storeJwt(signInResponse.data as JwtToken);
    const { findByText } = render(
      <AuthProvider>
        <MockThemeProvider>
          <ProfileContainer id="1" path="profile/1" />
        </MockThemeProvider>
      </AuthProvider>,
    );
    // Act
    const email = await findByText(/@email.com/i);

    // Assert
    expect(email).toBeVisible();
    expect(email).toBeDefined();
  });
});
