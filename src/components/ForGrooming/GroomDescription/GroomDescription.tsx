import { Service } from '@/types/Service';
import style from './groomDescription.module.scss';

interface Props {
  careInfo: Service;
}

export default function GroomDescription({ careInfo }: Props) {
  return (
    <>
      <div className={style.description}>
        <h2 className={style.description__title}>
          Опис процедури
        </h2>

        <p className={style.description__text}>
          {careInfo?.description}
        </p>

        <p className={style.description__additional}>
          *за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги
        </p>
      </div>
    </>
  );
}