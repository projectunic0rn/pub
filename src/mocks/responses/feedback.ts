import { ApiResponse, Feedback } from '@api';

export const feedback: ApiResponse<Feedback> = {
  ok: true,
  data: {
    content: "There's an issue with the navbar",
  },
};
