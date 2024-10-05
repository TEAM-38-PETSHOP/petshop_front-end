'use client';

import Link from 'next/link';
import styles from './profileList.module.scss';
import classNames from 'classnames';
import { ProfileTab } from '@/types';
import { profileTabInfoFactory } from '@/factories/profileTabInfoFactory';
import { Accordion } from '@/components';
import { profileList } from '@/constants';
import { signOut, useSession } from 'next-auth/react';
import { IUser } from '@/types/User';

type Props = {
  searchParams: { activeTab: ProfileTab };
};

export default function ProfileList({ searchParams }: Props) {
  const activeTab = searchParams?.activeTab || ProfileTab.ContactInfo;
  const { data } = useSession();
  const customUser = data?.user as IUser;

  const handleExit = () => {
    signOut();
  };

  return (
    <section className={styles.profileList}>
      <div>
        <ul className={styles.btnsList}>
          {profileList.map((tab) => (
            <li key={tab.id}>
              <Link
                className={classNames([styles.btnsList__btn], {
                  [styles.btnsList__btnActive]: tab.tabId === activeTab,
                })}
                replace
                scroll={false}
                data-testid={`btn-${tab.tabId}`}
                href={`?activeTab=${tab.tabId}`}
              >
                <span>{tab.listName}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <button
            onClick={handleExit}
            type="button"
            className={styles.profileList__exit}
          >
            Вийти
          </button>
          {customUser?.roles.some((role) => role.role === 'ADMIN') && (
            <Link
              href="/admin-panel"
              className={styles.profileList__exit}
            >
              Для адміністратора
            </Link>
          )}
        </div>
      </div>

      <hr className={styles.profileList__hr} />

      <div className={styles.profileList__info}>
        {profileTabInfoFactory(activeTab)}
      </div>

      <Accordion
        data={profileList}
        searchParams={searchParams}
      />

      <button
        onClick={handleExit}
        type="button"
        className={styles.profileList__exitMobile}
      >
        Вийти
      </button>
    </section>
  );
}
