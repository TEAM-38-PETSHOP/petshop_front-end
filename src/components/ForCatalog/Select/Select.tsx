"use client";

import React, { useMemo, useRef } from "react";
import style from "./select.module.scss";
import Image from "next/image";
import arrow from "@@/images/icons/smallArrowDown.svg";
import cn from "classnames";
import useClickOutside from "@/hooks/useClickOutside";
import { Category } from "@/types/Product";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { createUrl, createUrlString } from "@/helpers/createUrlString";
import { truncateText } from "@/helpers/truncateText";

const sortList = [
  {
    id: 1,
    name: "Від найновіших",
    value: "newest",
  },
  {
    id: 2,
    name: "Від найдешевших",
    value: "cheapest",
  },
  {
    id: 3,
    name: "Від найдорожчих",
    value: "expensive",
  }
];

type SelectType = "border" | "noBorder";
type SelectAction = "sort" | "category";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: SelectType;
  styleName?: string;
  action: SelectAction;
  content?: Category[];
  currentItemId: string | string[];
  onClick: () => void;
  isMobile?: boolean;
}

export default React.memo(function Select({
  action = "sort",
  type = "noBorder",
  styleName,
  content,
  currentItemId,
  onClick,
  isOpen,
  setIsOpen,
  isMobile = false,
}: Props) {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategory = useMemo(() => {
    if (action === "category") {
      const category = content?.find((item) => item.categoryNameId === currentItemId);

      return category?.name || "Всі товари";
    }

    const sort = sortList.find((item) => item.value === currentItemId)?.name;
    const defaultText = "Сортувати";

    return sort ? sort : defaultText;
  }, [action, content, currentItemId]);

  useClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <div className={cn([styleName], style.select, 'green')} ref={selectRef}>
      <div
        className={cn(style.select__btn, {
          [style.select__btnActive]: isOpen,
          [style.select__btnBorder]: type === "border",
          [style.select__btnNoBorder]: type === "noBorder",
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isMobile ? truncateText(currentCategory, 9) : currentCategory}
        <Image
          className={cn({
            [style.select__img]: !isOpen,
            [style.select__imgActive]: isOpen,
          })}
          src={arrow}
          alt="arrow"
          priority
        />
      </div>
      <div
        className={cn([style.select__content], {
          [style.select__contentActive]: isOpen,
        })}
      >
        {action === "category"
          ? content && (
            <>
              <Link
                href={{
                  pathname: `/catalog/all`,
                  query: createUrl([{name: 'pageIndex', value: '1'}], searchParams),
                }}
                className={cn(style.select__item, 'green', {
                  [style.select__itemActive]: currentItemId === 'all',
                })}
                onClick={onClick}
              >
                {"Всі товари"}
              </Link>
              {content.map((item) => (
                <Link
                  href={{
                    pathname: `/catalog/${item.categoryNameId}`,
                    query: createUrl([{name: 'pageIndex', value: '1'}], searchParams),
                  }}
                  key={item.categoryId}
                  className={cn(style.select__item, {
                    [style.select__itemActive]: currentItemId === item.categoryNameId,
                  })}
                  onClick={onClick}
                >
                  {item.name}
                </Link>
              ))}
            </>
          )
          : sortList.map((item) => (
              <Link
                href={{
                  pathname,
                  query: createUrlString("sortBy", item.value, searchParams),
                }}
                key={item.id}
                className={cn(style.select__item, {
                  [style.select__itemActive]: currentItemId === item.value,
                })}
                onClick={onClick}
              >
                {item.name}
              </Link>
            ))}
      </div>
    </div>
  );
}
);