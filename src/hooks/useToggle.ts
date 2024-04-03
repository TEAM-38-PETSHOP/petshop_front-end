import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { useAppDispatch } from './reduxHooks';

export const useToggle = (
  nameProd: string,
  products: Product[],
  setProducts: ActionCreatorWithPayload<any>,
  carrProduct: Product
): [boolean, () => void] => {
  const dispatch = useAppDispatch();
  const isSelected = products
    ? products.some((prod) => prod.id === carrProduct.id)
    : false;

  const toggler = () => {
    if (products) {
      const updatedProducts = isSelected
        ? products.filter((prod) => prod.id !== carrProduct.id)
        : [...products, carrProduct];

      dispatch(setProducts(updatedProducts));
      if (typeof window !== 'undefined') {
        localStorage.setItem(nameProd, JSON.stringify(updatedProducts));
      }
    }
  };

  return [isSelected, toggler];
};
