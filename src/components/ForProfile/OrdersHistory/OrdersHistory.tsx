'use client';
import { Suspense, useEffect, useState } from 'react';
import BasicFilter from '@/components/BasicFilter/BasicFilter';
import { OrdersTab } from '../OrdersTab';
import styles from './ordersHistory.module.scss';
import { deliveryStatus } from '@/constants';
import { getOrders } from '@/helpers/fetchOrder';
import { CustomSession } from '@/types/CustomSession';
import { useSession } from 'next-auth/react';
import { IOrderResponse } from '@/types/OrderResponse';
import Loader from '@/components/Loader/Loader';

export const OrdersHistory = () => {
  const { data: session } = useSession();
  const customSession = session as unknown as CustomSession;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IOrderResponse[]>([]);

  useEffect(() => {
    setIsLoading(true);

    if (customSession?.accessToken) {
      getOrders(customSession.accessToken)
        .then((res) => setOrders(res))
        .finally(() => setIsLoading(false));
    }
  }, [customSession?.accessToken]);

  return (
    <Suspense>
      <div className={styles.ordersHistory}>
        <BasicFilter
          filterList={deliveryStatus}
          searchParamsName="deliveryStatus"
        />
        {isLoading ? <Loader /> : <OrdersTab orders={orders} />}
      </div>
    </Suspense>
  );
};
