import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { useAppDispatch } from './reduxHooks';
import { useEffect, useState } from 'react';
import { checkWindow } from '@/helpers/checkWindow';

export const useToggle = (
  nameProd: 'favorite' | 'cart',
  products: Product[],
  setProducts: ActionCreatorWithPayload<any>,
  carrProduct: Product
): [boolean, () => void] => {
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(
      products.some((prod) => prod.productId === carrProduct.productId)
    );
  }, [carrProduct.productId, products]);

  const toggler = () => {
    if (products) {
      const updatedProducts = isSelected
        ? products.filter((prod) => prod.productId !== carrProduct.productId)
        : [...products, carrProduct];

      dispatch(setProducts(updatedProducts));
      if (checkWindow()) {
        localStorage.setItem(nameProd, JSON.stringify(updatedProducts));
        isSelected && localStorage.removeItem(carrProduct.productId.toString());
      }
    }
  };

  return [isSelected, toggler];
};
