import React from 'react';
import Footer from '../footer';
import { render } from '@testing-library/react';
import pkg from '../../../../package.json';
import { MockThemeProvider } from '@mocks';

test('Footer displays app version.', () => {
  // Arrange
  const appVersion = `v${pkg.version}`;
  const { getByText } = render(
    <MockThemeProvider>
      <Footer />
    </MockThemeProvider>,
  );

  // Act
  // throws if 0 or more than 1 element is
  // found and returns if only one instance found
  const appVersionTextNode = getByText(appVersion);

  // Assert
  expect(appVersionTextNode).toBeDefined();
});
