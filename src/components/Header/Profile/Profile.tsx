'use client';
import { useState } from 'react';
import classNames from 'classnames';
import style from './profile.module.scss';
import ProfileIcon from '@@/images/icons/profile.svg';

type Props = {
  className?: string;
};
export default function Profile({ className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className={classNames([className], [style.ProfileIcon], {
        [style.ProfileIcon__Selected]: open,
      })}
    >
      <ProfileIcon />
    </button>
  );
}
