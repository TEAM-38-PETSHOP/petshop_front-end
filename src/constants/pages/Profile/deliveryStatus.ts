import { DeliveryStatus } from '@/types/enums/DeliveryStatus';

export interface DeliveryStatusType {
  id: number | string;
  name: string;
  colorIndicator: 'green' | 'blue' | 'red';
}

export const deliveryStatus: DeliveryStatusType[] = [
  {
    id: DeliveryStatus.Processing,
    name: 'Активні',
    colorIndicator: 'green',
  },
  {
    id: DeliveryStatus.Delivered,
    name: 'Доставлені',
    colorIndicator: 'blue',
  },
  {
    id: DeliveryStatus.Cancelled,
    name: 'Скасовані',
    colorIndicator: 'red',
  },
];
