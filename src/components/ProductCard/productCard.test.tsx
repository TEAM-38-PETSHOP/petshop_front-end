import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/utils/testRedux';
import ProductCard from './ProductCard';
import styles from './productCard.module.scss';

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Name test',
    brand: 'test',
    description: 'test',
    price: 10,
    image:
      'https://petshops3.s3.amazonaws.com/Flexi_New%20Classic%20L%20%E2%80%94%20%D0%BF%D0%BE%D0%B2%D1%96%D0%B4%D0%B5%D1%86%D1%8C-%D1%80%D1%83%D0%BB%D0%B5%D1%82%D0%BA%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%BE%D0%B1%D0%B0%D0%BA_9605074.jpg',
    countryProduct: 'test',
    group: 'test',
    breedSize: 'test',
    type: 'test',
    packaging: 'Packaging test',
    animals: [
      {
        id: 1,
        name: 'test',
      },
    ],
    categories: [
      {
        id: 1,
        name: 'Category test',
        description: 'test',
      },
    ],
  };

  it('renders product card correctly', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <ProductCard product={product} />
    );
    expect(getByTestId('product-card')).toBeInTheDocument();
    expect(getByText('Category test')).toBeInTheDocument();
    expect(getByText('Name test, Packaging test')).toBeInTheDocument();
    expect(getByText('10.00 грн')).toBeInTheDocument();
  });

  it('toggles favorite on button click', () => {
    const { getByTestId } = renderWithProviders(
      <ProductCard product={product} />
    );
    const favoriteButton = getByTestId('favorite-button');

    fireEvent.click(favoriteButton);
    expect(favoriteButton).toHaveClass(styles.productCard__favoriteActive);

    fireEvent.click(favoriteButton);
    expect(favoriteButton).not.toHaveClass(styles.productCard__favoriteActive);
  });

  it('toggles cart on button click', () => {
    const { getByText } = renderWithProviders(
      <ProductCard product={product} />
    );
    const cartButton = getByText('Купити');

    fireEvent.click(cartButton);
    expect(cartButton).toHaveTextContent('В кошику');

    fireEvent.click(cartButton);
    expect(cartButton).toHaveTextContent('Купити');
  });
});
