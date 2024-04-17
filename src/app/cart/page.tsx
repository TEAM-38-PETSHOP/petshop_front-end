import styles from './cart.module.scss';

import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';

export default function Cart() {
  return (
    <>
      <HeaderForPages centralBlock={{ text: 'Корзина' }} />
      <section className={styles.cart}></section>
    </>
  );
}
