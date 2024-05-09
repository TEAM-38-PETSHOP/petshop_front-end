import React from 'react';
import { render } from '@testing-library/react';
import ToggleList from './ToggleList';
import styles from './toggleList.module.scss';

const product = {
  productId: 1,
  productNameId: 'test',
  name: 'Name test',
  brand: 'brand test',
  description: 'description test',
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
};
describe('ToggleList component', () => {
  test('renders ToggleList component without crashing', () => {
    render(
      <ToggleList
        searchParams={{ activeTab: '1' }}
        product={product}
      />
    );
  });

  test('sets the activeTab correctly', () => {
    const { getByText } = render(
      <ToggleList
        searchParams={{ activeTab: '2' }}
        product={product}
      />
    );
    expect(getByText('02')).toBeInTheDocument();
  });

  test('renders list items based on product information', () => {
    const { getByText, queryByText } = render(
      <ToggleList
        searchParams={{ activeTab: '1' }}
        product={product}
      />
    );
    expect(getByText('brand test')).toBeInTheDocument();
    expect(queryByText('description test')).toBeNull();
  });

  test('applies correct classNames based on the activeTab', () => {
    const { getByTestId } = render(
      <ToggleList
        searchParams={{ activeTab: '2' }}
        product={product}
      />
    );
    const btnElement = getByTestId('btn-2');
    expect(btnElement).toHaveClass(styles.btnsList__btnActive);
  });
});
