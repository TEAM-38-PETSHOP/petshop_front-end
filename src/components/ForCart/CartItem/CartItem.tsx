'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/Product';
import styles from './cartItem.module.scss';
import favorite from '@@/images/icons/like.svg';
import deleteIcon from '@@/images/icons/delete.svg';

import { useAppSelector } from '@/hooks/reduxHooks';
import { setFavoriteProducts } from '@/redux/features/favoriteSlice';
import { setCartProducts } from '@/redux/features/cartSlice';
import { useToggle } from '@/hooks/useToggle';
import IconForCards from '@/components/IconForCards/IconForCards';
import { numberToCurrency } from '@/helpers/numberToCurrency';

type Props = {
  product: Product;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};
export default function CartItem({ product, setTotalPrice }: Props) {
  const favoriteProducts = useAppSelector(
    (state) => state.favorite.favoriteProducts
  );
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const [isFavorite, toggleFavorite] = useToggle(
    'favorite',
    favoriteProducts,
    setFavoriteProducts,
    product
  );
  const [, toggleCart] = useToggle(
    'cart',
    cartProducts,
    setCartProducts,
    product
  );
  const [productCount, setProductCount] = useState(
    +(localStorage.getItem(product.productId.toString()) || 1)
  );

  const handlePlus = () => {
    if (typeof window !== undefined) {
      setProductCount((prev) => prev + 1);
      setTotalPrice((prev) => prev + product.price);
      localStorage.setItem(
        product.productId.toString(),
        (productCount + 1).toString()
      );
    }
  };
  const handleMinus = () => {
    if (typeof window !== undefined && productCount > 1) {
      setProductCount((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
      localStorage.setItem(
        product.productId.toString(),
        (productCount - 1).toString()
      );
    }
  };

  const handleDeleteItem = () => {
    toggleCart();
    setTotalPrice((prev) => prev - product.price * productCount);
    if (typeof window !== undefined) {
      localStorage.removeItem(product.productId.toString());
    }
  };

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorite();
  };

  return (
    <div className={styles.cartItem}>
      <Link
        href={`/product/${product.productId}`}
        className={styles.cartItem__image}
      >
        <Image
          width={215}
          height={215}
          src={product.imageUrls[0]}
          alt="Product cart"
        />
        <IconForCards
          isFavorite
          className={styles.cartItem__favorite}
          icon={favorite.src}
          handler={handleFavorite}
          isActive={isFavorite}
        />
      </Link>
      <div className={styles.cartItem__info}>
        <h3 className={styles.cartItem__category}>
          {product.categories[0].name}
        </h3>
        <h2
          className={styles.cartItem__description}
        >{`${product.name} | ${product.packaging}`}</h2>
        <p className={styles.cartItem__price}>
          {numberToCurrency(product.price)}
        </p>
        <div className={styles.cartItem__choice}>
          <div className={styles.cartItem__counter}>
            <button onClick={handleMinus}>-</button>
            <span>{productCount}</span>
            <button onClick={handlePlus}>+</button>
          </div>
          <IconForCards
            className={styles.cartItem__delete}
            icon={deleteIcon.src}
            handler={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}