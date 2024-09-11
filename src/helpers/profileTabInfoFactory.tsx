import { ContactInfo } from "@/components";
import { ProfileTab } from "@/types";

export const profileTabInfoFactory = (activeTab: ProfileTab) => {
  switch (activeTab) {
    case ProfileTab.AddressBook:
      return "Address Book Tab";

    case ProfileTab.OrdersHistory:
      return "Orders History Tab";

    case ProfileTab.Feedback:
      return "Feedback Tab";

    case ProfileTab.ContactInfo:
    default:
      return <ContactInfo />;
  }
};
