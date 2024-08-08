import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { useAppDispatch } from './reduxHooks';
import { useEffect, useState } from 'react';
import {
  addCartProductAsync,
  CartState,
  removeCartProductAsync,
} from '@/redux/features/cartSlice';
import {
  addFavoriteProductAsync,
  FavoriteState,
  removeFavoriteProductAsync,
} from '@/redux/features/favoriteSlice';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/types/CustomSession';

type CartProduct = CartState['cartProducts'];
type FavoriteProduct = FavoriteState['favoriteProducts'];

export const useToggle = (
  type: 'cart' | 'favorite',
  products: CartProduct | FavoriteProduct,
  addProduct: ActionCreatorWithPayload<any>,
  removeProduct: ActionCreatorWithPayload<number>,
  carrProduct: Product
): [boolean, () => void] => {
  const { data: session } = useSession();
  const customSession = session as unknown as CustomSession;
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(
      products.some((prod) => prod.product.productId === carrProduct.productId)
    );
  }, [carrProduct.productId, products]);

  const handleDelete = async () => {
    if (!customSession) {
      dispatch(removeProduct(carrProduct.productId));
    }

    if (customSession) {
      if (type === 'cart') {
        dispatch(
          removeCartProductAsync({
            productId: carrProduct.productId,
            accessToken: customSession.accessToken,
          })
        );
      } else {
        dispatch(
          removeFavoriteProductAsync({
            productId: carrProduct.productId,
            accessToken: customSession.accessToken,
          })
        );
      }
    }
  };

  const handleAdd = async () => {
    if (!customSession) {
      if (type === 'cart') {
        dispatch(
          addProduct({ product: carrProduct, quantity: 1, cartItemId: null })
        );
      } else {
        dispatch(addProduct({ product: carrProduct, wishItemId: null }));
      }
    }

    if (customSession) {
      if (type === 'cart') {
        dispatch(
          addCartProductAsync({
            product: { product: carrProduct, quantity: 1, cartItemId: null },
            accessToken: customSession.accessToken,
          })
        );
      } else {
        dispatch(
          addFavoriteProductAsync({
            product: { product: carrProduct, wishItemId: null },
            accessToken: customSession.accessToken,
          })
        );
      }
    }
  };

  const toggler = () => {
    isSelected ? handleDelete() : handleAdd();
  };

  return [isSelected, toggler];
};
