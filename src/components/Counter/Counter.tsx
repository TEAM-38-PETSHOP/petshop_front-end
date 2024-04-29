'use client';

import { useState } from 'react';
import classNames from 'classnames';
import styles from './counter.module.scss';
import { checkWindow } from '@/helpers/checkWindow';
type Props = {
  productId: number;
  price: number;
  setTotalPrice?: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

export default function Counter({
  productId,
  price,
  setTotalPrice,
  className,
}: Props) {
  const [productCount, setProductCount] = useState(
    checkWindow() ? +(localStorage.getItem(productId.toString()) || 1) : 1
  );
  const handlePlus = () => {
    if (checkWindow()) {
      setProductCount((prev) => prev + 1);
      setTotalPrice && setTotalPrice((prev) => prev + price);
      localStorage.setItem(productId.toString(), (productCount + 1).toString());
    }
  };
  const handleMinus = () => {
    if (checkWindow() && productCount > 1) {
      setProductCount((prev) => prev - 1);
      setTotalPrice && setTotalPrice((prev) => prev - price);
      localStorage.setItem(productId.toString(), (productCount - 1).toString());
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
