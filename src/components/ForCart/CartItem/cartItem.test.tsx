import React from 'react';
import { fireEvent, getAllByTestId } from '@testing-library/react';
import CartItem from './CartItem';
import { renderWithProviders } from '@/utils/testRedux';

const product = {
  productId: 1,
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
  animals: [
    {
      animalId: 1,
      name: 'test',
    },
  ],
  categories: [
    {
      categoryId: 1,
      name: 'Category test',
      description: 'test',
    },
  ],
};

describe('CartItem component', () => {
  test('displays product details correctly', () => {
    const setTotalPriceMock = jest.fn();
    const { getByText, getByAltText } = renderWithProviders(
      <CartItem
        product={product}
        setTotalPrice={setTotalPriceMock}
      />
    );
    const category = getByText(/Category test/i);
    const description = getByText(/Name test | Packaging test/i);
    const price = getByText(/100.00 грн/i);
    const image = getByAltText(/Product cart/i);
    expect(category).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('calls setTotalPrice when clicking plus and minus buttons', () => {
    const setTotalPriceMock = jest.fn();
    const { getByText } = renderWithProviders(
      <CartItem
        product={product}
        setTotalPrice={setTotalPriceMock}
      />
    );
    const plusButton = getByText('+');
    const minusButton = getByText('-');
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(minusButton);
    expect(setTotalPriceMock).toHaveBeenCalledTimes(3);
  });

  test('calls handleDeleteItem when clicking delete button', () => {
    const setTotalPriceMock = jest.fn();
    const { getAllByTestId } = renderWithProviders(
      <CartItem
        product={product}
        setTotalPrice={setTotalPriceMock}
      />
    );
    const deleteButton = getAllByTestId('icon-for-cards')[1];
    fireEvent.click(deleteButton);
    expect(setTotalPriceMock).toHaveBeenCalled();
  });
});
