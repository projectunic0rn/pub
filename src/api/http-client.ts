export class HttpClient {
  public async makeRequest(request: Request): Promise<any> {
    const response = await fetch(request);

    if (!response.ok && response.type) {
      throw new Error(response.statusText);
    }

    const text = await response.text();

    return text ? JSON.parse(text) : {};
  }

  public async get(endpoint: string, headers = {}): Promise<any> {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'GET',
      mode: 'cors',
    });

    return await this.makeRequest(request);
  }

  public async post(
    endpoint: string,
    headers = {},
    body: object = {},
  ): Promise<any> {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
      mode: 'cors',
    });

    return await this.makeRequest(request);
  }

  public async put(
    endpoint: string,
    headers = {},
    body: object = {},
  ): Promise<any> {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
      mode: 'cors',
    });

    return await this.makeRequest(request);
  }

  public async delete(endpoint: string, headers = {}): Promise<any> {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'DELETE',
      mode: 'cors',
    });

    return await this.makeRequest(request);
  }
}
