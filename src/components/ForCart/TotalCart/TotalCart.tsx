'use client';
import styles from './totalCart.module.scss';
import { numberToCurrency } from '@/helpers/numberToCurrency';
import Buttons from '@/components/Buttons/Buttons';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';

export default function TotalCart() {
  const totalPrice = useAppSelector((state) => state.totalPrice.totalPrice);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const products = useAppSelector((state) => state.cart.cartProducts);

  useEffect(() => {
    setCartProducts(products.map((product) => product.product));
  }, [products]);
  return (
    <div className={styles.totalCart}>
      <div className={styles.totalCart__title}>
        <span>Загальна сума</span> <span>{numberToCurrency(totalPrice)}</span>
      </div>
      <hr className={styles.totalCart__hr} />
      <Buttons
        className={styles.totalCart__btns}
        firstBtn={{
          btnText: 'Оформити замовлення',
          btnLink: !cartProducts.length ? '' : '/cart/checkout',
          isDisabled: !cartProducts.length,
          isBuy: true,
        }}
        secondBtn={{ btnText: 'Продовжити покупки', btnLink: '/catalog' }}
      />
    </div>
  );
}
