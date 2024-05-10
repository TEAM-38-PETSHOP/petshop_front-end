import { FilterByForRequest } from "@/types/FilterByForRequest";

export function defineSearchParamsForRequest(
  filters: FilterByForRequest,
  desc: boolean = false
) {
  const { sort, size } = filters;
  const filtersArray = Object.entries(filters).filter(
    ([, value]) => value
  );

  let searchParams = filtersArray
    .map(([key, value], i) => {
      if (key === 'from' || key === 'to') {
        return i === 0 ? `?price.${key}=${value}` : `&price.${key}=${value}`
      } else if (key === 'sort' || key === 'size') {
        return;
      } else if (key === 'brand' || key === 'name') {
        return i === 0 ? `?parameter=${value}` : `&parameter=${value}`
      }

      return i === 0 ? `?${key}=${value}` : `&${key}=${value}`
    })
    .join("");

  if (size) searchParams += searchParams ? `&size=${size}` : `?size=${size}`;
  if (sort) searchParams += searchParams ? `&sort=${sort}` : `?sort=${sort}`;
  if (desc) searchParams += ",DESC";

  return searchParams;
}
