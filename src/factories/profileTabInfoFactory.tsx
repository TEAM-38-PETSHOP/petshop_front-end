import { OrdersHistory } from '@/components/ForProfile';
import { ContactInfo, Feedback } from '@/components/ForProfile';
import { ProfileTab } from '@/types';

export const profileTabInfoFactory = (activeTab: ProfileTab) => {
  switch (activeTab) {
    case ProfileTab.OrdersHistory:
      return <OrdersHistory />;

    case ProfileTab.Feedback:
      return <Feedback />;

    case ProfileTab.ContactInfo:
    default:
      return <ContactInfo />;
  }
};
