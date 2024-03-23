export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  countryProduct: string;
  group: string;
  breedSize: string;
  type: string;
  packaging: string;
  animals: Animal[];
  categories: Category[];
}

export interface Animal {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
