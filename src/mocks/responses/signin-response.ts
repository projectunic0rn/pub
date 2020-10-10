import { ApiResponse, JwtToken } from '@api';

export const signInResponse: ApiResponse<JwtToken> = {
  ok: true,
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiaWRcIjpcIjA4ZDczZDUwLTZmZjMtNTk0ZS0xMDE0LTA1OWI5ZjZkOTMxN1wifSIsImV4cCI6MTU2OTUzNjkyMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.ecVEHUiLjw41kZa6-vbjVatd9RdiNr9QLNxRelqZyhQ',
  },
};

export const signInResponseNotProjectOwner: ApiResponse<JwtToken> = {
  ok: true,
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IkNvbW1vbi5EVE9zLkp3dFVzZXJDbGFpbXNEdG8iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiaWRcIjpcIjA4ZDgzMjlkLWEwNmMtNGNiMy04YTNkLTAyOTFlZDIxNmJiMFwifSIsImV4cCI6MTYwMjg0OTE1NiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9.za6bktGv78ZdBR8G7RNP4Yilhh7DiM_xPIKqYisR4Dw',
  },
};
