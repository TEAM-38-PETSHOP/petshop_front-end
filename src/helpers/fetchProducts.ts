import { Product } from '@/types/Product';
import { client } from '../utils/fetchClient';

const slidesCount = 13;

// api/products?page=0&size=5

export const getProducts = (page: number = 0, size: number = 20, sort: string = '') => {
  return client.get<Product[]>(`/api/products?page=${page}&size=${size}&sort=${sort}`);
};

export const getProductsForSlider = () => {
  return client.get<Product[]>(`/api/products/random?count=${slidesCount}`);
};

export const getProductById = (id: number) => {
  return client.get<Product>(`/api/products/${id}`);
}

// If you need reverse order use DESC at the end
// Пошук виконується лише оп повній назві
export const getProductsBySearch = (name: string = '', brand: string = '', price: string = '', group: string = '', type: string = '', breedSize: string = '', packaging: string = '', countryProduct: string = '', sort: string = '', page: number = 0, size: number = 20) => {
  // розібратись із цим
  // тут може приходити різна кількість параметрів
  // усі можливі: name, brand, price, group, type, breedSize, packaging, countryProduct
  return client.get<Product[]>(`/api/products/search?name=${name}&brand=${brand}&price=${price}&group=${group}&type=${type}&breedSize=${breedSize}&packaging=${packaging}&countryProduct=${countryProduct}&page=${page}&size=${size}&sort=${sort}`);
}

// /api/products/search?brand=Dog Muzzle,Liker
// /api/products/search/name?parameter=Мячик
// Можна виконувати пошук по неповній назві
export const getProductsByName = (name: string, sort: string = '', page: number = 0, size: number = 20) => {
  return client.get<Product[]>(`/api/products/search/name?parameter=${name}&page=${page}&size=${size}&sort=${sort}`);
}

// Можна виконувати пошук по неповній назві
export const getProductsByBrand = (brand: string, sort: string = '', page: number = 0, size: number = 20) => {
  return client.get<Product[]>(`/api/products/search/brand?parameter=${brand}&page=${page}&size=${size}&sort=${sort}`);
}

export const getProductsByCategoryId = (categoryId: number, sort: string = '', page: number = 0, size: number = 20) => {
  return client.get<Product[]>(`/api/products/categories/${categoryId}?page=${page}&size=${size}&sort=${sort}`);
}

export const getProductsByAnimalId = (animalId: number, sort: string = '', page: number = 0, size: number = 20) => {
  return client.get<Product[]>(`/api/products/animals/${animalId}?page=${page}&size=${size}&sort=${sort}`);
}

export const getProductsByAnimalAndCategoryId = (animalId: number, categoryId: number, sort: string = '', page: number = 0, size: number = 20) => {
  return client.get<Product[]>(`/api/products/animal/${animalId}/category/${categoryId}?page=${page}&size=${size}&sort=${sort}`);
}
