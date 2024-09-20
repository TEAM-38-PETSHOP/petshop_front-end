import { FeedbackForm } from "..";
import styles from "./feedback.module.scss";

export const Feedback = () => {
  return (
    <section className={styles.feedback}>
      <h1 className={styles.feedback__title}>
        Поділись своїми враженнями з нами!
      </h1>

      <FeedbackForm />
    </section>
  );
};
