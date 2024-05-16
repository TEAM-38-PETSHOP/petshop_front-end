import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';
import styles from './checkout.module.scss';
import OrderForm from '@/components/ForCheckout/OrderForm/OrderForm';
export default function Checkout() {
  return (
    <section className={styles.checkout}>
      <HeaderForPages centralBlock={{ text: 'Оформлення замовлення' }} />

      <div className={styles.checkout__wrapper}>
        <OrderForm />
      </div>
    </section>
  );
}
