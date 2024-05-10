'use client';
import { useEffect, useState } from 'react';
import styles from './cart.module.scss';

import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';
import CartProducts from '@/components/ForCart/CartProducts/CartProducts';
import TotalCart from '@/components/ForCart/TotalCart/TotalCart';
import { useAppSelector } from '@/hooks/reduxHooks';
import { checkWindow } from '@/helpers/checkWindow';

export default function Cart() {
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cartProducts.reduce((acc, item) => {
      const quantity = checkWindow()
        ? +(localStorage.getItem(item.productId.toString()) || 1)
        : 1;

      const sum = item.price * quantity;

      return acc + sum;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [cartProducts]);

  return (
    <>
      <HeaderForPages centralBlock={{ text: 'Корзина' }} />

      <section className={styles.cart}>
        <CartProducts setTotalPrice={setTotalPrice} />
        <hr className={styles.cart__hr} />
        <TotalCart totalPrice={totalPrice} />
      </section>
    </>
  );
}
