import { ApiResponse } from '@api';
import { RecentDev } from '@api/types/recent-dev';

const today = new Date();
const oneDayAgo = new Date(today);

oneDayAgo.setDate(oneDayAgo.getDate() - 1);

export const getRecentDevs: ApiResponse<RecentDev[]> = {
  ok: true,
  data: [
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      bio:
        'Hi. I’m Dan. I’ve been working as a programmer for ~15 years now. Python, ML, NLP, server-side...',
      updatedAt: today,
    },
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77c',
      bio:
        'Hi. I’m Dan. I’ve been working as a programmer for ~15 years now. Python, ML, NLP, server-side...',
      updatedAt: oneDayAgo,
    },
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77d',
      bio:
        'Hi. I’m Dan. I’ve been working as a programmer for ~15 years now. Python, ML, NLP, server-side...',
      updatedAt: new Date(2020, 8, 2),
    },
  ],
};
