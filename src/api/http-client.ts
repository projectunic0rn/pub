export class HttpClient {
  public static async makeRequest(request: Request): Promise<unknown> {
    const response = await fetch(request);

    // TODO: If 401 - sign out user with
    // message that session has expired.
    if (!response.ok && response.type) {
      throw new Error(response.statusText);
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
}
