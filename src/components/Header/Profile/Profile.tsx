'use client';
import classNames from 'classnames';
import styles from './profile.module.scss';
import ProfileIcon from '@@/images/icons/profile.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
      <ProfileIcon />
    </Link>
  );
}
