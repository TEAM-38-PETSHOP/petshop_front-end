'use client';
import styles from './totalCart.module.scss';
import { numberToCurrency } from '@/helpers/numberToCurrency';
import Buttons from '@/components/Buttons/Buttons';

type Props = {
  totalPrice: number;
};
export default function TotalCart({ totalPrice }: Props) {
  return (
    <div className={styles.totalCart}>
      <div className={styles.totalCart__title}>
        <span>Загальна сума</span> <span>{numberToCurrency(totalPrice)}</span>
      </div>
      <hr className={styles.totalCart__hr} />
      <Buttons
        className={styles.totalCart__btns}
        firstBtn={{
          btnText: 'Оформити замовлення',
          btnLink: '/cart/checkout',
          isBuy: true,
        }}
        secondBtn={{ btnText: 'Продовжити покупки', btnLink: '/catalog' }}
      />
    </div>
  );
}
