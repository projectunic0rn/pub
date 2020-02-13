import { ApiResponse, JwtToken } from '@api';

export const signInResponse: ApiResponse<JwtToken> = {
  ok: true,
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiaWRcIjpcIjA4ZDczZDUwLTZmZjMtNTk0ZS0xMDE0LTA1OWI5ZjZkOTMxN1wifSIsImV4cCI6MTU2OTUzNjkyMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.ecVEHUiLjw41kZa6-vbjVatd9RdiNr9QLNxRelqZyhQ',
  },
};
