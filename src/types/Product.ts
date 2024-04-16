export interface Product {
  productId: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  countryProduct: string;
  groupProduct: string;
  breedSize: string;
  type: string;
  packaging: string;
  entryDate: string;
  animals: Animal[];
  categories: Category[];
}

export interface Animal {
  animalId: number;
  name: string;
}

export interface Category {
  categoryId: number;
  name: string;
  description: string;
}
