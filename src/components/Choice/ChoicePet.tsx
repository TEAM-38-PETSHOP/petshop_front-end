import Image from 'next/image';
import Arrow from '../Arrow/Arrow';
import style from './choicePet.module.scss';
import Link from 'next/link';

import dog from '@@/images/drawn/dog.svg';
import cat from '@@/images/drawn/cat.svg';

type Props = {
  choice: 'dogs' | 'cats';
};

export default function ChoicePet({ choice }: Props) {
  return choice === 'dogs' ? (
    <Link
      href={`/grooming/${choice}`}
      className={style.choice}
    >
      <div className={style.choice__btn}>
        <h4 className={style.choice__title}>Песика</h4>
        <Arrow
          styleName={style.choice__btn__dogs}
          direction="right"
        />
      </div>
      <div className={style.choice__wrapper}>
        <Image
          className={style.choice__img}
          src={dog}
          alt="dog"
          priority
        />
      </div>
    </Link>
  ) : (
    <Link
      href={`/grooming/${choice}`}
      className={style.choice}
    >
      <div className={style.choice__btn}>
        <h4 className={style.choice__title}>Котика</h4>
        <Arrow
          styleName={style.choice__btn__cats}
          direction="right"
        />
      </div>
      <div className={style.choice__wrapper}>
        <Image
          className={style.choice__img}
          src={cat}
          alt="cat"
          priority
        />
      </div>
    </Link>
  );
}
