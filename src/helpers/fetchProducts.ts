import { Product } from '@/types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>(`/api/products`);
};

export const getProductsForSlider = () => {
  return client.get<Product[]>(`/api/products`);
};