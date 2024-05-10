import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ProductIntro from './ProductIntro';
import { renderWithProviders } from '@/utils/testRedux';

const mockProduct = {
  productId: 1,
  productNameId: 'test',
  name: 'Name test',
  brand: 'test',
  description: 'test',
  price: 100,
  imageUrls: [
    'https://petshops3.s3.amazonaws.com/Flexi_New%20Classic%20L%20%E2%80%94%20%D0%BF%D0%BE%D0%B2%D1%96%D0%B4%D0%B5%D1%86%D1%8C-%D1%80%D1%83%D0%BB%D0%B5%D1%82%D0%BA%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%BE%D0%B1%D0%B0%D0%BA_9605074.jpg',
  ],
  countryProduct: 'test',
  groupProduct: 'test',
  breedSize: 'test',
  type: 'test',
  packaging: 'Packaging test',
  entryDate: 'test',
  productSize: '',
  composition: '',
  compositionAnalysis: '',
  compositionEnergyValue: '',
  compositionExpiration: '',
  instruction: '',
  instructionWhyBuy: '',
  animals: [
    {
      animalId: 1,
      animalNameId: 'test',
      name: 'Animal test',
    },
  ],
  categories: [
    {
      categoryId: 1,
      name: 'Category test',
      categoryNameId: 'test',
      description: 'test',
    },
  ],
};

describe('ProductIntro component', () => {
  test('renders product information correctly', () => {
    renderWithProviders(<ProductIntro product={mockProduct} />);

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Name test/i)).toBeInTheDocument();
    expect(screen.getByText(/Category test/i)).toBeInTheDocument();
    expect(screen.getByText(/Animal test/i)).toBeInTheDocument();
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();
  });
});
