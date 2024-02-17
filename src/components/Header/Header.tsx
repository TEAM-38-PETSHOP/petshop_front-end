'use client';
import Image from 'next/image';
import Logo from '@@/images/icons/logo.svg?url';

import style from './header.module.scss';

import Nav from '../Nav/Nav';
import Link from 'next/link';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import classNames from 'classnames';
import { useState } from 'react';
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header
      className={classNames([style.header], { [style.headerOpen]: openMenu })}
    >
      <div
        className={classNames([style.header__menu], {
          [style.header__menuOpen]: openMenu,
        })}
        onClick={() => setOpenMenu(!openMenu)}
      ></div>
      <Link href="/">
        <Image
          className={style.header__logo}
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
