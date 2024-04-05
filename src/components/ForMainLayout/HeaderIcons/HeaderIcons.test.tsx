import React from 'react';
import { renderWithProviders } from '@/utils/testRedux';
import HeaderIcons from './HeaderIcons';

describe('HeaderIcons component', () => {
  test('renders favorite icon', () => {
    const { getByTestId } = renderWithProviders(
      <HeaderIcons setOpenMenu={() => {}} />
    );
    const favoriteIcon = getByTestId('favorites');
    expect(favoriteIcon).toBeInTheDocument();
  });

  test('renders cart icon', () => {
    const { getByTestId } = renderWithProviders(
      <HeaderIcons setOpenMenu={() => {}} />
    );
    const cartIcon = getByTestId('cart');
    expect(cartIcon).toBeInTheDocument();
  });
});
