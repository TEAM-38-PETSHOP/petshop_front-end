"use client";

import React from "react";
import { BreedType } from "@/types/enums/BreedType";
import style from "./radioGroup.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrlString } from "@/helpers/createUrlString";
import cn from "classnames";

interface Props {
  place?: "categories" | "catalog";
  amount?: number[];
  styleName?: string;
  breed?: BreedType;
  setBreed?: (breed: BreedType) => void;
}

export default React.memo(function RadioGroup({
  place = "categories",
  styleName,
  setBreed = () => {},
  breed,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.get("breed");
  // amount for catalog

  const isRadioSelected = (breed: BreedType) => {
    if (!params && breed === BreedType.ALL) return true;

    return params === breed;
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBreed = e.target.value;
    const urlString = createUrlString("breed", selectedBreed, searchParams);
    const url = `${pathname}?${urlString}`;
    router.push(url);
  };

  console.log(place);

  return place === "categories" ? (
    <form
      data-testid="radio-group"
      className={cn(style.radio, style.categories)}
    >
      <label
        htmlFor="radio-all"
        className={cn(style.radio__item, style.categories__item)}
      >
        <input
          type="radio"
          id="radio-all"
          name="breed"
          value={BreedType.ALL}
          checked={isRadioSelected(BreedType.ALL)}
          onChange={changeHandler}
        />

        <span className={cn(style.radio__text, style.categories__text)}>
          Всі
        </span>
        <span className={style.checkmark}></span>
      </label>

      <label
        htmlFor="radio-cats"
        className={cn(style.radio__item, style.categories__item)}
      >
        <input
          type="radio"
          id="radio-cats"
          name="breed"
          value={BreedType.CATS}
          checked={isRadioSelected(BreedType.CATS)}
          onChange={changeHandler}
        />

        <span className={cn(style.radio__text, style.categories__text)}>
          Котики
        </span>
        <span className={style.checkmark}></span>
      </label>

      <label
        htmlFor="radio-dogs"
        className={cn(style.radio__item, style.categories__item)}
      >
        <input
          type="radio"
          id="radio-dogs"
          name="breed"
          value={BreedType.DOGS}
          checked={isRadioSelected(BreedType.DOGS)}
          onChange={changeHandler}
        />

        <span className={cn(style.radio__text, style.categories__text)}>
          Песики
        </span>
        <span className={style.checkmark}></span>
      </label>
    </form>
  ) : (
    <form
      data-testid="radio-group"
      className={cn([styleName], style.radio, style.catalog)}
    >
      <label
        htmlFor="radio-all"
        className={cn(style.radio__item, style.catalog__item)}
      >
        <input
          type="radio"
          id="radio-all"
          name="breed"
          value={BreedType.ALL}
          checked={breed === BreedType.ALL}
          onChange={() => setBreed(BreedType.ALL)}
        />

        <span className={cn(style.radio__text, style.catalog__text)}>Всі</span>
        <span className={style.checkmark}></span>
      </label>

      <label
        htmlFor="radio-cats"
        className={cn(style.radio__item, style.catalog__item)}
      >
        <input
          type="radio"
          id="radio-cats"
          name="breed"
          value={BreedType.CATS}
          checked={breed === BreedType.CATS}
          onChange={() => setBreed(BreedType.CATS)}
        />

        <span className={cn(style.radio__text, style.catalog__text)}>
          Котики
        </span>
        <span className={style.checkmark}></span>
      </label>

      <label
        htmlFor="radio-dogs"
        className={cn(style.radio__item, style.catalog__item)}
      >
        <input
          type="radio"
          id="radio-dogs"
          name="breed"
          value={BreedType.DOGS}
          checked={breed === BreedType.DOGS}
          onChange={() => setBreed(BreedType.DOGS)}
        />

        <span className={cn(style.radio__text, style.catalog__text)}>
          Песики
        </span>
        <span className={style.checkmark}></span>
      </label>
    </form>
  );
}
)