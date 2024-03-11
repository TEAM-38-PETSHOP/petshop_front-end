'use client';
import React from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './headerIcons.module.scss';

import Favorites from '@@/images/icons/like.svg';
import Cart from '@@/images/icons/cart.svg';
import Profile from '@/components/Header/Profile/Profile';

type Props = {
  setOpenMenu: (isOpen: boolean) => void;
};

export default React.memo(function HeaderIcons({ setOpenMenu }: Props) {
  const pathname = usePathname();
  return (
    <div className={styles.headerRight}>
      <Link
        href="favorites"
        className={classNames(
          [styles.headerRight__iconsBase],
          [styles.headerRight__iconCartAndFavorite],
          {
            [styles.headerRight__iconLike]: pathname === '/favorites',
          }
        )}
      >
        <Favorites />
      </Link>

      <Link
        href="cart"
        className={classNames(
          [styles.headerRight__iconsBase],
          [styles.headerRight__iconCartAndFavorite],
          {
            [styles.headerRight__iconCart]: pathname === '/cart',
          }
        )}
      >
        <Cart />
      </Link>

      <Profile
        className={styles.headerRight__iconsBase}
        onClick={() => setOpenMenu(false)}
      />
    </div>
  );
});
