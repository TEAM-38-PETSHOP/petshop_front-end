import { ContactForm } from "@/components";
import Buttons from "@/components/Buttons/Buttons";
import styles from "./contactInfo.module.scss";

export const ContactInfo = () => {
  return (
    <div className={styles.contactInfo}>
      <ContactForm />

      {/* <div className={styles.contactInfo__buttons}>
        <Buttons
          firstBtn={{
            btnText: "Видалити акаунт",
            className: styles.contactInfo__buttonsDelete,
          }}
        />
        <Buttons
          firstBtn={{
            btnText: "Зберегти",
            className: styles.contactInfo__buttonsSave,
          }}
        />
      </div> */}
    </div>
  );
};
