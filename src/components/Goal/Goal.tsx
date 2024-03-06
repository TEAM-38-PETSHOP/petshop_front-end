import Image from 'next/image';
import style from './goal.module.scss';
import heart from '@@/images/heart/red-heart.svg?url';
import heartBorder from '@@/images/heart/heart-border.svg?url';
import heartText from '@@/images/heart/heart-text.svg?url';

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
      <div className={style.goal__imgContainer}>
        <Image
          className={style.goal__imgBorder}
          src={heartBorder}
          alt='heart border'
          priority
        />
        <Image
          className={style.goal__imgHeart}
          src={heart}
          alt='heart'
          priority
        />
        <Image
          className={style.goal__imgText}
          src={heartText}
          alt='heart text'
          priority
        />
      </div>
      <div className={style.goal__descriptionContainer}>
        <p className={style.goal__secondDescription}>
          <span>Наша мета</span> - забезпечити ваших улюбленців гарним виглядом та 
          почуттям захищеності. Довірте нам турботу про ваших пухнастих друзів.
        </p>
      </div>
    </section>
  );
}