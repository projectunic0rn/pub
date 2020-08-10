import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ProjectsGallery } from '../projects-gallery';
import { MockThemeProvider } from '@mocks';
import { getProjects } from '@mocks/responses/get-projects-response';

describe('project gallery tests', () => {
  test('displays all projects return from api', async () => {
    const projects = getProjects;
    const projectsCount = projects.data.length;

    // Arrange
    const { getAllByTestId } = render(
      <MockThemeProvider>
        <ProjectsGallery />
      </MockThemeProvider>,
    );
    // Act
    const projectCards = await waitFor(() => getAllByTestId('project'));
    // Assert
    expect(projectCards.length).toBe(projectsCount);
  });
});
