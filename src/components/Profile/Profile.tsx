'use client';
import SvgWrapper from '@/components/SvgWrapper/SvgWrapper';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import styles from './profile.module.scss';

import profileIcon from '@@/images/icons/profile.svg';

type Props = {
  className?: string;
  onClick?: () => void;
};
export default function Profile({ className, onClick }: Props) {
  const path = usePathname();

  return (
    <Link
      href="/profile"
      onClick={onClick}
      className={classNames([className], [styles.ProfileIcon], {
        [styles.ProfileIcon__Selected]: path === '/profile',
      })}
    >
      <SvgWrapper src={profileIcon.src} />
      <span>Профіль</span>
    </Link>
  );
}
