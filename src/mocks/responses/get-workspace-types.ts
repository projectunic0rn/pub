import { ApiResponse } from '@api';
import { WorkspaceType } from '@api/types/workspace-type';

export const getWorkspaceTypes: ApiResponse<WorkspaceType[]> = {
  ok: true,
  data: [
    {
      name: 'slack',
      logoUrl: 'https://i.imgur.com/y3e8lL6.png',
    },
    {
      name: 'discord',
      logoUrl: 'https://i.imgur.com/BoARUGM.png',
    },
    {
      name: 'other',
      logoUrl: '',
    },
  ],
};
