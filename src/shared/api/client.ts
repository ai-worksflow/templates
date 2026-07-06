export interface ApiClientOptions {
  baseUrl: string;
  tenantId?: string;
}

export function createApiClient(options: ApiClientOptions) {
  return {
    async get<T>(path: string): Promise<T> {
      const response = await fetch(`${options.baseUrl}${path}`, {
        headers: {
          Accept: "application/json",
          ...(options.tenantId ? { "X-Tenant-Id": options.tenantId } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json() as Promise<T>;
    },
  };
}
