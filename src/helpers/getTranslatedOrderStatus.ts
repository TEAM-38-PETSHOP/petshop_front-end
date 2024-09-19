import { DeliveryStatus } from '@/types/enums/DeliveryStatus';

export const getTranslatedOrderStatus = (status: DeliveryStatus) => {
  switch (status) {
    case DeliveryStatus.Pending:
      return 'В очікуванні';
    case DeliveryStatus.Processing:
      return 'Обробка';
    case DeliveryStatus.Shipped:
      return 'Відправлено';
    case DeliveryStatus.Delivered:
      return 'Доставлено';
    case DeliveryStatus.Completed:
      return 'Завершено';
    case DeliveryStatus.Cancelled:
      return 'Скасовано';
    case DeliveryStatus.Refunded:
      return 'Повернено';
    default:
      return '...';
  }
};
