"use client";

import useIsCurrentScreenSize from "@/hooks/useIsCurrentScreenSize";
import ButtonWithArrow from "../../ButtonWithArrow/ButtonWithArrow";
import style from "./category.module.scss";
import cn from "classnames";
import Link from "next/link";

type variants = "white" | "green" | "orange";

interface Props {
  text: string;
  imgId: number;
  variant: variants;
  href: string;
}

export default function Category({ text, imgId, variant, href }: Props) {
  const isMobile = useIsCurrentScreenSize(435);
  const type = isMobile ? "button" : "link";

  return isMobile ? (
    <Link
      href={`${href}`}
      className={cn(style.category, {
        [style.category__one]: imgId === 1,
        [style.category__two]: imgId === 2,
        [style.category__three]: imgId === 3,
        [style.category__four]: imgId === 4,
        [style.category__five]: imgId === 5,
        [style.category__six]: imgId === 6,
        [style.category__seven]: imgId === 7,
      })}
    >
      <ButtonWithArrow
        text={text}
        href={`${href}`}
        variant={variant}
        type={type}
      />
    </Link>
  ) : (
    <div
      className={cn(style.category, {
        [style.category__one]: imgId === 1,
        [style.category__two]: imgId === 2,
        [style.category__three]: imgId === 3,
        [style.category__four]: imgId === 4,
        [style.category__five]: imgId === 5,
        [style.category__six]: imgId === 6,
        [style.category__seven]: imgId === 7,
      })}
    >
      <ButtonWithArrow
        text={text}
        href={`${href}`}
        variant={variant}
        type={type}
      />
    </div>
  );
}
