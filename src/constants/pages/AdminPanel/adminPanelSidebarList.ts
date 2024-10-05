import { AdminPanelTabs } from '@/types';

import cartIcon from '@@/images/icons/cart.svg';
import groomingIcon from '@@/images/icons/grooming.svg';
import ordersIcon from '@@/images/icons/orders.svg';
import shopCategoriesIcon from '@@/images/icons/shopCategories.svg';
import reviewsIcon from '@@/images/icons/reviews.svg';
import usersIcon from '@@/images/icons/users.svg';

export interface AdminPanelSidebarListType {
  id: number;
  tabName: string;
  tabId: AdminPanelTabs;
  tabIcon: { src: string };
}

export const adminPanelSidebarList: AdminPanelSidebarListType[] = [
  {
    id: 1,
    tabName: 'Категорії магазину',
    tabId: AdminPanelTabs.ShopCategories,
    tabIcon: shopCategoriesIcon,
  },
  {
    id: 2,
    tabName: 'Товари',
    tabId: AdminPanelTabs.Goods,
    tabIcon: cartIcon,
  },
  {
    id: 3,
    tabName: 'Користувачі',
    tabId: AdminPanelTabs.Users,
    tabIcon: usersIcon,
  },
  {
    id: 4,
    tabName: 'Замовлення',
    tabId: AdminPanelTabs.Orders,
    tabIcon: ordersIcon,
  },
  {
    id: 5,
    tabName: 'Грумінг',
    tabId: AdminPanelTabs.Grooming,
    tabIcon: groomingIcon,
  },
  {
    id: 6,
    tabName: 'Відгуки',
    tabId: AdminPanelTabs.Reviews,
    tabIcon: reviewsIcon,
  },
];
