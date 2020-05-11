/* eslint-disable @typescript-eslint/no-empty-function */
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { MockThemeProvider } from '@mocks';
import { TechnologiesSelect } from '../controls';
import { Formik } from 'formik';

test('render TechnologiesSelect select component', async () => {
  const handleSubmit = () => {};

  // Arrange
  const mockSetError = () => {};
  const mockSetTechnologies = () => {};
  const { findByText } = render(
    <MockThemeProvider>
      <Formik initialValues={{ technologies: [] }} onSubmit={handleSubmit}>
        <TechnologiesSelect
          name="technologies"
          setError={mockSetError}
          initialValues={[]}
          setTechnologies={mockSetTechnologies}
          hasError={false}
        />
      </Formik>
    </MockThemeProvider>,
  );

  // Act
  const select = await waitFor(() => findByText('Select...'));

  // Assert
  expect(select).toBeInTheDocument();
  expect(select).toBeDefined();
  expect(select).toBeVisible();
});
