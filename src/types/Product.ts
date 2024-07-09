export interface Product {
  productId: number;
  name: string;
  productNameId: string;
  brand: string;
  price: number;
  imageUrls: string[];
  countryProduct: string;
  groupProduct: string;
  breedSize: string;
  type: string;
  packaging: string;
  productSize: string;
  description: string;
  composition: string;
  compositionAnalysis: string;
  compositionEnergyValue: string;
  compositionExpiration: string;
  instruction: string;
  instructionWhyBuy: string;
  entryDate: string;
  animals: Animal[];
  categories: Category[];
}

export interface Animal {
  animalId: number;
  name: string;
  animalNameId: string;
}

export interface Category {
  categoryId: number;
  name: string;
  categoryNameId: string;
  description: string;
}
