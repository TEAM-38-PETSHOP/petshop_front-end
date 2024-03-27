'use client';

import Link from 'next/link';
import Arrow from '../Arrow/Arrow';
import style from './groomingHead.module.scss';
import dog from '@@/images/grooming/small-dog.svg';
import cat from '@@/images/grooming/small-cat.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { createUrlString } from '@/helpers/createUrlString';

interface Props {
  pet: string;
}

export default function GroomingHead({ pet }: Props) {
  const to = pet === 'dogs' ? 'cats' : 'dogs';
  const currentPet = pet === 'dogs' ? 'песиків' : 'котиків';
  const searchParams = useSearchParams();
  const createQueryString = useCallback(createUrlString, [searchParams]);
  
  const firstCareId = pet === 'dogs' ? '5' : '6';
  
  return (
    <section className={style.groomingHead}>
      <Link
        className={style.groomingHead__goBack}
        href="/grooming"
      >
        <Arrow
          styleName={style.groomingHead__goBack__arrow}
          direction="left"
        />
      </Link>
      <div className={style.groomingHead__centerContainer}>
          <Image
            className={style.groomingHead__centerContainer__img}
            src={pet === 'dogs' ? dog : cat}
            alt="dog"
          />
          <h2 className={style.groomingHead__centerContainer__title}>
            Грумінг для {currentPet}
          </h2>
        </div>
        <Link 
          className={style.groomingHead__move} 
          href={`/grooming/${to}?${createQueryString('careId', firstCareId, searchParams)}`}
        >
          Грумінг для {pet === 'dogs' ? 'котиків' : 'песиків'}
        </Link>
    </section>
  );
}
