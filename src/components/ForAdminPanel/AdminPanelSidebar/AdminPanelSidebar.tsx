'use client';

import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './adminPanelSidebar.module.scss';
import { signOut, useSession } from 'next-auth/react';
import { adminPanelSidebarList } from '@/constants/pages/AdminPanel';
import { AdminPanelTabs } from '@/types';
import SvgWrapper from '@/components/SvgWrapper/SvgWrapper';
import exitIcon from '@@/images/icons/exit.svg';
import alternateAvatar from '@@/images/icons/profile.svg';
import { IUser } from '@/types/User';

type Props = {
  searchParams: { activeTab: AdminPanelTabs };
};

export default function AdminPanelSidebar({ searchParams }: Props) {
  const activeTab = searchParams?.activeTab || AdminPanelTabs.ShopCategories;
  const { data } = useSession();
  const customUser = data?.user as IUser;

  const handleExit = () => {
    signOut();
  };

  return (
    <div className={styles.adminPanelSidebar}>
      <div>
        <div className={styles.adminPanelSidebar__user}>
          <Image
            className={classNames([styles.adminPanelSidebar__userImg], {
              [styles.adminPanelSidebar__userImgAlternate]: !customUser?.image,
            })}
            src={customUser?.image || alternateAvatar}
            alt="user avatar"
            width={52}
            height={52}
          />
          <div>
            <p className={styles.adminPanelSidebar__userName}>
              {customUser?.firstName}
            </p>
            <p className={styles.adminPanelSidebar__userEmail}>
              {customUser?.email}
            </p>
          </div>
        </div>
        <ul className={styles.btnsList}>
          {adminPanelSidebarList.map(({ id, tabId, tabName, tabIcon }) => (
            <li
              key={id}
              className={classNames([styles.btnsList__btn], {
                [styles.btnsList__btnActive]: tabId === activeTab,
              })}
            >
              <SvgWrapper
                src={tabIcon.src}
                className={classNames([styles.btnsList__img], {
                  [styles.btnsList__imgActive]: tabId === activeTab,
                })}
              />
              <Link
                replace
                scroll={false}
                href={`?activeTab=${tabId}`}
              >
                <span>{tabName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleExit}
        type="button"
        className={styles.adminPanelSidebar__exit}
      >
        <SvgWrapper
          src={exitIcon.src}
          className={styles.adminPanelSidebar__exitIcon}
        />
        Вийти
      </button>
    </div>
  );
}
