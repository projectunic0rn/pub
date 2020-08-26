import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ProjectWorkspace } from '../project-workspace';
import { MockThemeProvider } from '@mocks';

describe('project workspace page tests', () => {
  test('page contains placeholder work in progress text', async () => {
    // Arrange
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace projectId="08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56" />
      </MockThemeProvider>,
    );
    // Act
    const text = await findByText(/work in progress/i);
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
  });

  test('get project details returns successfully', async () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace projectId="08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56" />
      </MockThemeProvider>,
    );
    // Act
    const text = await waitFor(() => getByText('Join Team, Become Fan'));
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
  });
});
