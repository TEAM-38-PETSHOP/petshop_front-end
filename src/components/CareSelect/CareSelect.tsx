import cn from 'classnames';
import style from './careSelect.module.scss';

import { Suspense, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { Service } from '@/types/Service';

interface Props {
  currentCare: Service;
  visibleCares: Service[];
  activeCareId: number;
  setQuery: (query: string) => void;
}

export default function CareSelect({ visibleCares, activeCareId, currentCare, setQuery }: Props) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const changeHandler = () => {
    setIsDescriptionOpen(false);
    setQuery('');
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

      {currentCare && activeCareId === currentCare.id && (
        <div className={style.description} data-testid="description">
          <div 
            data-testid="description-btn"
            className={cn(style.description__btn, {
              [style.description__btnActive]: isDescriptionOpen,
            })}
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            Опис процедури
            
            <span
              data-testid="description-arrow"
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

            <p className={style.description__additional}>
              *за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги
            </p>
          </div>
        </div>
      )}
    </>
  );
}