export const createUrlString = (
  name: string,
  value: string,
  searchParams: URLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

interface Params {
  name: string;
  value: string;
}

export const createUrl = (
  collection: Params[],
  searchParams: URLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());
  
  collection.forEach(({ name, value }) => {
    params.set(name, value);
  })

  return params.toString();
};