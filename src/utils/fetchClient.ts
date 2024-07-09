const BASE_URL = 'http://ec2-3-92-23-57.compute-1.amazonaws.com';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
      // Authorization:
      //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrb3ppYXR5bnNreWkyMDEzQGdtYWlsLmNvbSIsImlhdCI6MTcyMDQ2ODg0OCwiZXhwIjoxNzIwNDY5MTQ4fQ.Pwqk_m4rXugE2hH1L0T5xmY9yqfeGGaUmEwYTSR4EA8', // 'Bearer ' + localStorage.getItem('token'),
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
