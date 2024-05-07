import { render, screen } from '@testing-library/react';
import ProductSlider from './ProductSlider';
import { renderWithProviders } from '@/utils/testRedux';

describe('ProductSlider component', () => {
  const products = [
    {
      productId: 1,
      productNameId: 'test',
      name: 'Name test',
      brand: 'test',
      description: 'test',
      price: 10,
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
          name: 'test',
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
    },
  ];
  test('renders product slider component', () => {
    renderWithProviders(<ProductSlider products={products} />);
    const sliderElement = screen.getByTestId('product-slider');
    expect(sliderElement).toBeInTheDocument();
  });

  test('renders product slider title', () => {
    renderWithProviders(<ProductSlider products={products} />);
    const sliderTitleElement1 = screen.getByText(/Ваші улюбленці/);
    const sliderTitleElement2 = screen.getByText(/вподобають/);
    const sliderTitleImg = screen.getByAltText('cat and dog');

    expect(sliderTitleElement1).toBeInTheDocument();
    expect(sliderTitleElement2).toBeInTheDocument();
    expect(sliderTitleImg).toBeInTheDocument();
  });

  test('renders correct number of product cards', () => {
    renderWithProviders(<ProductSlider products={products} />);
    const productCardElements = screen.getAllByTestId('product-card');
    expect(productCardElements.length).toBe(1);
  });

  test('renders arrow buttons for slider navigation', () => {
    renderWithProviders(<ProductSlider products={products} />);
    const Arrow = screen.getAllByTestId('arrow');
    expect(Arrow.length).toBe(2);
  });
});
