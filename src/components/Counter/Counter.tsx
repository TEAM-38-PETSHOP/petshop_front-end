'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './counter.module.scss';
import { checkWindow } from '@/helpers/checkWindow';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setTotalPrice } from '@/redux/features/totalPriceSlice';
type Props = {
  productId: number;
  price: number;
  className?: string;
  forceUpdate?: any;
};

export default function Counter({
  productId,
  price,
  className,
  forceUpdate,
}: Props) {
  const totalPrice = useAppSelector((state) => state.totalPrice.totalPrice);
  const dispatch = useAppDispatch();
  const [productCount, setProductCount] = useState(1);
  const handlePlus = () => {
    if (checkWindow()) {
      setProductCount((prev) => prev + 1);
      dispatch(setTotalPrice(totalPrice + price));
      localStorage.setItem(productId.toString(), (productCount + 1).toString());
    }
  };
  const handleMinus = () => {
    if (checkWindow() && productCount > 1) {
      setProductCount((prev) => prev - 1);
      dispatch(setTotalPrice(totalPrice - price));
      localStorage.setItem(productId.toString(), (productCount - 1).toString());
    }
  };

  useEffect(() => {
    if (checkWindow()) {
      setProductCount(+(localStorage.getItem(productId.toString()) || 1));
    }
  }, [forceUpdate, productId]);

  return (
    <div className={classNames([styles.counter, className])}>
      <button onClick={handleMinus}>-</button>
      <span>{productCount}</span>
      <button onClick={handlePlus}>+</button>
    </div>
  );
}
