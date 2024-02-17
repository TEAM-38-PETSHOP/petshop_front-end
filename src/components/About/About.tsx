import Image from 'next/image';
import Link from 'next/link';
import style from './about.module.scss';

import dogImg from '@@/images/dogs/dog-1.png';
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
        <div className={style.about__btns}>
          <Link
            href={'/'}
            className={style.about__btn}
          >
            СПА для пухнастиків
          </Link>
          <Link
            href={'/'}
            className={style.about__btn}
          >
            Шоппінг для улюбленців
          </Link>
        </div>
      </div>
    </section>
  );
}
