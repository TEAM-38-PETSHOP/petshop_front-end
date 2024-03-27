'use client';
import React from 'react';
import SvgWrapper from '@/components/SvgWrapper/SvgWrapper';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './headerIcons.module.scss';

import favorites from '@@/images/icons/like.svg';
import cart from '@@/images/icons/cart.svg';
import Profile from '@/components/Profile/Profile';

type Props = {
  setOpenMenu: (isOpen: boolean) => void;
};

export default React.memo(function HeaderIcons({ setOpenMenu }: Props) {
  const pathname = usePathname();
  return (
    <div className={styles.headerRight}>
      <Link
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
      </Link>

      <Profile
        className={styles.headerRight__iconsBase}
        onClick={() => setOpenMenu(false)}
      />
    </div>
  );
});
