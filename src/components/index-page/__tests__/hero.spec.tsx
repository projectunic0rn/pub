import { render } from '@testing-library/react';
import React from 'react';
import Hero from '../hero';
import { MockThemeProvider } from '@mocks';

describe('hero', () => {
  test('sign up call to action is rendered and visible', async () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <Hero />
      </MockThemeProvider>,
    );
    // Act
    const cta = getByText('Sign Up');
    // Assert
    expect(cta).toBeVisible();
    expect(cta).toBeDefined();
  });

  test('sign up call to action is button', async () => {
    // Arrange
    const { getByRole } = render(
      <MockThemeProvider>
        <Hero />
      </MockThemeProvider>,
    );
    // Act
    const ctaButton = getByRole('button');
    // Assert
    expect(ctaButton).toBeDefined();
  });
});
