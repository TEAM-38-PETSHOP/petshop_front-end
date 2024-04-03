import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for expect().toBeInTheDocument()
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const product = {
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
  };

  it('renders product card correctly', () => {
    const { getByTestId, getByText } = render(
      <ProductCard product={product} />
    );
    expect(getByTestId('product-card')).toBeInTheDocument();
    expect(getByText('Category')).toBeInTheDocument();
    expect(getByText('Product Name, Packaging')).toBeInTheDocument();
    expect(getByText('$10.99')).toBeInTheDocument();
  });

  it('toggles favorite on button click', () => {
    const { getByTestId } = render(<ProductCard product={product} />);
    const favoriteButton = getByTestId('favorite-button');

    fireEvent.click(favoriteButton);
    expect(favoriteButton).toHaveClass('productCard__favoriteActive');

    fireEvent.click(favoriteButton);
    expect(favoriteButton).not.toHaveClass('productCard__favoriteActive');
  });

  it('toggles cart on button click', () => {
    const { getByTestId } = render(<ProductCard product={product} />);
    const cartButton = getByTestId('cart-button');

    fireEvent.click(cartButton);
    expect(cartButton).toHaveTextContent('В кошику');

    fireEvent.click(cartButton);
    expect(cartButton).toHaveTextContent('Купити');
  });
});
