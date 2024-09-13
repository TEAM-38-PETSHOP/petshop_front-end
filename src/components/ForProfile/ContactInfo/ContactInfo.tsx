import { ContactForm } from "@/components";
import styles from "./contactInfo.module.scss";

export const ContactInfo = () => {
  return (
    <div className={styles.contactInfo}>
      <ContactForm />
    </div>
  );
};
