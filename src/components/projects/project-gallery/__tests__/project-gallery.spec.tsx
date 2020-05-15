import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ProjectGallery from '../project-gallery';
import { MockThemeProvider } from '@mocks';
import { getProjects } from '@mocks/responses/get-projects-response';

describe('project gallery tests', () => {
  test('displays all projects return from api', async () => {
    const projects = getProjects;
    const projectsCount = projects.data.length;

    // Arrange
    const { getAllByTestId } = render(
      <MockThemeProvider>
        <ProjectGallery />
      </MockThemeProvider>,
    );
    // Act
    const projectCards = await waitFor(() => getAllByTestId('project'));
    // Assert
    expect(projectCards.length).toBe(projectsCount);
  });
});
