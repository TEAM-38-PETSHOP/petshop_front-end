"use client";

import { useRef, useState } from "react";
import style from "./filtersGroup.module.scss";
import Image from "next/image";
import arrow from "@@/images/icons/smallArrowDown.svg";
import cn from "classnames";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  title?: string;
  children: React.ReactNode;
  styleName?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function FiltersGroup({
  title = "Фільтри",
  children,
  styleName,
  isOpen,
  setIsOpen,
}: Props) {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <div className={cn([styleName], style.filters)} ref={selectRef}>
      <div className={style.filters__button} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <Image
          className={cn({
            [style.filters__img]: !isOpen,
            [style.filters__imgActive]: isOpen,
          })}
          src={arrow}
          alt="arrow"
          priority
        />
      </div>

      <div
        className={cn([style.filters__content], {
          [style.filters__contentActive]: isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
}
