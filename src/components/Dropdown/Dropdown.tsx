import style from './dropdown.module.scss';
import dropdownArrow from '@@/images/icons/dropdown-arrow.svg';
import Image from 'next/image';
import cn from 'classnames';
import { useState } from 'react';

interface Care {
  id: number;
  name: string;
  price: string;
  description: string;
  other: string[];
}

interface Props {
  visibleCares: Care[];
  activeCare: string;
  changeHandler: (care: string) => void;
}

export default function Dropdown({
  visibleCares,
  activeCare,
  changeHandler,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCare = (careName: string) => {
    changeHandler(careName);
    setIsOpen(false);
  };

  return (
    <div className={style.dropdown}>
      <div
        className={style.dropdown__btn}
        onClick={toggleDropdown}
      >
        {activeCare}
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
              [style.dropdown__itemActive]: activeCare === care.name,
            })}
            onClick={() => selectCare(care.name)}
          >
            {care.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
