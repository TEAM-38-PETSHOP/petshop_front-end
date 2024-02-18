'use client';
import Image from 'next/image';
import Logo from '@@/images/icons/logo.svg?url';

import styles from './header.module.scss';

import Nav from '../Nav/Nav';
import Link from 'next/link';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import classNames from 'classnames';
import { useState } from 'react';
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header
      className={classNames([styles.header], { [styles.headerOpen]: openMenu })}
    >
      <div
        className={classNames([styles.header__menu], {
          [styles.header__menuOpen]: openMenu,
        })}
        onClick={() => setOpenMenu(!openMenu)}
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
      <HeaderIcons />
    </header>
  );
}
