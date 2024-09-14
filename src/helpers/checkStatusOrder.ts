import { DeliveryStatus } from '@/types/enums/DeliveryStatus';

interface statusOrder {
  statusName: string;
  colorIndicator?: 'green' | 'blue' | 'red';
}

export const checkStatusOrder = (status: string): statusOrder => {
  switch (status) {
    case DeliveryStatus.Pending ||
      DeliveryStatus.Processing ||
      DeliveryStatus.Shipped ||
      DeliveryStatus.Delivered:
      return { statusName: 'Активне', colorIndicator: 'green' };
    case DeliveryStatus.Completed:
      return { statusName: 'Завершене', colorIndicator: 'blue' };
    case DeliveryStatus.Cancelled:
      return { statusName: 'Скасоване', colorIndicator: 'red' };
    default:
      return { statusName: 'Невідомо' };
  }
};
