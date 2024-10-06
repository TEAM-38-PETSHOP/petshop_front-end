import { ApiResponse } from '@/types/novaposhta/ApiResponse';

const BASE_URL = process.env.NEXT_PUBLIC_NOVAPOSHTA_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_NOVAPOSHTA_API_KEY!;

export function novaposhtaRequest<T>(
  modelName: string,
  calledMethod: string,
  methodProperties: any,
  returnByIndex?: boolean
): Promise<T | T[]> {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: API_KEY,
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
      return returnByIndex ? res.data[0] : res.data;
    });
}
