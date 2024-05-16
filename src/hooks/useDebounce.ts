/* eslint-disable react-hooks/exhaustive-deps */
import debounce from "lodash.debounce";
import { useMemo } from "react";

export function useDebounce(cb: (value: string) => void, delay: number) {
  return useMemo(() => debounce(cb, delay), []);
}