import Buttons from '@/components/Buttons/Buttons';
import styles from './ourLocation.module.scss';

const FindUsOnMapLink =
  'https://www.google.com/maps/dir//вулиця+Київський+шлях,+127Б,+Бориспіль,+Київська+обл.,+08300/@50.3425386,30.963968,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40d4ef4c5e146fb3:0xa4f62f85a5e3c8a!2m2!1d30.9665429!2d50.3425797?hl=uk-UK&entry=ttu';
const GoogleMapLink =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.2855250028133!2d30.963967977707714!3d50.342579671571656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ef4c5e146fb3%3A0xa4f62f85a5e3c8a!2z0LLRg9C70LjRhtGPINCa0LjRl9Cy0YHRjNC60LjQuSDRiNC70Y_RhSwgMTI30JEsINCR0L7RgNC40YHQv9GW0LvRjCwg0JrQuNGX0LLRgdGM0LrQsCDQvtCx0LsuLCAwODMwMA!5e0!3m2!1suk!2sua!4v1709496856591!5m2!1suk!2sua';
const locationInfo = {
  title: 'One Groom',
  address: 'Київський шлях 127б/6, Boryspil',
  schedule: '10:00 - 20:00 | Без вихідних',
};
const mapLinks = {
  route: FindUsOnMapLink,
  videoRoute: '/',
};
export default function OurLocation() {
  return (
    <section
      className={styles.ourLocation}
      id="contacts"
    >
      <div className={styles.ourLocation__info}>
        <div className={styles.ourLocation__text}>
          <h3 className={styles.ourLocation__subtitle}>{locationInfo.title}</h3>
          <h4 className={styles.ourLocation__title}>Адреса та графік роботи</h4>
          <p className={styles.ourLocation__description}>
            {locationInfo.address} <br />
            {locationInfo.schedule}
          </p>
          <Buttons
            className={styles.ourLocation__textBtns}
            firstBtn={{
              target: '_blank',
              btnText: 'Прокласти маршрут',
              btnLink: mapLinks.route,
            }}
            secondBtn={{
              target: '_blank',
              btnText: 'Відео-маршрут',
              btnLink: mapLinks.videoRoute,
            }}
          />
        </div>
        <div className={styles.ourLocation__btns}>
          <Buttons
            className={styles.ourLocation__btnsBlock}
            firstBtn={{
              target: '_blank',
              btnText: 'Прокласти маршрут',
              btnLink: mapLinks.route,
            }}
            secondBtn={{
              target: '_blank',
              btnText: 'Відео-маршрут',
              btnLink: mapLinks.videoRoute,
            }}
          />
        </div>
      </div>
      <iframe
        className={styles.ourLocation__map}
        data-testid="map-iframe"
        src={GoogleMapLink}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}
