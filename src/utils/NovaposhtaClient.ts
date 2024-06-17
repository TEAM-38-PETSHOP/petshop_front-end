import { ApiResponse } from '@/types/novaposhta/ApiResponse';

const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

export function novaposhtaRequest<T>(
  modelName: string,
  calledMethod: string,
  methodProperties: any
): Promise<T> {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: 'dc1aef7605333b1583c3de0d4a62f8a1',
      modelName,
      calledMethod,
      methodProperties,
    }),
  };

  return fetch(BASE_URL, options)
    .then((response) => response.json() as Promise<ApiResponse<T>>)
    .then((res) => {
      if (!res.success) {
        throw new Error(res.errorCodes[0]);
      }
      return res.data[0];
    });
}
