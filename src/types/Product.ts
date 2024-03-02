export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  animals: Animal[];
  categories: Category[];
}

interface Animal {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}
