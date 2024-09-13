import { Suspense } from 'react';
import BasicFilter from '@/components/BasicFilter/BasicFilter';
import styles from './ordersHistory.module.scss';
import { deliveryStatus } from '@/constants';

export const OrdersHistory = () => {
  return (
    <div className={styles.ordersHistory}>
      <Suspense>
        <BasicFilter
          filterList={deliveryStatus}
          searchParamsName="deliveryStatus"
        />
      </Suspense>
    </div>
  );
};
