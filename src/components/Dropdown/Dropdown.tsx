'use client';

import style from './dropdown.module.scss';
import dropdownArrow from '@@/images/icons/dropdown-arrow.svg';
import Image from 'next/image';
import cn from 'classnames';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrlString } from '@/helpers/createUrlString';
import { Service } from '@/types/Service';

interface Props {
  visibleCares: Service[];
  activeCare: number;
  changeHandler: (careId: number) => void;
  currentCare: Service;
}

export default function Dropdown({
  visibleCares,
  activeCare,
  changeHandler,
  currentCare
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(createUrlString, [searchParams]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCare = (careId: number, e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    changeHandler(careId);
    setIsOpen(false);
    router.push(
      pathname + '?' + createQueryString('careId', String(careId), searchParams), 
      { scroll: false }
    );
  };

  return (
    <div className={style.dropdown} data-testid="dropdown">
      <div
        className={style.dropdown__btn}
        onClick={toggleDropdown}
      >
        {currentCare?.name}
        <Image 
          className={cn({
            [style.dropdown__img]: !isOpen,
            [style.dropdown__imgActive]: isOpen,
          })}
          src={dropdownArrow}
          alt="arrow"
          priority
        />
      </div>
      <ul
        className={cn([style.dropdown__content], {
          [style.dropdown__contentActive]: isOpen,
        })}
      >
        {visibleCares.map((care) => (
          <li
            key={care.id}
            className={cn(style.dropdown__item, {
              [style.dropdown__itemActive]: activeCare === care.id,
            })}
            onClick={(e) => selectCare(care.id, e)}
          >
            {care?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
