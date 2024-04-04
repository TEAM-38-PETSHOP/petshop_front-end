'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import SvgWrapper from '../SvgWrapper/SvgWrapper';
import { useToggle } from '@/hooks/useToggle';
import { useAppSelector } from '@/hooks/reduxHooks';
import { setFavoriteProducts } from '@/redux/features/favoriteSlice';
import { setCartProducts } from '@/redux/features/cartSlice';
import { numberToCurrency } from '@/helpers/numberToCurrency';

import styles from './productCard.module.scss';
import favorite from '@@/images/icons/like.svg';
import cart from '@@/images/icons/cart.svg';

import { Product } from '@/types/Product';
import Buttons from '../Buttons/Buttons';
type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  const [isCartState, setCartState] = useState(false);
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
  const [isCart, toggleCart] = useToggle(
    'cart',
    cartProducts,
    setCartProducts,
    product
  );

  useEffect(() => {
    setCartState(isCart);
  }, [isCart]);

  const productInfo =
    (product.name + product.packaging).length > 90
      ? `${product.name}, ${product.packaging}`.slice(0, 90) + '...'
      : `${product.name}, ${product.packaging}`;
  return (
    <div
      className={styles.productCard}
      data-testid="product-card"
    >
      <Link
        href={`/product/${product.id}`}
        className={styles.productCard__image}
      >
        <Image
          src={product.image}
          width={215}
          height={215}
          alt={product.name}
        />
      </Link>
      <h3 className={styles.productCard__title}>
        {product.categories[0].name}
      </h3>
      <p className={styles.productCard__description}>{productInfo}</p>
      <p className={styles.productCard__price}>
        {numberToCurrency(product.price)}
      </p>

      <Buttons
        type="button"
        firstBtn={{
          btnText: isCartState ? 'В кошику' : 'Купити',
          btnIcon: cart.src,
          isBuy: true,
          onClick: toggleCart,
          className: styles.productCard__cart,
        }}
      />

      <button
        type="button"
        data-testid="favorite-button"
        className={classNames([styles.productCard__favorite], {
          [styles.productCard__favoriteActive]: isFavorite,
        })}
        onClick={toggleFavorite}
      >
        <SvgWrapper src={favorite.src} />
      </button>
    </div>
  );
}
