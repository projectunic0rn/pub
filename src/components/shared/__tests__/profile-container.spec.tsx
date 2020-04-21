import { ProfileContainer } from '@components/shared/containers';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MockThemeProvider } from '@mocks';
import { user } from '@mocks/responses';

describe('profile container', () => {
  test('displays username returned by api', async () => {
    // Arrange
    const apiUsernameData = user.data.username;
    const { getByText } = render(
      <MockThemeProvider>
        <ProfileContainer path="profile/1" />
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
        <ProfileContainer path="profile/1" />
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
        <ProfileContainer path="profile/1" />
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
        <ProfileContainer path="profile/1" />
      </MockThemeProvider>,
    );
    // Act
    const profilePictureAltText = await waitFor(() => getByAltText(altText));

    // Assert
    expect(profilePictureAltText).toBeVisible();
    expect(profilePictureAltText).toBeDefined();
  });
});
