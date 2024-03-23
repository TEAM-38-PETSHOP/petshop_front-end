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
  const isSelected = products.some((prod) => prod.id === carrProduct.id);

  const toggler = () => {
    const updatedProducts = isSelected
      ? products.filter((prod) => prod.id !== carrProduct.id)
      : [...products, carrProduct];

    dispatch(setProducts(updatedProducts));
    localStorage.setItem(nameProd, JSON.stringify(updatedProducts));
  };

  return [isSelected, toggler];
};
