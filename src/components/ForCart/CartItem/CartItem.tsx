'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/Product';
import styles from './cartItem.module.scss';
import favorite from '@@/images/icons/like.svg';
import deleteIcon from '@@/images/icons/delete.svg';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '@/redux/features/favoriteSlice';
import { addCartProduct, removeCartProduct } from '@/redux/features/cartSlice';
import { useToggle } from '@/hooks/useToggle';
import IconForCards from '@/components/IconForCards/IconForCards';
import { numberToCurrency } from '@/helpers/numberToCurrency';
import Counter from '@/components/Counter/Counter';
import { checkWindow } from '@/helpers/checkWindow';
import LimitedText from '@/components/LimitedText/LimitedText';
import { setTotalPrice } from '@/redux/features/totalPriceSlice';

type Props = {
  product: Product;
};
export default function CartItem({ product }: Props) {
  const totalPrice = useAppSelector((state) => state.totalPrice.totalPrice);
  const dispatch = useAppDispatch();

  const favoriteProducts = useAppSelector(
    (state) => state.favorite.favoriteProducts
  );
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const [isFavorite, toggleFavorite] = useToggle(
    'favorite',
    favoriteProducts,
    addFavoriteProduct,
    removeFavoriteProduct,
    product
  );
  const [, toggleCart] = useToggle(
    'cart',
    cartProducts,
    addCartProduct,
    removeCartProduct,
    product
  );

  const handleDeleteItem = () => {
    const productCount =
      cartProducts.find((item) => item.product.productId === product.productId)
        ?.quantity || 1;

    dispatch(setTotalPrice(totalPrice - product.price * productCount));

    toggleCart();
  };

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorite();
  };

  return (
    <div className={styles.cartItem}>
      <Link
        href={`/catalog/product/${product.productId}?${product.productNameId}`}
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
        <LimitedText
          className={styles.cartItem__description}
          text={`${product.name} | ${product.packaging}`}
          maxLength={195}
          maxLengthMobile={40}
        />
        <p className={styles.cartItem__price}>
          {numberToCurrency(product.price)}
        </p>
        <div className={styles.cartItem__choice}>
          <Counter
            className={styles.cartItem__counter}
            productId={product.productId}
            price={product.price}
          />
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
