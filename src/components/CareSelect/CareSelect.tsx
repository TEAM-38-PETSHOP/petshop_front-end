import cn from 'classnames';
import style from './careSelect.module.scss';
import { useState } from 'react';
import GroomDescription from '../GroomDescription/GroomDescription';

interface Care {
  id: number, 
  name: string, 
  price: string,
  description: string,
  other: string[],
}

interface Props {
  currentCare: Care;
  visibleCares: Care[];
  activeCare: string;
  setActiveCare: (care: string) => void;
}

export default function CareSelect({ visibleCares, activeCare, setActiveCare, currentCare }: Props) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <>
      <select 
        className={style.careSelect} 
        onChange={e => setActiveCare(e.target.value)}
        defaultValue={activeCare}
      >
        {visibleCares.map(care => (
          <option
            key={care.id}
            value={care.name}
            className={style.careSelect__option}
          >
            {care.name}
          </option>
        ))}
      </select>

      {/* {activeCare === currentCare.name && (
        <div
          className={cn(style.careSelect__description, {
            [style.careSelect__descriptionActive]: isDescriptionOpen,
          })}
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        >
          <span>
            Опис процедури
          </span>
          <span 
            className={cn(style.careSelect__descriptionArrow, {
              [style.careSelect__descriptionArrowActive]: isDescriptionOpen,
            })}
          ></span>

          <div className={cn(style.careSelect__descriptionMenu, {
            [style.careSelect__descriptionMenuActive]: isDescriptionOpen,
          })}>
            <p className={style.careSelect__descriptionText}>
              {currentCare.description}
            </p>

            <ul>
              {currentCare.other.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <p className={style.careSelect__descriptionAdditional}>
              *за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги
            </p>
          </div>
        </div>
      )} */}
    </>
  );
}