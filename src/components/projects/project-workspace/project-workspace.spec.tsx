import React from 'react';
import { render } from '@testing-library/react';
import { ProjectWorkspace } from './project-workspace';
import { MockThemeProvider } from '@mocks';

describe('project gallery tests', () => {
  test('render placeholder project workspace', async () => {
    // Arrange
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace projectId={'test-id'} />
      </MockThemeProvider>,
    );
    // Act
    const text = await findByText('Project workspace pages coming soon.');
    // Assert
    expect(text).toBeDefined();
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
  });
});
