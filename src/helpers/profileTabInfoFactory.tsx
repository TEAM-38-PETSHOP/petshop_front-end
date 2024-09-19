import { OrdersHistory } from '@/components/ForProfile';
import { ContactInfo } from '@/components/ForProfile';
import { ProfileTab } from '@/types';

export const profileTabInfoFactory = (activeTab: ProfileTab) => {
  switch (activeTab) {
    case ProfileTab.AddressBook:
      return 'Address Book Tab';

    case ProfileTab.OrdersHistory:
      return <OrdersHistory />;

    case ProfileTab.Feedback:
      return 'Feedback Tab';

    case ProfileTab.ContactInfo:
    default:
      return <ContactInfo />;
  }
};
