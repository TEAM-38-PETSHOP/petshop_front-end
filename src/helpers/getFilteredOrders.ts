import { DeliveryStatus } from '@/types/enums/DeliveryStatus';
import { IOrderResponse } from '@/types/OrderResponse';

export const getFilteredOrders = (orders: IOrderResponse[]) => {
  let activeOrders: IOrderResponse[] = [];
  let completedOrders: IOrderResponse[] = [];
  let cancelledOrders: IOrderResponse[] = [];

  orders.forEach((order) => {
    switch (order.status) {
      case DeliveryStatus.Pending ||
        DeliveryStatus.Processing ||
        DeliveryStatus.Shipped ||
        DeliveryStatus.Delivered:
        activeOrders.push(order);
        break;
      case DeliveryStatus.Completed:
        completedOrders.push(order);
        break;
      case DeliveryStatus.Cancelled:
        cancelledOrders.push(order);
        break;
    }
  });

  return [activeOrders, completedOrders, cancelledOrders];
};
