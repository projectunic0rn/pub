import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProjectWorkspace } from '../project-workspace';
import { MockThemeProvider, signInResponse } from '@mocks';
import { SessionStorageHelper } from '@helpers';
import { JwtToken } from '@api';

describe('project workspace page tests', () => {
  test('get project details returns successfully', async () => {
    // Arrange
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/projects/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />{' '}
      </MockThemeProvider>,
    );
    // Act
    const joinButton = await findByText('Join Team');
    // Assert
    expect(joinButton).toBeDefined();
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toBeVisible();
  });

  test('project owner is prompted to save or preview changes once edit details is clicked', async () => {
    // Arrange
    SessionStorageHelper.storeJwt(signInResponse.data as JwtToken);
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/projects/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
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

    expect(saveChangesText).toBeDefined();
    expect(saveChangesText).toBeInTheDocument();
  });

  test('project owner is prompted to edit details once changes are saved', async () => {
    // Arrange
    SessionStorageHelper.storeJwt(signInResponse.data as JwtToken);
    const { findByText } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/projects/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
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
  });
});
