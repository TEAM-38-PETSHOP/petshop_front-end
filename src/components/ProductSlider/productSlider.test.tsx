import { render, screen } from '@testing-library/react';
import ProductSlider from './ProductSlider';

describe('ProductSlider component', () => {
  const products = [
    {
      id: 1,
      name: 'test',
      brand: 'test',
      description: 'test',
      price: 1,
      image: 'test',
      countryProduct: 'test',
      group: 'test',
      breedSize: 'test',
      type: 'test',
      packaging: 'test',
      animals: [
        {
          id: 1,
          name: 'test',
        },
      ],
      categories: [
        {
          id: 1,
          name: 'test',
          description: 'test',
        },
      ],
    },
  ];
  test('renders product slider component', () => {
    render(<ProductSlider products={products} />);
    const sliderElement = screen.getByTestId('product-slider');
    expect(sliderElement).toBeInTheDocument();
  });

  test('renders product slider title', () => {
    render(<ProductSlider products={products} />);
    const sliderTitleElement1 = screen.getByText(/Ваші улюбленці/);
    const sliderTitleElement2 = screen.getByText(/вподобають/);
    const sliderTitleImg = screen.getByAltText('cat and dog');

    expect(sliderTitleElement1).toBeInTheDocument();
    expect(sliderTitleElement2).toBeInTheDocument();
    expect(sliderTitleImg).toBeInTheDocument();
  });

  test('renders correct number of product cards', () => {
    render(<ProductSlider products={products} />);
    const productCardElements = screen.getAllByTestId('product-card');
    expect(productCardElements.length).toBe(10);
  });

  test('renders arrow buttons for slider navigation', () => {
    render(<ProductSlider products={products} />);
    const Arrow = screen.getAllByTestId('arrow');
    expect(Arrow.length).toBe(2);
  });
});
