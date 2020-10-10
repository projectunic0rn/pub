import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProjectWorkspace } from '../project-workspace';
import {
  MockThemeProvider,
  signInResponse,
  signInResponseNotProjectOwner,
} from '@mocks';
import { SessionStorageHelper } from '@helpers';
import { JwtToken } from '@api';

/*
    `SessionStorageHelper.storeJwt(signInResponse.data as JwtToken);`
    defaults to user who is project owner (based on id stored in jwt
    matching the mock data being returned)

    `SessionStorageHelper.storeJwt(signInResponseNotProjectOwner.data 
    as JwtToken);` defaults to user who is project owner (based on 
    id stored in jwt not matching the mock data being returned)
*/

describe('project workspace page', () => {
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

  test('workspace and repo icons are visible and grayscale when not on project', async () => {
    // Arrange
    const { findByTestId } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/projects/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />{' '}
      </MockThemeProvider>,
    );
    // Act
    const repoIcon = await findByTestId('repo-icon');
    const workspaceIcon = await findByTestId('workspace-icon');

    // Assert
    expect(repoIcon).toBeDefined();
    expect(repoIcon).toBeInTheDocument();
    expect(repoIcon).toBeVisible();

    expect(workspaceIcon).toBeDefined();
    expect(workspaceIcon).toBeInTheDocument();
    expect(workspaceIcon).toBeVisible();

    expect(repoIcon).toHaveStyle('filter: grayscale(100%)');
    expect(workspaceIcon).toHaveStyle('filter: grayscale(100%)');
  });
  test('workspace and repo icons are visible and colored when joined project', async () => {
    // Arrange
    SessionStorageHelper.storeJwt(
      signInResponseNotProjectOwner.data as JwtToken,
    );
    const { findByText, findByTestId } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/projects/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />{' '}
      </MockThemeProvider>,
    );
    // Act
    const join = await findByText('Join Team');
    fireEvent.click(join);
    const repoIcon = await findByTestId('repo-icon');
    const workspaceIcon = await findByTestId('workspace-icon');

    // Assert
    expect(repoIcon).toBeDefined();
    expect(repoIcon).toBeInTheDocument();
    expect(repoIcon).toBeVisible();

    expect(workspaceIcon).toBeDefined();
    expect(workspaceIcon).toBeInTheDocument();
    expect(workspaceIcon).toBeVisible();

    expect(repoIcon).toHaveStyle('filter: grayscale(0%)');
    expect(workspaceIcon).toHaveStyle('filter: grayscale(0%)');
  });

  test('workspace and repo icons are visible and grayscale when leave project', async () => {
    // Arrange
    SessionStorageHelper.storeJwt(
      signInResponseNotProjectOwner.data as JwtToken,
    );
    const { findByText, findByTestId } = render(
      <MockThemeProvider>
        <ProjectWorkspace
          path="/projects/08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56"
          projectId={'08d6c5e7-618f-0a0b-f6bb-b8600e4e4c56'}
        />{' '}
      </MockThemeProvider>,
    );
    // Act
    const join = await findByText('Join Team');
    fireEvent.click(join);
    const leave = await findByText('Leave Team');
    fireEvent.click(leave);

    const repoIcon = await findByTestId('repo-icon');
    const workspaceIcon = await findByTestId('workspace-icon');

    // Assert
    expect(repoIcon).toBeDefined();
    expect(repoIcon).toBeInTheDocument();
    expect(repoIcon).toBeVisible();

    expect(workspaceIcon).toBeDefined();
    expect(workspaceIcon).toBeInTheDocument();
    expect(workspaceIcon).toBeVisible();

    expect(repoIcon).toHaveStyle('filter: grayscale(100%)');
    expect(workspaceIcon).toHaveStyle('filter: grayscale(100%)');
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
