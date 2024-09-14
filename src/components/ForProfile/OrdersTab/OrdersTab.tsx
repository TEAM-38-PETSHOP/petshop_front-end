import { IOrderResponse } from '@/types/OrderResponse';
import styles from './ordersTab.module.scss';
import { useSearchParams } from 'next/navigation';
import { getFilteredOrders } from '@/helpers/getFilteredOrders';
import { OrderInfo } from '../OrderInfo';
import { DeliveryStatus } from '@/types/enums/DeliveryStatus';

type Props = {
  orders: IOrderResponse[];
};

export const OrdersTab = ({ orders }: Props) => {
  const searchParams = useSearchParams();
  const deliveryStatus = searchParams?.get('deliveryStatus') || 'all';
  const [activeOrders, completedOrders, cancelledOrders] =
    getFilteredOrders(orders);

  const isShowActive =
    deliveryStatus === DeliveryStatus.Pending || deliveryStatus === 'all';
  const isShowCompleted =
    deliveryStatus === DeliveryStatus.Completed || deliveryStatus === 'all';
  const isShowCancelled =
    deliveryStatus === DeliveryStatus.Cancelled || deliveryStatus === 'all';

  return (
    <div className={styles.ordersTab}>
      {isShowActive &&
        activeOrders.map((order) => (
          <OrderInfo
            key={order.id}
            order={order}
          />
        ))}

      {isShowCompleted &&
        completedOrders.map((order) => (
          <OrderInfo
            key={order.id}
            order={order}
          />
        ))}

      {isShowCancelled &&
        cancelledOrders.map((order) => (
          <OrderInfo
            key={order.id}
            order={order}
          />
        ))}
    </div>
  );
};
