import { Product } from "@/types/Product";
import { client } from "../utils/fetchClient";
import { defineSearchParamsForRequest } from "./defineSearchParamsForRequest";
import { FilterByForRequest } from "@/types/FilterByForRequest";
import { TotalAmountForRequest } from "@/types/TotalAmountForRequest";

const slidesCount = 13;

export const getProducts = (
  filters: FilterByForRequest,
  desc: boolean = false
) => {
  const searchParams = defineSearchParamsForRequest(filters, desc);

  return client.get<Product[]>(
    `/api/products${searchParams}`
  );
};

export const getProductsCount = () => {
  return client.get<TotalAmountForRequest>(`/api/products/count`);
};

export const getProductsForSlider = () => {
  return client.get<Product[]>(`/api/products/random?count=${slidesCount}`);
};

export const getProductById = (id: string) => {
  return client.get<Product>(`/api/products/${id}`);
};

export const getFilteredProducts = (
  filters: FilterByForRequest,
  desc: boolean = false
) => {
  const searchParams = defineSearchParamsForRequest(filters, desc);
  
  return client.get<Product[]>(`/api/products/search${searchParams}`);
};

export const getFilteredProductsPages = (filters: FilterByForRequest) => {
  const searchParams = defineSearchParamsForRequest(filters);

  return client.get<TotalAmountForRequest>(
    `/api/products/search/count${searchParams}`
  );
};

// /api/products/search?brand=Dog Muzzle,Liker
// /api/products/search/name?parameter=Мячик
// Можна виконувати пошук по неповній назві
export const getProductsByName = (
  filters: FilterByForRequest,
  desc: boolean = false
) => {
  const searchParams = defineSearchParamsForRequest(filters, desc);
  console.log(`/api/products/search/name${searchParams}`);
  
  return client.get<Product[]>(
    `/api/products/search/name${searchParams}`
  );
};

// Можна виконувати пошук по неповній назві
export const getProductsByBrand = (
  filters: FilterByForRequest,
  desc: boolean = false
) => {
  const searchParams = defineSearchParamsForRequest(filters, desc);

  return client.get<Product[]>(
    `/api/products/search/brand${searchParams}`
  );
};

export const getProductsByCategoryId = (
  filters: FilterByForRequest,
  desc: boolean = false
) => {
  const { categoryId } = filters;
  const searchParams = defineSearchParamsForRequest(filters, desc);

  return client.get<Product[]>(
    `/api/products/categories/${categoryId}${searchParams}`
  );
};

export const getProductsByAnimalId = (
  filters: FilterByForRequest,
  desc: boolean = false
) => {
  const { animalId } = filters;
  const searchParams = defineSearchParamsForRequest(filters, desc);

  return client.get<Product[]>(
    `/api/products/animals/${animalId}${searchParams}`
  );
};

export const getProductsByAnimalIdCount = (animalId: number) => {
  return client.get<TotalAmountForRequest>(
    `/api/products/animals/${animalId}/count`
  );
};

export const getProductsByAnimalAndCategoryId = (
  filters: FilterByForRequest,
  desc: boolean = false
) => {
  const { animalId, categoryId } = filters;
  const searchParams = defineSearchParamsForRequest(filters, desc);

  return client.get<Product[]>(
    `/api/products/animal/${animalId}/category/${categoryId}${searchParams}`
  );
};
