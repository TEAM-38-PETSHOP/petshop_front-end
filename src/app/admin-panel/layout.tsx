"use client";

import AdminPanelSidebar from "@/components/ForAdminPanel/AdminPanelSidebar/AdminPanelSidebar";
import Head from "next/head";
import styles from "./adminPanel.module.scss";
import { useSearchParams } from "next/navigation";
import { AdminPanelTabs } from "@/types";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab") as AdminPanelTabs;

  return (
    <div className={styles.adminPanel}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminPanelSidebar searchParams={{ activeTab }} />
      {children}
    </div>
  );
}
