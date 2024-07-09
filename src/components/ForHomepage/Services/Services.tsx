import styles from './services.module.scss';
import ButtonWithArrow from '@/components/ButtonWithArrow/ButtonWithArrow';
import classNames from 'classnames';
export default function Services() {
  return (
    <section
      className={styles.services}
      data-testid="services-section"
    >
      <h2 className={styles.services__title}>Кого потрібно причепурити?</h2>

      <div className={styles.services__blocks}>
        <div
          className={classNames(
            [styles.services__firstBlock],
            [styles.services__img]
          )}
          data-testid="service-block"
        >
          <ButtonWithArrow
            classNameBtn={styles.services__buttons}
            text="Доглянути котика"
            href="/grooming/cats"
            variant="green"
          />
        </div>
        <div
          className={classNames(
            [styles.services__description],
            [styles.services__firstBlock_description]
          )}
          data-testid="service-block"
        >
          <h3>Grooming Spa</h3>
          <p>
            Наші найсучасніші засоби догляду розроблені, щоб створити приємні
            враження без стресу
          </p>
        </div>
        <div
          className={classNames(
            [styles.services__imgBlock],
            [styles.services__img]
          )}
          data-testid="service-block"
        >
          <ButtonWithArrow
            classNameBtn={styles.services__buttons}
            text="Доглянути песика"
            href="/grooming/dogs"
            variant="orange"
          />
        </div>
        <div
          className={classNames(
            [styles.services__lastBlock],
            [styles.services__img]
          )}
          data-testid="service-block"
        >
          <ButtonWithArrow
            classNameBtn={styles.services__buttons}
            href="/catalog"
            text="До магазину"
          />
        </div>
        <div
          className={classNames(
            [styles.services__description],
            [styles.services__lastBlock_description]
          )}
          data-testid="service-block"
        >
          <p>Послуги та ціни </p>
        </div>
      </div>
    </section>
  );
}
