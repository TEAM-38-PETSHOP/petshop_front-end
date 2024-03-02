'use client';
import { useState } from 'react';
import classNames from 'classnames';
import styles from './profile.module.scss';
import ProfileIcon from '@@/images/icons/profile.svg';

type Props = {
  className?: string;
};
export default function Profile({ className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className={classNames([className], [styles.ProfileIcon], {
        [styles.ProfileIcon__Selected]: open,
      })}
    >
      <ProfileIcon />
    </button>
  );
}
