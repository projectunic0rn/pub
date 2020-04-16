/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import { MockThemeProvider } from '@mocks';
import { TechnologiesSelect } from '../controls';

test('render TechnologiesSelect select component', async () => {
  // Arrange
  const mockSetError = () => {};
  const mockSetTechnologies = () => {};
  const { findByText } = render(
    <MockThemeProvider>
      <TechnologiesSelect
        name="technologies"
        id="technologies"
        setError={mockSetError}
        initialValues={[]}
        setTechnologies={mockSetTechnologies}
      />
    </MockThemeProvider>,
  );

  // Act
  const select = await waitFor(() => findByText('Select...'));

  // Assert
  expect(select).toBeInTheDocument();
  expect(select).toBeDefined();
  expect(select).toBeVisible();
});
