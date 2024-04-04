'use client';
import { useState, memo, useEffect } from 'react';
import SvgWrapper from '@/components/SvgWrapper/SvgWrapper';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './headerIcons.module.scss';

import favorites from '@@/images/icons/like.svg';
import cart from '@@/images/icons/cart.svg';
import Profile from '@/components/Profile/Profile';
import { useAppSelector } from '@/hooks/reduxHooks';

type Props = {
  setOpenMenu: (isOpen: boolean) => void;
};

export default memo(function HeaderIcons({ setOpenMenu }: Props) {
  const cartCount = useAppSelector((state) => state.cart.cartProducts.length);
  const [cartCountState, setCartCountState] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setCartCountState(cartCount);
  }, [cartCount]);

  return (
    <div className={styles.headerRight}>
      <Link
        data-testid="favorites"
        href="/favorites"
        className={classNames(
          [styles.headerRight__iconsBase],
          [styles.headerRight__iconCartAndFavorite],
          {
            [styles.headerRight__iconLike]: pathname === '/favorites',
          }
        )}
      >
        <SvgWrapper src={favorites.src} />
      </Link>

      <Link
        data-testid="cart"
        href="/cart"
        className={classNames(
          [styles.headerRight__iconsBase],
          [styles.headerRight__iconCartAndFavorite],
          {
            [styles.headerRight__iconCart]: pathname === '/cart',
          }
        )}
      >
        <SvgWrapper src={cart.src} />
        {!!cartCountState && (
          <span className={styles.headerRight__count}>{cartCountState}</span>
        )}
      </Link>

      <Profile
        className={styles.headerRight__iconsBase}
        onClick={() => setOpenMenu(false)}
      />
    </div>
  );
});
