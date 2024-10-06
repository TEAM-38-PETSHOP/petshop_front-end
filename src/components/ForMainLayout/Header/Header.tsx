'use client';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@@/images/icons/logo.svg';
import styles from './header.module.scss';

import Nav from '../Nav/Nav';
import HeaderIcons from '../HeaderIcons/HeaderIcons';
import { usePathname } from 'next/navigation';
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const isHidden = ['/admin-panel'].includes(pathname);
  const toggleMenu = useCallback(() => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  }, []);

  return isHidden ? null : (
    <header
      className={classNames([styles.header], { [styles.headerOpen]: openMenu })}
      hidden={isHidden}
    >
      <button
        className={classNames([styles.header__menu], {
          [styles.header__menuOpen]: openMenu,
        })}
        onClick={toggleMenu}
        data-testid="menu-button"
        type="button"
      ></button>
      <Link href="/">
        <Image
          className={styles.header__logo}
          src={Logo}
          alt="logo"
          priority
        ></Image>
      </Link>

      <Nav
        isOpen={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <HeaderIcons setOpenMenu={setOpenMenu} />
    </header>
  );
}
