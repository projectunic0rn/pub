import { ApiResponse } from '@api';
import { RecentDev } from '@api/types/recent-dev';

const today = new Date();
const oneDayAgo = new Date(today);
const twoDaysAgo = new Date(today);
const oneMonthAgo = new Date(today);
const twoMonthsAgo = new Date(today);

oneDayAgo.setDate(oneDayAgo.getDate() - 1);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
oneMonthAgo.setDate(oneMonthAgo.getDate() - 1);
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

export const getRecentDevs: ApiResponse<RecentDev[]> = {
  ok: true,
  data: [
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77b',
      bio:
        "Hi. I'm Dan. I've been working as a programmer for ~15 years now. Python, ML, NLP, server-side...",
      updatedAt: today,
    },
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77c',
      bio:
        "Hi. I'm Dan. I've been working as a programmer for ~15 years now. Python, ML, NLP, server-side...",
      updatedAt: oneDayAgo,
    },
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77d',
      bio:
        "Hi. I'm Dan. I've been working as a programmer for ~15 years now. Python, ML, NLP, server-side...",
      updatedAt: twoDaysAgo,
    },
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77e',
      bio:
        "Hi. I'm Dan. I've been working as a programmer for ~15 years now. Python, ML, NLP, server-side...",
      updatedAt: oneMonthAgo,
    },
    {
      id: '08d6c5e7-6100-c770-61c3-834f6474a77f',
      bio:
        "Hi. I'm Dan. I've been working as a programmer for ~15 years now. Python, ML, NLP, server-side...",
      updatedAt: twoMonthsAgo,
    },
  ],
};
