import { Product } from '@/types/Product';
import { client } from '../utils/fetchClient';

const slidesCount = 13;

export const getProducts = () => {
  return client.get<Product[]>(`/api/products`);
};

export const getProductsForSlider = () => {
  return client.get<Product[]>(`/api/products/random?count=${slidesCount}`);
};
export const getProductById = (id: string) => {
  return client.get<Product>(`/api/products/${id}`);
};
