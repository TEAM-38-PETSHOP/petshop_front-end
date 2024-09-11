import { IErrorResponse } from '@/types/IErrorResponse ';

const BASE_URL = "http://ec2-98-80-7-226.compute-1.amazonaws.com";

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  token: string | null = null,
  expectString: boolean = false
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
  const jsonResponse = expectString
    ? await response.text()
    : await response.json();

  if (!response.ok) {
    const error: IErrorResponse = jsonResponse;
    throw new Error(error.message || 'An error occurred');
  }

  return jsonResponse;
}

export const client = {
  get: <T>(
    url: string,
    token: string | null = null,
    expectString: boolean = false
  ) => request<T>(url, 'GET', null, token, expectString),
  post: <T>(
    url: string,
    data: any,
    token: string | null = null,
    expectString: boolean = false
  ) => request<T>(url, 'POST', data, token, expectString),
  patch: <T>(
    url: string,
    data: any,
    token: string | null = null,
    expectString: boolean = false
  ) => request<T>(url, 'PATCH', data, token, expectString),
  delete: (
    url: string,
    token: string | null = null,
    expectString: boolean = false
  ) => request(url, 'DELETE', null, token, expectString),
};
