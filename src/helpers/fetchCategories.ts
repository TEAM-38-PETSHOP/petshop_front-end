import { client } from '../utils/fetchClient';
import { Category } from '@/types/Category';

export const getAllCategories = () => {
  // Отримуємо усі категорії
  return client.get<Category[]>(`/api/categories`);
};
