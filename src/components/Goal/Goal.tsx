import Image from 'next/image';
import style from './goal.module.scss';
import heart from '@@/images/heart/heart.svg?url';

export default function Goal() {
  return (
    <section className={style.goal}>
      <div className={style.goal__descriptionContainer}>
        <p className={style.goal__firstDescription}>
          Ми гарантуємо безпеку та комфорт вашим улюбленцям. 
          Інструменти та поверхні ретельно дезинфікуються,
          використовуються безпечні засоби для гігієни та догляду.
        </p>
      </div>
      <Image
        className={style.goal__img}
        src={heart}
        alt='heart'
        priority
      />
      <div className={style.goal__descriptionContainer}>
        <p className={style.goal__secondDescription}>
          <span>Наша мета</span> - забезпечити ваших улюбленців гарним виглядом та 
          почуттям захищеності. Довірте нам турботу про ваших пухнастих друзів.
        </p>
      </div>
    </section>
  );
}