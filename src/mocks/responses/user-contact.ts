import { ApiResponse, UserContact } from '@api';

export const userContact: ApiResponse<UserContact> = {
  ok: true,
  data: {
    email: 'roy@email.com',
  },
};
