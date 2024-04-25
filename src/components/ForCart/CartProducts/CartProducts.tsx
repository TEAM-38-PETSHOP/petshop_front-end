'use client';

import { useEffect, useState } from 'react';
import styles from './cartProducts.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import { Product } from '@/types/Product';
import CartItem from '../CartItem/CartItem';

type Props = {
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

export default function CartProducts({ setTotalPrice }: Props) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const products = useAppSelector((state) => state.cart.cartProducts);

  useEffect(() => {
    setCartProducts(products);
  }, [products]);

  return (
    <div className={styles.cartProducts}>
      {cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <CartItem
            key={product.productId}
            product={product}
            setTotalPrice={setTotalPrice}
          />
        ))
      ) : (
        <h3 className={styles.cartProducts__empty}>
          У вас поки немає товарів в кошику
        </h3>
      )}
    </div>
  );
}
