import Image from 'next/image';
import styles from './services.module.scss';
import ButtonWithArrow from '../ButtonWithArrow/ButtonWithArrow';
export default function Services() {
  return (
    <section className={styles.services}>
      <h2 className={styles.services__title}>Кого потрібно причепурити?</h2>

      <div className={styles.services__blocks}></div>
      <div className={styles.services__block}></div>
      <div className={styles.services__imgBlock}>
        <ButtonWithArrow text="Доглянути котика" />
      </div>
      <div className={styles.services__block}></div>
    </section>
  );
}
