import { TypeOfService } from '@/types/TypeOfService';
import style from './breedsList.module.scss';

interface Props {
  breeds: TypeOfService[];
}

export default function BreedsList({ breeds }:  Props) {
  return (
    <ul className={style.breedsList}>
      {breeds.length > 0 && breeds.map(breed => (
        <li
          className={style.breedsListItem}
          key={breed.id}
        >
          <p className={style.breedsListItem__text}>
            <span className={style.breedsListItem__textName} data-testid="breed-name">
              {breed.name}
            </span>
            <span className={style.breedsListItem__textPrice}>
              {breed.price}
            </span>
          </p>
          
          {/* Тут може бути додаткова інформація */}
          {/* <p className={style.breedsListItem__additional}>
          </p> */}
          <div className={style.breedsListItem__decor}></div>
        </li>
      ))}
    </ul>
  );
}