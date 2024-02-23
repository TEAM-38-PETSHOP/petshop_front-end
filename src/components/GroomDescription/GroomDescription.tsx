import style from './groomDescription.module.scss';

interface CurrentCare {
  id: number;
  name: string;
  price: string;
  description: string;
  other: string[];
}
interface Props {
  careInfo: CurrentCare;
}

export default function GroomDescription({ careInfo }: Props) {
  const { description, other } = careInfo;

  return (
    <div className={style.description}>
      <h2 className={style.description__title}>
        Опис процедури
      </h2>

      <p className={style.description__text}>
        {description}
      </p>

      <ul>
        {other.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      <p className={style.description__additional}>
        *за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги
      </p>
    </div>
  );
}