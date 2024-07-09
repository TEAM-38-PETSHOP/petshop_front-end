'use client';

import style from './groomingHead.module.scss';
import dog from '@@/images/grooming/small-dog.svg';
import cat from '@@/images/grooming/small-cat.svg';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { createUrlString } from '@/helpers/createUrlString';
import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';

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
    <HeaderForPages
      className={style.groomingHead}
      centralBlock={{
        text: `Грумінг для ${currentPet}`,
        img: pet === 'dogs' ? dog : cat,
      }}
      additionalLink={{
        text: `Грумінг для ${pet === 'dogs' ? 'котиків' : 'песиків'}`,
        href: `/grooming/${to}?${createQueryString(
          'careId',
          firstCareId,
          searchParams
        )}`,
      }}
    />
  );
}
