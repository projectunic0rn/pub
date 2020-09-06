import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProjectWorkspace } from '../project-workspace';
import { MockThemeProvider } from '@mocks';

describe('project workspace page tests', () => {
  test('page contains placeholder work in progress text', async () => {
    // Arrange
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/profile/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />{' '}
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
        <ProjectWorkspace
          path="/profile/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />{' '}
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

  test('user is prompted to save or preview changes once edit details is clicked', async () => {
    // Arrange
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/profile/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />{' '}
      </MockThemeProvider>,
    );
    // Act
    const editText = await findByText('Edit');
    fireEvent.click(editText);
    const previewText = await findByText('Preview');
    const saveChangesText = await findByText('Save Changes');
    // Assert
    expect(previewText).toBeDefined();
    expect(previewText).toBeInTheDocument();
    expect(previewText).toBeVisible();

    expect(saveChangesText).toBeDefined();
    expect(saveChangesText).toBeInTheDocument();
    expect(saveChangesText).toBeVisible();
  });

  test('user is prompted edit details once changes are saved', async () => {
    // Arrange
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/profile/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />
      </MockThemeProvider>,
    );
    // Act
    const editText = await findByText('Edit');
    fireEvent.click(editText);
    const saveChangesText = await findByText('Save Changes');
    fireEvent.click(saveChangesText);
    const rerenderedEditText = await findByText('Edit');

    // Assert
    expect(rerenderedEditText).toBeDefined();
    expect(rerenderedEditText).toBeInTheDocument();
    expect(rerenderedEditText).toBeVisible();
  });
});
