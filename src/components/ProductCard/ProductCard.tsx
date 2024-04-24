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
import IconForCards from '../IconForCards/IconForCards';
type Props = {
  product: Product;
  className?: string;
};
export default function ProductCard({ product, className }: Props) {
  const [isMobile, setIsMobile] = useState(false);
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
    setIsMobile(window.matchMedia('(max-width: 425px)').matches);
  }, [isCart, isFavorite]);

  const productInfo =
    (product.name + product.packaging).length > (isMobile ? 35 : 80)
      ? `${product.name}, ${product.packaging}`.slice(0, isMobile ? 35 : 80) +
        '...'
      : `${product.name}, ${product.packaging}`;
  return (
    <div
      className={classNames([styles.productCard, className])}
      data-testid="product-card"
    >
      <Link
        href={`/product/${product.productId}`}
        className={styles.productCard__image}
      >
        <Image
          src={product.image}
          width={215}
          height={215}
          alt={product.name}
        />
      </Link>
      <div className={styles.productCard__info}>
        <h3 className={styles.productCard__title}>
          {product.categories[0].name}
        </h3>
        <p className={styles.productCard__description}>{productInfo}</p>
        <p className={styles.productCard__price}>
          {numberToCurrency(product.price)}
        </p>
        <Buttons
          firstBtn={{
            btnText: isCart ? 'В кошику' : 'Купити',
            btnIcon: cart.src,
            isBuy: true,
            onClick: toggleCart,
            type: 'button',
            className: styles.productCard__cart,
          }}
        />
      </div>

      <IconForCards
        isFavorite
        icon={favorite.src}
        handler={toggleFavorite}
        isActive={isFavorite}
      />
    </div>
  );
}
