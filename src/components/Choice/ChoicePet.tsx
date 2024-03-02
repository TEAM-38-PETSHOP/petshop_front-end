import Image from 'next/image';
import Arrow from '../Arrow/Arrow';
import style from './choicePet.module.scss';
import Link from 'next/link';

import dog from '@@/images/drawn/dog.svg?url';
import cat from '@@/images/drawn/cat.svg?url';

type Props = {
  choice: 'dogs' | 'cats';
}

export default function ChoicePet({ choice }: Props) {
  return choice === 'dogs' ? (
    <div className={style.choice}>
      <div className={style.choice__btn}>
        <h4 className={style.choice__title}>Песика</h4>
        <Link href={`/grooming/${choice}`}>
          <Arrow styleName={style.choice__btn__dogs} direction='right' />
        </Link>
      </div>
      <div className={style.choice__wrapper}>
        <Image
          className={style.choice__img}
          src={dog}
          alt="dog"
          priority
        />
      </div>
    </div>
  ) : (
    <div className={style.choice}>
      <div className={style.choice__btn}>
        <h4 className={style.choice__title}>Котика</h4>
        <Link href={`/grooming/${choice}`}>
          <Arrow styleName={style.choice__btn__cats} direction='right' />
        </Link>
      </div>
      <div className={style.choice__wrapper}>
        <Image 
          className={style.choice__img}
          src={cat}
          alt="cat"
          priority
        />
      </div>
    </div>
  );
}