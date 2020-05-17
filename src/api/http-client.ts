import { SessionStorageHelper } from '@helpers';
import { ErrorResponse, ApiResponse } from './types';

export class HttpClient {
  public static async makeRequest(request: Request): Promise<unknown> {
    const response = await fetch(request);

    if (!response.ok && response.type) {
      const status = response.status;
      switch (status) {
        case 401:
          // handle unauthorized response
          SessionStorageHelper.deleteJwt();
          throw new Error('Your session expired, please sign in again.');
        default:
          // handle non 2xx response by parsing
          // and returning api message
          const text = await response.text();
          const message = HttpClient.tryParseErrorMessage(text)
            ? (JSON.parse(text) as ApiResponse<ErrorResponse>).data.message
            : 'Something unexpected happened on our end please try again.';
          throw new Error(message);
      }
    }

    const text = await response.text();

    return text ? JSON.parse(text) : {};
  }

  public static async get(endpoint: string, headers = {}): Promise<unknown> {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'GET',
      mode: 'cors',
    });

    return await HttpClient.makeRequest(request);
  }

  public static async post(
    endpoint: string,
    headers = {},
    body: object = {},
  ): Promise<unknown> {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
      mode: 'cors',
    });

    return await HttpClient.makeRequest(request);
  }

  public static async put(
    endpoint: string,
    headers = {},
    body: object = {},
  ): Promise<unknown> {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
      mode: 'cors',
    });

    return await HttpClient.makeRequest(request);
  }

  public static async delete(endpoint: string, headers = {}): Promise<unknown> {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'DELETE',
      mode: 'cors',
    });

    return await HttpClient.makeRequest(request);
  }

  private static tryParseErrorMessage(text: string): boolean {
    let result = true;
    try {
      (JSON.parse(text) as ApiResponse<ErrorResponse>).data.message;
    } catch {
      result = false;
    }
    return result;
  }
}
