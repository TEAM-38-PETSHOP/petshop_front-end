"use client";

import Link from "next/link";
import styles from "./profileList.module.scss";
import classNames from "classnames";
import { ProfileTab } from "@/types";
import { profileTabInfoFactory } from "@/helpers";
import { Accordion } from "@/components";
import { profileList } from "@/constants";
import { signOut } from "next-auth/react";

type Props = {
  searchParams: { activeTab: ProfileTab };
};

export default function ProfileList({ searchParams }: Props) {
  const activeTab = searchParams?.activeTab || ProfileTab.ContactInfo;

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

        <button
          onClick={handleExit}
          type="button"
          className={styles.profileList__exit}
        >
          Вийти
        </button>
      </div>

      <hr className={styles.profileList__hr} />

      <div className={styles.profileList__info}>
        {profileTabInfoFactory(activeTab)}
      </div>

      <Accordion data={profileList} searchParams={searchParams} />

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
