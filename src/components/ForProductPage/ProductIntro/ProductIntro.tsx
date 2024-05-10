'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { Product } from '@/types/Product';
import styles from './productIntro.module.scss';
import cart from '@@/images/icons/cart.svg';
import favorite from '@@/images/icons/like.svg';

import Counter from '@/components/Counter/Counter';
import Buttons from '@/components/Buttons/Buttons';
import { numberToCurrency } from '@/helpers/numberToCurrency';

import { useAppSelector } from '@/hooks/reduxHooks';
import { useToggle } from '@/hooks/useToggle';
import { setFavoriteProducts } from '@/redux/features/favoriteSlice';
import { setCartProducts } from '@/redux/features/cartSlice';
import IconForCards from '@/components/IconForCards/IconForCards';
import { normalizeStr } from '@/helpers/normalizeStr';

type Props = {
  product: Product;
};

export default function ProductIntro({ product }: Props) {
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

  return (
    <div className={styles.productIntro}>
      <small className={styles.productIntro__id}>
        Артикул: {product.productId}
      </small>
      <h1 className={styles.productIntro__title}>{product.name}</h1>
      <ul className={styles.productIntro__categories}>
        {product.categories.map((category, index) => (
          <li key={index}>
            <Link href={`/catalog/${category.categoryNameId}`}>
              {normalizeStr(category.name)}
            </Link>
          </li>
        ))}
        {product.animals.map((animal, index) => (
          <li key={index}>
            <Link
              href={{
                pathname: '/catalog/all',
                query: { breed: animal.animalNameId },
              }}
            >
              {normalizeStr(animal.name)}
            </Link>
          </li>
        ))}
      </ul>
      <strong className={styles.productIntro__price}>
        {numberToCurrency(product.price)}
      </strong>
      <div className={styles.productIntro__btns}>
        <Buttons
          firstBtn={{
            btnText: isCart ? 'В кошику' : 'Купити',
            btnIcon: cart.src,
            isBuy: true,
            onClick: toggleCart,
            type: 'button',
            className: styles.productIntro__cart,
          }}
        />
        <Counter
          className={classNames([styles.productIntro__counter], {
            [styles.productIntro__counterDisabled]: !isCart,
          })}
          productId={product.productId}
          price={product.price}
          forceUpdate={isCart}
        />
        <IconForCards
          className={styles.productIntro__favorite}
          isFavorite
          icon={favorite.src}
          handler={toggleFavorite}
          isActive={isFavorite}
        />
      </div>
    </div>
  );
}
