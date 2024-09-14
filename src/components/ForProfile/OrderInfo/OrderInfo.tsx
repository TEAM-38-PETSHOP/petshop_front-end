import { useState } from 'react';
import styles from './OrderInfo.module.scss';
import { IOrderResponse } from '@/types/OrderResponse';
import { checkStatusOrder } from '@/helpers/checkStatusOrder';
import classNames from 'classnames';
import { numberToCurrency } from '@/helpers/numberToCurrency';
import { formatDate } from '@/helpers/formatDate';
import Image from 'next/image';

import arrow from '@@/images/icons/arrow_small_black.svg';
import Buttons from '@/components/Buttons/Buttons';

type Props = {
  order: IOrderResponse;
};

export const OrderInfo = ({ order }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { statusName, colorIndicator } = checkStatusOrder(order.status);

  return (
    <div className={styles.orderInfo}>
      <header className={styles.orderInfo__header}>
        <div className={styles.orderInfo__header_top}>
          <span>№{order.id}</span>
          <div className={styles.orderInfo__header_status}>
            <span
              className={classNames(styles.orderInfo__header_indicator, {
                [styles[colorIndicator as string]]: true,
              })}
            ></span>
            <span>{statusName}</span>
          </div>
        </div>
        <div
          className={classNames(styles.orderInfo__header_body, {
            [styles.orderInfo__header_body_open]: isOpen,
          })}
        >
          <div className={styles.orderInfo__header_orderDate}>
            <h6>Дата замовлення:</h6>
            <time>{formatDate(order.orderDate)}</time>
          </div>
          <div className={styles.orderInfo__header_totalPrice}>
            <h6>Загальна сума:</h6>
            <span>{numberToCurrency(order.total)}</span>
          </div>
          <div className={styles.orderInfo__header_orderPreview}>{}</div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              className={classNames(styles.orderInfo__header_arrow, {
                [styles.orderInfo__header_arrow_open]: isOpen,
              })}
              src={arrow}
              alt="arrow"
            />
          </button>
        </div>
      </header>
      <section
        className={classNames(styles.orderInfo__body, {
          [styles.orderInfo__body_open]: isOpen,
        })}
      >
        <div className={styles.orderInfo__userData}>
          <div className={styles.orderInfo__userData_address}>
            <span>Телефон: </span>
            <span>Місто: {order.address.city}</span>
            <span>Тип доставки: {order.address.officeNovaPost}</span>
          </div>
          <Buttons
            firstBtn={{
              btnText: 'Скасувати замовлення',
              isBuy: true,
              onClick: () => {},
            }}
          />
        </div>
        <div className={styles.orderInfo__orderProducts}></div>
      </section>
    </div>
  );
};
