import Image from 'next/image';
import style from './about.module.scss';

import dogImg from '@@/images/homepage/dog-about.png';
import Buttons from '@/components/Buttons/Buttons';
export default function About() {
  return (
    <section className={style.about}>
      <Image
        className={style.about__img}
        src={dogImg}
        alt="dog"
        placeholder="blur"
        priority
      />

      <div className={style.about__info}>
        <h2 className={style.about__title}>Про нас</h2>
        <h1 className={style.about__slogan}>
          Турбуються, люблять, балують в одному місці — в <span>OneGroom</span>
        </h1>
        <p className={style.about__description}>
          Наша команда забезпечує комфорт та догляд за вашим улюбленцем,
          представляючи великий вибір якісних продуктів та послуг. Пухнастик -
          це частина вашого сімейного кола, і ми завжди тут, щоб подарувати йому
          та вам тільки найкраще.
        </p>
        <Buttons
          firstBtn={{
            btnText: 'СПА для пухнастиків',
            btnLink: '/grooming',
          }}
          secondBtn={{
            btnText: 'Шоппінг для улюбленців',
            btnLink: '/catalog',
          }}
        />
      </div>
    </section>
  );
}
