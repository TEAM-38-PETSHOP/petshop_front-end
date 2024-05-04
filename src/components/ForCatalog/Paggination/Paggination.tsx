import style from "./paggination.module.scss";
import Arrow from "@/components/Arrow/Arrow";
import cn from "classnames";

interface Props {
  pageIndex: number;
  amount: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Paggination({
  pageIndex,
  amount,
  setPageIndex,
}: Props) {
  const pages = Array.from({ length: amount | 1 });
  const firstPage = pageIndex === 0;
  const lastPage = pageIndex === pages.length - 1;
  const prevPage = () => {
    // Do api request for prev page
    if (firstPage) return;
    
    setPageIndex((prev) => prev - 1);
  };
  const nextPage = () => {
    // Do api request for next page
    if (lastPage) return;

    setPageIndex((prev) => prev + 1);
  };
  return (
    <div className={style.paggination}>
      <Arrow
        onClick={prevPage}
        styleName={cn(style.paggination__arrow)}
        direction="left"
        disabled={firstPage}
      />
      <div className={style.paggination__pages}>
        {/* Map pages here depends amount of products on API */}
        {pages.map((_, index) => (
          <button
            key={index}
            className={cn(style.paggination__page, {
              [style.paggination__pageActive]: index === pageIndex,
            })}
            type="button"
            onClick={() => setPageIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Arrow
        onClick={nextPage}
        styleName={cn(style.paggination__arrow)}
        direction="right"
        disabled={lastPage}
      />
    </div>
  );
}
