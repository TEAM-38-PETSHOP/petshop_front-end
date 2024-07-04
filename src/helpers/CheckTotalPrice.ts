import { checkWindow } from './checkWindow';

export const CheckTotalPrice = () => {
  const cartProducts =
    checkWindow() && JSON.parse(localStorage.getItem('cart') || '[]');

  const newTotalPrice = cartProducts.reduce((acc, item) => {
    const quantity = checkWindow()
      ? +(localStorage.getItem(item.productId.toString()) || 1)
      : 1;

    const sum = item.price * quantity;

    return acc + sum;
  }, 0);

  return newTotalPrice;
};
