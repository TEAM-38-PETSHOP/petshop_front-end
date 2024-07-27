import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { useAppDispatch } from './reduxHooks';
import { useEffect, useState } from 'react';
import { CartState } from '@/redux/features/cartSlice';
import { FavoriteState } from '@/redux/features/favoriteSlice';

export const useToggle = (
  type: 'cart' | 'favorite',
  products: CartState['cartProducts'] | FavoriteState['favoriteProducts'],
  addProduct: ActionCreatorWithPayload<any>,
  removeProduct: ActionCreatorWithPayload<number>,
  carrProduct: Product
): [boolean, () => void] => {
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(
      products.some((prod) => prod.product.productId === carrProduct.productId)
    );
  }, [carrProduct.productId, products]);

  const toggler = () => {
    if (products) {
      isSelected
        ? dispatch(removeProduct(carrProduct.productId))
        : dispatch(
            addProduct(
              type === 'cart'
                ? { product: carrProduct, quantity: 1, cartItemId: null }
                : { product: carrProduct, wishItemId: null }
            )
          );
    }
  };

  return [isSelected, toggler];
};
