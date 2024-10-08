import { AdminPanelTabs } from "@/types/enums/AdminPanelTabs";
import { adminPanelFactory } from "@/factories/adminPanelFactory";

type Props = {
  searchParams: { activeTab: AdminPanelTabs };
};

export default function AdminPanel({ searchParams }: Props) {
  return <>{adminPanelFactory(searchParams.activeTab)}</>;
}
