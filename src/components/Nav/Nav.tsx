'use client';
import Link from 'next/link';
import styles from './nav.module.scss';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import Buttons from '../Buttons/Buttons';

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
    href: '/contacts',
  },
];

type Props = {
  isOpen: boolean;
  setOpenMenu: (isOpen: boolean) => void;
};

export default function Nav({ isOpen, setOpenMenu }: Props) {
  const pathname = usePathname();
  const isActiveLink = (href: string) =>
    (pathname.includes(href) && href.length !== 1) ||
    (pathname === '/' && href === '/');

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
          className: pathname === '/favorites' ? styles.nav__like : '',
          onClick: () => setOpenMenu(false),
        }}
        secondBtn={{
          btnText: 'Корзина',
          btnLink: '/cart',
          btnIcon: cart.src,
          className: pathname === '/cart' ? styles.nav__cart : '',
          onClick: () => setOpenMenu(false),
        }}
        className={styles.nav__btns}
      />
    </nav>
  );
}
