'use client';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Logo from '@@/images/icons/logo.svg?url';

import styles from './header.module.scss';

import Nav from '../Nav/Nav';
import Link from 'next/link';
import HeaderIcons from './HeaderIcons/HeaderIcons';
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = useCallback(() => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  }, []);

  return (
    <header
      className={classNames([styles.header], { [styles.headerOpen]: openMenu })}
    >
      <div
        className={classNames([styles.header__menu], {
          [styles.header__menuOpen]: openMenu,
        })}
        onClick={toggleMenu}
      ></div>
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
