'use client';

import classNames from 'classnames';
import styles from './counter.module.scss';
import { checkWindow } from '@/helpers/checkWindow';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setTotalPrice } from '@/redux/features/totalPriceSlice';
import {
  updateCartQuantity,
  updateCartQuantityAsync,
} from '@/redux/features/cartSlice';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/types/CustomSession';
import { useEffect, useState } from 'react';
type Props = {
  productId: number;
  price: number;
  className?: string;
};

export default function Counter({ productId, price, className }: Props) {
  const { data: session } = useSession();
  const customSession = session as unknown as CustomSession;
  const totalPrice = useAppSelector((state) => state.totalPrice.totalPrice);
  const [productCount, setProductCount] = useState(1);
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setProductCount(
      cartProducts.find((item) => item.product.productId === productId)
        ?.quantity || 1
    );
  }, [cartProducts, productId]);
  const handlePlus = async () => {
    if (checkWindow()) {
      if (!customSession) {
        dispatch(setTotalPrice(totalPrice + price));
        dispatch(updateCartQuantity({ productId, quantity: productCount + 1 }));
      }

      if (customSession) {
        dispatch(
          updateCartQuantityAsync({
            productId,
            quantity: productCount + 1,
            accessToken: customSession.accessToken,
          })
        ).then((res) => {
          if (res.payload === 'success') {
            dispatch(setTotalPrice(totalPrice + price));
          }
        });
      }
    }
  };
  const handleMinus = () => {
    if (checkWindow() && productCount > 1) {
      if (!customSession) {
        dispatch(setTotalPrice(totalPrice - price));
        dispatch(updateCartQuantity({ productId, quantity: productCount - 1 }));
      }

      if (customSession) {
        dispatch(
          updateCartQuantityAsync({
            productId,
            quantity: productCount - 1,
            accessToken: customSession.accessToken,
          })
        ).then((res) => {
          if (res.payload === 'success') {
            dispatch(setTotalPrice(totalPrice - price));
          }
        });
      }
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
