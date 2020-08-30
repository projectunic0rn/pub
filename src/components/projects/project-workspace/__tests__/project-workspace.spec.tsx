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
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace projectId="08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56" />
      </MockThemeProvider>,
    );
    // Act
    const joinButton = await findByText('Join Team');
    const fanButton = await findByText('Become Fan');
    // Assert
    expect(joinButton).toBeDefined();
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toBeVisible();

    expect(fanButton).toBeDefined();
    expect(fanButton).toBeInTheDocument();
    expect(fanButton).toBeVisible();
  });
});
