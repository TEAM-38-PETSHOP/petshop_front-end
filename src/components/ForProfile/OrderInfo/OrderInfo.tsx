'use client';
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
import { cancelOrder, deleteOrder, renewOrder } from '@/helpers/fetchOrder';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/types/CustomSession';
import { DeliveryStatus } from '@/types/enums/DeliveryStatus';
import { toast } from 'react-toastify';
import { getTranslatedOrderStatus } from '@/helpers/getTranslatedOrderStatus';

type Props = {
  order: IOrderResponse;
  setLocalOrders: React.Dispatch<React.SetStateAction<IOrderResponse[]>>;
};

export const OrderInfo = ({ order, setLocalOrders }: Props) => {
  const { data: session } = useSession();
  const customSession = session as unknown as CustomSession;

  const [isOpen, setIsOpen] = useState(false);
  const { statusName, colorIndicator } = checkStatusOrder(order.status);
  const isFinished =
    order.status === DeliveryStatus.Completed ||
    order.status === DeliveryStatus.Cancelled ||
    order.status === DeliveryStatus.Refunded;
  const isCanRemove =
    order.status === DeliveryStatus.Pending ||
    order.status === DeliveryStatus.Processing;

  const handleCancelOrder = () => {
    toast
      .promise(cancelOrder(order.id, customSession?.accessToken), {
        pending: ' ',
        success: 'Замовлення скасовано',
        error: 'Помилка скасування замовлення',
      })
      .then(() =>
        setLocalOrders((prev) =>
          prev.map((or) => {
            if (or.id === order.id) {
              return { ...or, status: DeliveryStatus.Cancelled };
            }

            return or;
          })
        )
      );
  };

  const handleRenewOrder = () => {
    toast
      .promise(renewOrder(order.id, customSession?.accessToken), {
        pending: ' ',
        success: 'Замовлення оновлено',
        error: 'Помилка оновлення замовлення',
      })
      .then((res) => setLocalOrders((prev) => [...prev, res]));
  };

  const handleDeleteOrder = () => {
    toast
      .promise(deleteOrder(order.id, customSession?.accessToken), {
        pending: ' ',
        success: 'Замовлення видалено',
        error: 'Помилка видалення замовлення',
      })
      .then(() =>
        setLocalOrders((prev) => prev.filter((or) => or.id !== order.id))
      );
  };

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
          <div className={styles.orderInfo__header_orderPreview}>
            {order.orderItems.slice(0, 3).map((product) => (
              <Image
                key={product.id}
                src={product.productDto.imageUrls[0]}
                width={50}
                height={50}
                alt="product"
              />
            ))}
            {order.orderItems.length > 3 && (
              <span>+{order.orderItems.length - 3}</span>
            )}
          </div>

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
            <span>
              Стан замовлення: {getTranslatedOrderStatus(order.status)}
            </span>
            <span>Телефон: {order.phone}</span>
            <span>Місто: {order.address.city}</span>
            <span>Тип доставки: {order.address.officeNovaPost}</span>
          </div>
          {isFinished ? (
            <Buttons
              className={styles.orderInfo__userData_buttons}
              firstBtn={{
                btnText: 'Повторити замовлення',
                isBuy: true,
                type: 'button',
                onClick: handleRenewOrder,
              }}
              secondBtn={{
                btnText: 'Видалити замовлення',
                isBuy: true,
                className: styles.orderInfo__userData_buttonDelete,
                type: 'button',
                onClick: handleDeleteOrder,
              }}
            />
          ) : (
            <Buttons
              firstBtn={{
                btnText: 'Скасувати замовлення',
                type: 'button',
                className: styles.orderInfo__userData_button,
                isBuy: true,
                onClick: isCanRemove ? handleCancelOrder : () => {},
                isDisabled: !isCanRemove,
              }}
            />
          )}
        </div>
        <div className={styles.orderInfo__orderProducts}>
          {order.orderItems.map(({ productDto, quantity, price, id }) => (
            <div
              key={id}
              className={styles.orderInfo__orderProduct}
            >
              <Image
                src={productDto.imageUrls[0]}
                width={100}
                height={100}
                alt={productDto.name}
              />
              <div className={styles.orderInfo__orderProduct_description}>
                <h6 className={styles.orderInfo__orderProduct_category}>
                  {productDto.categories[0].name}
                </h6>
                <h3 className={styles.orderInfo__orderProduct_name}>
                  {productDto.name}
                </h3>
              </div>
              <span className={styles.orderInfo__orderProduct_quantity}>
                {quantity}шт
              </span>
              <span className={styles.orderInfo__orderProduct_price}>
                {numberToCurrency(price)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
