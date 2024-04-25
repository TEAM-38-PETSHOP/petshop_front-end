import React from 'react';
import { render } from '@testing-library/react';
import TotalCart from './TotalCart';

describe('TotalCart component', () => {
  test('renders total price correctly', () => {
    const { getByText } = render(<TotalCart totalPrice={1000} />);
    const totalPriceElement = getByText(/Загальна сума/i);
    const totalPrice = getByText(/1,000.00 грн/i);
    expect(totalPriceElement).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
  });

  test('renders buttons with correct text', () => {
    const { getByText } = render(<TotalCart totalPrice={1000} />);
    const orderBtn = getByText('Оформити замовлення');
    const continueBtn = getByText('Продовжити покупки');
    expect(orderBtn).toBeInTheDocument();
    expect(continueBtn).toBeInTheDocument();
  });

  test('renders buttons with correct links', () => {
    const { getByText } = render(<TotalCart totalPrice={1000} />);
    const continueBtn = getByText('Продовжити покупки');
    expect(continueBtn).toHaveAttribute('href', '/catalog');
  });
});
