'use client';
import Link from 'next/link';
import styles from './nav.module.scss';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

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
    href: '/store',
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
  return (
    <nav className={classNames([styles.nav], { [styles.nav__open]: isOpen })}>
      {links.map((link) => (
        <Link
          key={link.href}
          onClick={() => setOpenMenu(false)}
          href={link.href}
          className={classNames([styles.nav_link], {
            [styles.nav_linkActive]: pathname === link.href,
          })}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
