import { useState } from 'react';
import style from './caresList.module.scss';
import cn from 'classnames';

interface Care {
  id: number, 
  name: string, 
  price: string,
  description: string,
  other: string[],
}

interface Props {
  visibleCares: Care[];
  activeCare: string;
  setActiveCare: (care: string) => void;
}

export default function CaresList({ visibleCares, activeCare, setActiveCare }: Props) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <ul className={style.caresList}>
      {visibleCares.map((care, index) => (
        <li
          key={index}
          onClick={() => setActiveCare(care.name)}
        >
          <p className={cn(style.caresList__Item, {
            [style.caresList__activeItem]: activeCare === care.name,
          })}>
            {care.name}
          </p>

          <div 
            className={style.caresList__container}
            // onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            {activeCare === care.name && (
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
      ))}
    </ul>
  );
}