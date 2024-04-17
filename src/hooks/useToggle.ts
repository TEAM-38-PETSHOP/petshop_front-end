import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { useAppDispatch } from './reduxHooks';
import { useEffect, useState } from 'react';

export const useToggle = (
  nameProd: string,
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
      if (typeof window !== 'undefined') {
        localStorage.setItem(nameProd, JSON.stringify(updatedProducts));
      }
    }
  };

  return [isSelected, toggler];
};
