'use client';

import { useCallback, useState } from 'react';
import style from './caresList.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { createUrlString } from '@/helpers/createUrlString';

interface Care {
  id: number, 
  name: string, 
  price: string,
  description: string,
  other: string[],
}

interface Props {
  visibleCares: Care[];
  activeCareId: number;
  setQuery: (query: string) => void;
}

export default function CaresList({ visibleCares, activeCareId, setQuery }: Props) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(createUrlString, [searchParams]);

  return (
    <ul className={style.caresList}>
      {visibleCares.map((care, index) => (
        <Link 
          key={care.id} 
          href={pathname + '?' + createQueryString('careId', String(care.id), searchParams)}
          scroll={false}
        >
          <li
            key={index}
            onClick={() => setQuery('')}
          >
            <p className={cn(style.caresList__Item, {
              [style.caresList__activeItem]: activeCareId === care.id,
            })}>
              {care.name}
            </p>

            <div className={style.caresList__container}>
              {activeCareId === care.id && (
                <div
                  className={cn(style.caresList__description, {
                    [style.caresList__descriptionActive]: isDescriptionOpen,
                  })}
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                >
                  <div className={style.caresList__descriptionHead}>
                    <span>
                      Опис процедури
                    </span>
                    <span 
                      className={cn(style.caresList__descriptionArrow, {
                        [style.caresList__descriptionArrowActive]: isDescriptionOpen,
                      })}
                    ></span>
                  </div>

                  <div className={cn(style.caresList__descriptionMenu, {
                    [style.caresList__descriptionMenuActive]: isDescriptionOpen,
                  })}>
                    <p className={style.caresList__descriptionText}>
                      {care.description}
                    </p>

                    <ul>
                      {care.other.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <p className={style.caresList__descriptionAdditional}>
                      *за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги
                    </p>
                  </div>
                </div>
              )}
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}