import React, { FC, useState, useEffect } from 'react';

import { ServiceResolver, ApiResponse, ErrorResponse } from '@api';
import { discordIcon, slackIcon } from '@images';
import { WorkspaceType } from '@api/types/workspace-type';

interface WorkspaceTypesContextState {
  workspaceLogos: { [workspaceName: string]: string };
}

const defaultWorkspaceTypesContextState: WorkspaceTypesContextState = {
  workspaceLogos: {
    slack: discordIcon,
    discord: discordIcon,
    other: '',
  },
};

export const WorkspaceTypesContext = React.createContext(
  defaultWorkspaceTypesContextState,
);

export const WorkspaceTypesConsumer = WorkspaceTypesContext.Consumer;

export const WorkspaceTypesProvider: FC = (props) => {
  const [workspaceTypesContextState, setWorkspaceTypesContextState] = useState(
    defaultWorkspaceTypesContextState,
  );

  useEffect(() => {
    const initializeWorkspaceTypesContext = async () => {
      const api = ServiceResolver.apiResolver();
      const defaultWorkspaceTypesContextState: WorkspaceTypesContextState = {
        workspaceLogos: {
          slack: slackIcon,
          discord: discordIcon,
          other: '',
        },
      };

      try {
        const response = (await api.getWorkspaceTypes()) as ApiResponse<
          WorkspaceType[] | ErrorResponse
        >;
        const workspaceTypes = response.data as WorkspaceType[];
        const workspaceDict: { [name: string]: string } = {};
        workspaceTypes.forEach((workspace) => {
          workspaceDict[workspace.name] = workspace.logoUrl;
        });
        defaultWorkspaceTypesContextState.workspaceLogos = workspaceDict;
        setWorkspaceTypesContextState(defaultWorkspaceTypesContextState);
      } catch (error) {
        // Log to centralized log server
        // workspace logos not set via api - using default logos instead
      }
    };

    initializeWorkspaceTypesContext();
  }, []);

  return (
    <WorkspaceTypesContext.Provider value={workspaceTypesContextState}>
      {props.children}
    </WorkspaceTypesContext.Provider>
  );
};
