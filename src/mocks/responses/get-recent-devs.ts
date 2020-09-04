import { ApiResponse } from '@api';
import { RecentDev } from '@api/types/recent-dev';

export const getRecentDevs: ApiResponse<RecentDev[]> = {
  ok: true,
  data: [
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      bio: 'this is my bio',
      createdAt: new Date(),
    },
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77c',
      bio: 'this is my bio',
      createdAt: new Date(),
    },
  ],
};
