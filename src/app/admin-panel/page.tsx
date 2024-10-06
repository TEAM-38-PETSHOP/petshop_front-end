import AdminPanelSidebar from '@/components/ForAdminPanel/AdminPanelSidebar/AdminPanelSidebar';
import styles from './adminPanel.module.scss';
import { AdminPanelTabs } from '@/types/enums/AdminPanelTabs';
import { adminPanelFactory } from '@/factories/adminPanelFactory';
import Head from 'next/head';

type Props = {
  searchParams: { activeTab: AdminPanelTabs };
};

export default function AdminPanel({ searchParams }: Props) {
  return (
    <div className={styles.adminPanel}>
      <Head>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>

      <AdminPanelSidebar searchParams={searchParams} />
      {adminPanelFactory(searchParams.activeTab)}
    </div>
  );
}
