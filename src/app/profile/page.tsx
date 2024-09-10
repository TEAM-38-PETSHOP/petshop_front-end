import ProfileList from "@/components/ForProfile/ProfileList/ProfileList";
import HeaderForPages from "@/components/HeaderForPages/HeaderForPages";
import styles from "./profile.module.scss";
import { ProfileTab } from "@/types";

interface Props {
  searchParams: { activeTab: ProfileTab };
}

export default function Profile({ searchParams }: Props) {
  return (
    <>
      <HeaderForPages
        centralBlock={{
          text: "Аккаунт",
          img: "./images/grooming/small-dog.svg",
        }}
      />

      <section className={styles.profile}>
        <ProfileList searchParams={searchParams} />
      </section>
    </>
  );
}
