import React from 'react';
import { Navigation } from '../navigation';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider } from '@contexts';
import { MockThemeProvider } from '@mocks';
import { SessionStorageHelper } from '@helpers';
import { signInResponse, user } from '@mocks/responses';
import { JwtToken } from '@api';
import { defaultNavItems } from '../layout/default-nav-items';

describe('navigation', () => {
  test('profile image of authenticated user is displayed on nav', async () => {
    // Arrange
    const expectedAvatar = user.data.profilePictureUrl;
    SessionStorageHelper.storeJwt(signInResponse.data as JwtToken);
    const { getByAltText } = render(
      <AuthProvider>
        <MockThemeProvider>
          <Navigation
            isAtTop={true}
            isVisible={true}
            isSidebarOpen={false}
            openSidebar={jest.fn()}
            navItems={defaultNavItems}
          ></Navigation>
        </MockThemeProvider>
      </AuthProvider>,
    );
    // Act
    const navAvatar = (await waitFor(() =>
      getByAltText('profile image'),
    )) as HTMLImageElement;
    // Assert
    expect(navAvatar).toBeDefined();
    expect(navAvatar).toBeVisible();
    expect(navAvatar.src).toBe(expectedAvatar);
  });
});
