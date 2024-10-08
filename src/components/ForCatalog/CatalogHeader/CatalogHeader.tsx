"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import style from "./catalogHeader.module.scss";
import FiltersGroup from "../FiltersGroup/FiltersGroup";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import Range from "../Range/Range";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { Category, Product, ProductTypes } from "@/types/Product";
import {
  useParams,
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { createUrl } from "@/helpers/createUrlString";
import { BreedType } from "@/types/enums/BreedType";
import cn from "classnames";
import {
  getProductsByAnimalIdCount,
  getProductsByName,
  getProductsCount,
} from "@/helpers/fetchProducts";
import { createPortal } from "react-dom";
import useIsCurrentScreenSize from "@/hooks/useIsCurrentScreenSize";
import { RadioAmountType } from "@/types/RadioAmountType";
import { checkWindow } from "@/helpers/checkWindow";

const min = 0;
const max = 10000;
const step = 10;

interface Props {
  category: string;
  categories: Category[];
  type?: ProductTypes;
  className?: string;
}

export default function CatalogHeader({
  category,
  categories,
  type = "catalog",
  className,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const sortBy = searchParams.get("sortBy") || "";

  const appliedBreed = searchParams.get("breed");
  const appliedFrom = searchParams.get("from");
  const appliedTo = searchParams.get("to");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilterGroupOpen, setIsFilterGroupOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [queryToRequest, setQueryToRequest] = useState<string>("");
  const [breed, setBreed] = useState<BreedType>(BreedType.ALL);
  // Отримуємо ці дані перевіриивши продукти які приходять зі сервера
  const [minValue, setMinValue] = useState<number>(Number(appliedFrom) | min);
  const [maxValue, setMaxValue] = useState<number>(Number(appliedTo) || max);
  const [radioAmount, setRadioAmount] = useState<RadioAmountType>({
    all: 0,
    cats: 0,
    dogs: 0,
  });

  const amountOfFilters = useMemo(() => {
    const array = [appliedBreed, appliedFrom, appliedTo];
    const filteredArray = array.filter(Boolean);

    return filteredArray.length;
  }, [appliedBreed, appliedFrom, appliedTo]);

  useEffect(() => {
    getProductsCount().then((data) => {
      setRadioAmount((prev) => ({
        ...prev,
        all: data.count,
      }));
    });

    getProductsByAnimalIdCount(1).then((data) => {
      setRadioAmount((prev) => ({
        ...prev,
        dogs: data.count,
      }));
    });

    getProductsByAnimalIdCount(2).then((data) => {
      setRadioAmount((prev) => ({
        ...prev,
        cats: data.count,
      }));
    });

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen, searchParams]);

  const isMobile = useIsCurrentScreenSize(435);

  useEffect(() => {
    setIsLoading(true);
    getProductsByName({ name: queryToRequest, page: "0", size: "8" }, false)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        throw new Error("Current error:" + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryToRequest]);

  const closeClickHandler = () => {
    setIsModalOpen(false);
  };

  const selectCategoryHandler = () => {
    setIsCategoryOpen(false);
  };

  const selectSortHandler = () => {
    setIsSortOpen(false);
  };

  const saveClickHandler = () => {
    const urlString = createUrl(
      [
        { name: "breed", value: breed },
        { name: "from", value: minValue.toString() },
        { name: "to", value: maxValue.toString() },
        { name: "pageIndex", value: "1" },
      ],
      searchParams
    );
    const url = `${pathname}?${urlString}`;
    router.push(url);

    setIsFilterGroupOpen(false);
    setIsModalOpen(false);
  };

  const clearClickHandler = () => {
    const paramsToDelete = ["breed", "from", "to"];
    const urlSearchParams = new URLSearchParams(
      checkWindow() ? window.location.search : "/"
    );

    paramsToDelete.forEach((param) => {
      if (urlSearchParams.has(param)) {
        urlSearchParams.delete(param);
      }
    });

    const newUrl = `${
      checkWindow() && window.location.pathname
    }?${urlSearchParams.toString()}`;
    window.history.replaceState({}, document.title, newUrl);

    setBreed(BreedType.ALL);
    setMinValue(min);
    setMaxValue(max);
    setIsFilterGroupOpen(false);
    setIsModalOpen(false);
  };

  return (
    <div className={cn(style.header, [className])}>
      <div className={style.header__wrapper}>
        {type !== "admin-panel" && (
          <Select
            isOpen={isCategoryOpen}
            setIsOpen={setIsCategoryOpen}
            styleName={cn(style.header__select, {
              [style.header__hide]: isSortOpen,
              [style.header__selectGreen]: category !== "all",
              [style.header__selectActive]: isCategoryOpen,
            })}
            currentItemId={params.category || "all"}
            onClick={selectCategoryHandler}
            content={categories}
            type="noBorder"
            action="category"
            isMobile={isMobile}
          />
        )}
        <Input
          styleName={cn(style.header__input, {
            [style.header__inputAdmin]: type === "admin-panel",
          })}
          query={query}
          setQuery={setQuery}
          setQueryToRequest={setQueryToRequest}
          placeholder="Пошук"
          products={products}
          isLoading={isLoading}
          type={type}
        />
        <FiltersGroup
          isOpen={isFilterGroupOpen}
          setIsOpen={setIsFilterGroupOpen}
          styleName={cn(style.header__group, {
            [style.header__groupAdmin]: type === "admin-panel",
          })}
        >
          <RadioGroup
            setBreed={setBreed}
            breed={breed}
            place="catalog"
            styleName={style.header__radio}
            title="Тваринки"
            radioAmount={radioAmount}
          />
          <Range
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            min={min}
            max={max}
          />
          <Button
            styleName={style.header__save}
            title="Зберегти"
            onClick={saveClickHandler}
          />
          <Button
            styleName={style.header__clear}
            title="Очистити"
            onClick={clearClickHandler}
          />
        </FiltersGroup>
        <Button
          styleName={cn(style.header__filter, {
            [style.header__hide]: isSortOpen || isCategoryOpen,
            [style.header__filterGreen]: amountOfFilters,
            [style.header__filterAdmin]: type === "admin-panel",
          })}
          title={
            isMobile && amountOfFilters
              ? `Фільтри (${amountOfFilters})`
              : "Фільтри"
          }
          onClick={() => setIsModalOpen(true)}
        />
        <Select
          isOpen={isSortOpen}
          setIsOpen={setIsSortOpen}
          styleName={cn(style.header__sort, {
            [style.header__hide]: isCategoryOpen,
            [style.header__sortGreen]: sortBy,
            [style.header__sortActive]: isSortOpen,
            [style.header__sortAdmin]: type === "admin-panel",
          })}
          currentItemId={sortBy}
          onClick={selectSortHandler}
          type="border"
          action="sort"
          isMobile={isMobile}
        />
      </div>

      <Input
        styleName={style.header__input__mobile}
        query={query}
        setQuery={setQuery}
        setQueryToRequest={setQueryToRequest}
        placeholder="Пошук"
        products={products}
        isLoading={isLoading}
      />

      {isModalOpen &&
        createPortal(
          <Modal title="Фільтри" onClose={closeClickHandler}>
            <RadioGroup
              setBreed={setBreed}
              breed={breed}
              place="catalog"
              styleName={style.header__radio}
              title="Тваринки"
              radioAmount={radioAmount}
            />
            <Range
              setMinValue={setMinValue}
              setMaxValue={setMaxValue}
              minValue={minValue}
              maxValue={maxValue}
              step={step}
              min={min}
              max={max}
            />
            <Button
              styleName={style.header__save}
              title="Зберегти"
              onClick={saveClickHandler}
            />
            <Button
              styleName={style.header__clear}
              title="Очистити"
              onClick={clearClickHandler}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
}
