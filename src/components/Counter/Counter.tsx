'use client';

import classNames from 'classnames';
import styles from './counter.module.scss';
import { checkWindow } from '@/helpers/checkWindow';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setTotalPrice } from '@/redux/features/totalPriceSlice';
import { updateCartQuantity } from '@/redux/features/cartSlice';
type Props = {
  productId: number;
  price: number;
  className?: string;
};

export default function Counter({ productId, price, className }: Props) {
  const totalPrice = useAppSelector((state) => state.totalPrice.totalPrice);
  const productCount = useAppSelector(
    (state) =>
      state.cart.cartProducts.find(
        (item) => item.product.productId === productId
      )?.quantity || 1
  );
  const dispatch = useAppDispatch();
  const handlePlus = () => {
    if (checkWindow()) {
      dispatch(setTotalPrice(totalPrice + price));
      dispatch(updateCartQuantity({ productId, quantity: productCount + 1 }));
    }
  };
  const handleMinus = () => {
    if (checkWindow() && productCount > 1) {
      dispatch(setTotalPrice(totalPrice - price));
      dispatch(updateCartQuantity({ productId, quantity: productCount - 1 }));
    }
  };

  return (
    <div className={classNames([styles.counter, className])}>
      <button onClick={handleMinus}>-</button>
      <span>{productCount}</span>
      <button onClick={handlePlus}>+</button>
    </div>
  );
}
