/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  reserve?: RefObject<HTMLElement>,
) {
  const handleClick = (event: MouseEvent) => {
    if (
      (ref.current && !ref.current.contains(event.target as Node)) &&
      (!reserve || (reserve.current && !reserve.current.contains(event.target as Node)))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, reserve, callback]);
}
