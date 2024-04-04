'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './nav.module.scss';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import Buttons from '../Buttons/Buttons';
import { useAppSelector } from '@/hooks/reduxHooks';

import cart from '@@/images/icons/cart.svg';
import like from '@@/images/icons/like.svg';

const links = [
  {
    title: 'Головна',
    href: '/',
  },
  {
    title: 'Грумінг',
    href: '/grooming',
  },
  {
    title: 'Магазин',
    href: '/catalog',
  },
  {
    title: 'Контакти',
    href: '/#contacts',
  },
];

type Props = {
  isOpen: boolean;
  setOpenMenu: (isOpen: boolean) => void;
};

export default function Nav({ isOpen, setOpenMenu }: Props) {
  const cartCount = useAppSelector((state) => state.cart.cartProducts.length);
  const [cartCountState, setCartCountState] = useState(0);
  const pathname = usePathname();
  const isActiveLink = (href: string) =>
    (pathname.includes(href) && href.length !== 1) ||
    (pathname === '/' && href === '/');

  useEffect(() => {
    setCartCountState(cartCount);
  }, [cartCount]);

  return (
    <nav
      className={classNames([styles.nav], { [styles.nav__open]: isOpen })}
      data-testid="nav"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          onClick={() => setOpenMenu(false)}
          href={link.href}
          className={classNames([styles.nav__link], {
            [styles.nav__linkActive]: isActiveLink(link.href),
          })}
        >
          {link.title}
        </Link>
      ))}

      <Buttons
        firstBtn={{
          btnText: 'Обране',
          btnLink: '/favorites',
          btnIcon: like.src,
          className: classNames({
            [styles.nav__likeActive]: pathname === '/favorites',
          }),
          onClick: () => setOpenMenu(false),
        }}
        secondBtn={{
          btnText: 'Корзина',
          btnLink: '/cart',
          btnIcon: cart.src,
          className: classNames([styles.nav__btn], {
            [styles.nav__cartActive]: pathname === '/cart',
          }),
          onClick: () => setOpenMenu(false),
          children: (
            <>
              {!!cartCountState && (
                <span className={styles.nav__btnCount}>{cartCountState}</span>
              )}
            </>
          ),
        }}
        className={styles.nav__btns}
      />
    </nav>
  );
}
