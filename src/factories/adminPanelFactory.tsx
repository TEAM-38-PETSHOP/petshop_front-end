import { AdminPanelTabs } from '@/types/enums/AdminPanelTabs';

export const adminPanelFactory = (activeTab: AdminPanelTabs) => {
  switch (activeTab) {
    case AdminPanelTabs.ShopCategories:
      return 'ShopCategories';
    case AdminPanelTabs.Goods:
      return 'Goods';
    case AdminPanelTabs.Users:
      return 'Users';
    case AdminPanelTabs.Orders:
      return 'Orders';
    case AdminPanelTabs.Grooming:
      return 'Grooming';
    case AdminPanelTabs.Reviews:
      return 'Reviews';
    default:
      return 'ShopCategories';
  }
};
