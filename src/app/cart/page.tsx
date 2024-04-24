'use client';
import { useState } from 'react';
import styles from './cart.module.scss';

import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';
import CartProducts from '@/components/ForCart/CartProducts/CartProducts';
import TotalCart from '@/components/ForCart/TotalCart/TotalCart';
import { useAppSelector } from '@/hooks/reduxHooks';

export default function Cart() {
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const calculatePrice = cartProducts.reduce((acc, item) => {
    const sum =
      item.price *
      (typeof window !== 'undefined'
        ? +(localStorage.getItem(item.productId.toString()) || 1)
        : 1);
    return acc + sum;
  }, 0);
  const [totalPrice, setTotalPrice] = useState(calculatePrice);

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
