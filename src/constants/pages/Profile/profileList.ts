import { ProfileTab } from "@/types";

export interface ProfileListType {
  id: number;
  listName: string;
  tabId: ProfileTab;
}

export const profileList = [
  {
    id: 1,
    listName: "Контактна інформація",
    tabId: ProfileTab.ContactInfo,
  },
  {
    id: 2,
    listName: "Адресна книга",
    tabId: ProfileTab.AddressBook,
  },
  {
    id: 3,
    listName: "Історія замовлень",
    tabId: ProfileTab.OrdersHistory,
  },
  {
    id: 4,
    listName: "Зворотній звʼязок",
    tabId: ProfileTab.Feedback,
  },
];