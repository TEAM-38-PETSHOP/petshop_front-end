import { client } from '../utils/fetchClient';
import { Category } from '@/types/Product';

export const getAllCategories = () => {
  // Отримуємо усі категорії
  return client.get<Category[]>(`/api/categories`);
};
