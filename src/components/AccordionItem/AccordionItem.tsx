import styles from "./accordionItem.module.scss";
import cn from "classnames";
import { ArrowDownIcon } from "@/assets";
import Link from "next/link";
import { ProfileTab } from "@/types";

interface AccordionItemProps {
  title: string;
  tabId: ProfileTab;
  children: React.ReactNode;
  isOpen: boolean;
}

export const AccordionItem = ({
  title,
  tabId,
  children,
  isOpen,
}: AccordionItemProps) => {
  return (
    <div className={styles.accordionItem}>
      <Link
        className={cn(styles.accordionItem__button, {
          [styles.accordionItem__buttonActive]: isOpen,
        })}
        replace
        data-testid={`btn-${tabId}`}
        href={`${isOpen ? "/profile" : `?activeTab=${tabId}`}`}
      >
        <p className={styles.accordionItem__title}>{title}</p>
        <ArrowDownIcon isOpen={isOpen} />
      </Link>

      {isOpen && (
        <div
          className={cn(styles.accordionItem__container, {
            [styles.accordionItem__containerActive]: isOpen,
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};
