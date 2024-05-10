import { createUrlString } from "@/helpers/createUrlString";
import style from "./paggination.module.scss";
import Arrow from "@/components/Arrow/Arrow";
import cn from "classnames";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Fragment } from "react";

interface Props {
  pageIndex: number;
  amount: number;
}

export default function Paggination({
  pageIndex,
  amount,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const visiblePages = 3;
  const startPage = Math.max(1, pageIndex + 1 - Math.floor(visiblePages / 2));
  const endPage = Math.min(amount, startPage + visiblePages - 1);
  const pages = Array.from({ length: amount }, (_, index) => index + 1);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;

  const changePage = (page: number) => {
    if (page === pageIndex + 1) return;
    
    const urlString = createUrlString("pageIndex", String(page), searchParams);
    const url = `${pathname}?${urlString}`;
    router.push(url);
  };

  const prevPage = () => {
    if (isFirstPage) return;

    changePage(pageIndex);
  };
  const nextPage = () => {
    if (isLastPage) return;

    changePage(pageIndex + 2);
  };

  return (
    <div className={style.paggination}>
      <Arrow
        onClick={prevPage}
        styleName={cn(style.paggination__arrow)}
        direction="left"
        disabled={isFirstPage}
      />
      <div className={style.paggination__pages}>
        {pages.slice(startPage - 1, endPage).map((el) => (
          <Fragment key={el}>
            {startPage > 1 && el === startPage && (
              <>
                <button
                  type="button"
                  className={cn(style.paggination__page, {
                    [style.paggination__pageActive]: pageIndex === 0,
                  })}
                  onClick={() => changePage(1)}
                >
                  {1}
                </button>

                <button
                  className={style.paggination__dots}
                  type="button"
                  disabled
                >
                  ...
                </button>
              </>
            )}

            <button
              type="button"
              className={cn(style.paggination__page, {
                [style.paggination__pageActive]: pageIndex + 1 === el,
              })}
              onClick={() => changePage(el)}
            >
              {el}
            </button>

            {endPage < amount && el === endPage && (
              <>
                <button
                  className={style.paggination__dots}
                  type="button"
                  disabled
                >
                  ...
                </button>

                <button
                  type="button"
                  className={cn(style.paggination__page, {
                    [style.paggination__pageActive]: pageIndex + 1 === amount,
                  })}
                  onClick={() => changePage(amount)}
                >
                  {amount}
                </button>
              </>
            )}
          </Fragment>
        ))}
      </div>
      <Arrow
        onClick={nextPage}
        styleName={cn(style.paggination__arrow)}
        direction="right"
        disabled={isLastPage}
      />
    </div>
  );
}
