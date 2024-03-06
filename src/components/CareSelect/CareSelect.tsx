import cn from 'classnames';
import style from './careSelect.module.scss';
import { useState } from 'react';
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
  activeCare: string;
  setActiveCare: (care: string) => void;
}

export default function CareSelect({ visibleCares, activeCare, setActiveCare, currentCare }: Props) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const changeHandler = (careName: string) => {
    setIsDescriptionOpen(false);
    setActiveCare(careName);
  };

  return (
    <>
      <Dropdown 
        visibleCares={visibleCares}
        activeCare={activeCare}
        changeHandler={changeHandler}
      />

      <div className={style.careSelect__container}>
        {activeCare === currentCare.name && (
          <div
            className={cn(style.careSelect__description, {
              [style.careSelect__descriptionActive]: isDescriptionOpen,
            })}
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            <div className={style.careSelect__descriptionHead}>
              <span>
                Опис процедури
              </span>
              <span 
                className={cn(style.careSelect__descriptionArrow, {
                  [style.careSelect__descriptionArrowActive]: isDescriptionOpen,
                })}
              ></span>
            </div>

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
        )}
      </div>
    </>
  );
}