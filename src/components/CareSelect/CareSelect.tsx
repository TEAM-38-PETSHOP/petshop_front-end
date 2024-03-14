import cn from 'classnames';
import style from './careSelect.module.scss';

import { Suspense, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

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
  activeCareId: number;
}

export default function CareSelect({ visibleCares, activeCareId, currentCare }: Props) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const changeHandler = () => {
    setIsDescriptionOpen(false);
  };

  return (
    <>
      <Suspense>
        <Dropdown 
          visibleCares={visibleCares}
          activeCare={activeCareId}
          changeHandler={changeHandler}
          currentCare={currentCare}
        />
      </Suspense>

      {activeCareId === currentCare.id && (
        <div className={style.description}>
          <div 
            className={cn(style.description__btn, {
              [style.description__btnActive]: isDescriptionOpen,
            })}
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            Опис процедури
            
            <span 
              className={cn(style.description__arrow, {
                [style.description__arrowActive]: isDescriptionOpen,
              })}
            ></span>
          </div>

          <div 
            className={cn(style.description__menu, {
              [style.description__menuActive]: isDescriptionOpen,
            })}
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            <p className={style.description__text}>
              {currentCare.description}
            </p>

            <ul>
              {currentCare.other.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <p className={style.description__additional}>
              *за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги
            </p>
          </div>
        </div>
      )}
    </>
  );
}