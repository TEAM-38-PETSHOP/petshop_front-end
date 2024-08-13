import { CartState } from '@/redux/features/cartSlice';
import { checkWindow } from './checkWindow';

export const checkTotalPrice = () => {
  const cartProducts: CartState['cartProducts'] =
    checkWindow() && JSON.parse(localStorage.getItem('cart') || '[]');

  const newTotalPrice = cartProducts.reduce((acc, item) => {
    const sum = item.product.price * item.quantity;

    return acc + sum;
  }, 0);

  return newTotalPrice;
};
