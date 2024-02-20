import Choice from '../Choice/ChoicePet';
import style from './groomingChoice.module.scss';

export default function GroomingChoice() {
  return (
    <section className={style.groomingChoice}>
      <h3 className={style.groomingChoice__title}>Кого потрібно причепурити ?</h3>
      <div className={style.groomingChoice__choice}>
        <Choice choice='dogs' />
        <Choice choice='cats' />
      </div>
    </section>
  );
}