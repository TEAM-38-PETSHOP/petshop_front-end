import style from './breedsList.module.scss';

interface Breed {
  id: number;
  name: string;
  price: string;
  additional: string;
}

interface Props {
  breeds: Breed[];
}

export default function BreedsList({ breeds }:  Props) {
  return (
    <ul className={style.breedsList}>
      {breeds.map(breed => (
        <li
          className={style.breedsListItem}
          key={breed.id}
        >
          <p className={style.breedsListItem__text}>
            <span className={style.breedsListItem__textName}>
              {breed.name}
            </span>
            <span className={style.breedsListItem__textPrice}>
              {breed.price}
            </span>
          </p>

          <p className={style.breedsListItem__additional}>
            {breed.additional}
          </p>
          <div className={style.breedsListItem__decor}></div>
        </li>
      ))}
    </ul>
  );
}