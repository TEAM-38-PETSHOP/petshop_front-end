import { Fragment } from "react";
import { AccordionItem } from "@/components";
import styles from "./accordion.module.scss";
import { ProfileTab } from "@/types";
import { profileTabInfoFactory } from "@/helpers";
import { ProfileListType } from "@/constants";

type AccorionData = ProfileListType[];

interface AccordionProps {
  data: AccorionData;
  searchParams: { activeTab: ProfileTab };
}

export const Accordion = ({ data, searchParams }: AccordionProps) => {
  const activeTab = searchParams?.activeTab || null;

  return (
    <div className={styles.accordion}>
      {data.map((item) => (
        <Fragment key={item.id}>
          <AccordionItem
            tabId={item.tabId}
            title={item.listName}
            isOpen={activeTab === item.tabId}
          >
            {profileTabInfoFactory(item.tabId)}
          </AccordionItem>
        </Fragment>
      ))}
    </div>
  );
};
