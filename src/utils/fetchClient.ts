import { IErrorResponse } from '@/types/IErrorResponse ';

const BASE_URL = 'http://ec2-52-55-217-94.compute-1.amazonaws.com';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  token: string | null = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
  }

  options.headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(BASE_URL + url, options);
  const jsonResponse = method === 'DELETE' ? '' : await response.json();

  if (!response.ok) {
    const error: IErrorResponse = jsonResponse;
    throw new Error(error.message || 'An error occurred');
  }

  return jsonResponse;
}

export const client = {
  get: <T>(url: string, token: string | null = null) =>
    request<T>(url, 'GET', null, token),
  post: <T>(url: string, data: any, token: string | null = null) =>
    request<T>(url, 'POST', data, token),
  patch: <T>(url: string, data: any, token: string | null = null) =>
    request<T>(url, 'PATCH', data, token),
  delete: (url: string, token: string | null = null) =>
    request(url, 'DELETE', null, token),
};
