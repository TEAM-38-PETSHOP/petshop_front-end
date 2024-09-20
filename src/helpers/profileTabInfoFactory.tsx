import { ContactInfo, Feedback } from "@/components";
import { ProfileTab } from "@/types";

export const profileTabInfoFactory = (activeTab: ProfileTab) => {
  switch (activeTab) {
    case ProfileTab.OrdersHistory:
      return "Orders History Tab";

    case ProfileTab.Feedback:
      return <Feedback />;

    case ProfileTab.ContactInfo:
    default:
      return <ContactInfo />;
  }
};
