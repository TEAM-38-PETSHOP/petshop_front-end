import React from 'react';
import CartProducts from './CartProducts';
import { renderWithProviders } from '@/utils/testRedux';

describe('CartProducts component', () => {
  test('displays empty cart message when there are no products', () => {
    const setTotalPriceMock = jest.fn();
    const { getByText } = renderWithProviders(
      <CartProducts setTotalPrice={setTotalPriceMock} />
    );
    const emptyCartMessage = getByText(/У вас поки немає товарів в кошику/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });
});
