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
import { Category, Product } from "@/types/Product";
import {
  useParams,
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { createUrl } from "@/helpers/createUrlString";
import { BreedType } from "@/types/enums/BreedType";
import cn from "classnames";
import { useDebounce } from "@/hooks/useDebounce";

const hardcodedProducts = [
  {
    productId: 1,
    name: 'Сухий корм для собак мініатюрних і шось там дуже багато іншого тексту',
    brand: "Тут має бути Бренд",
    description: "Тут має бути Опис",
    price: 721.65,
    imageUrls: [
      "../../../public/products/1.jpg",
    ],
    countryProduct: 'Country',
    groupProduct: 'groupProduct',
    breedSize: 'breedSize',
    type: 'type',
    packaging: 'packaging',
    entryDate: 'entryDate',
    animals: [
      {
        animalId: 1,
        name: 'test',
      }
    ],
    categories: [
      {
        categoryId: 1,
        name: 'test name',
        description: 'test description',
      }
    ],
  },
  {
    productId: 2,
    name: 'Сухий корм для собак мініатюрних і шось там дуже багато іншого тексту',
    brand: "Тут має бути Бренд",
    description: "Тут має бути Опис",
    price: 721.65,
    imageUrls: [
      "../../../public/products/1.jpg",
    ],
    countryProduct: 'Country',
    groupProduct: 'groupProduct',
    breedSize: 'breedSize',
    type: 'type',
    packaging: 'packaging',
    entryDate: 'entryDate',
    animals: [
      {
        animalId: 1,
        name: 'test',
      }
    ],
    categories: [
      {
        categoryId: 1,
        name: 'test name',
        description: 'test description',
      }
    ],
  },
  {
    productId: 3,
    name: 'Сухий корм для собак мініатюрних і шось там дуже багато іншого тексту',
    brand: "Тут має бути Бренд",
    description: "Тут має бути Опис",
    price: 721.65,
    imageUrls: [
      "../../../public/products/1.jpg",
    ],
    countryProduct: 'Country',
    groupProduct: 'groupProduct',
    breedSize: 'breedSize',
    type: 'type',
    packaging: 'packaging',
    entryDate: 'entryDate',
    animals: [
      {
        animalId: 1,
        name: 'test',
      }
    ],
    categories: [
      {
        categoryId: 1,
        name: 'test name',
        description: 'test description',
      }
    ],
  }
]

const min = 0;
const max = 1000;

interface Props {
  category: string;
  categories: Category[];
}

export default function CatalogHeader({ category, categories }: Props) {
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
  // робити запит на сервер з використанням debounce
  const [products, setProducts] = useState<Product[]>(hardcodedProducts);
  const [query, setQuery] = useState<string>("");
  const [breed, setBreed] = useState<BreedType>(BreedType.ALL);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // Отримуємо ці дані перевіриивши продукти які приходять зі сервера
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  const amountOfFilters = useMemo(() => {
    const array = [appliedBreed, appliedFrom, appliedTo];
    const filteredArray = array.filter(Boolean);

    return filteredArray.length;
  }, [appliedBreed, appliedFrom, appliedTo]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 435);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      ],
      searchParams
    );
    const url = `${pathname}?${urlString}`;
    router.push(url);

    setIsModalOpen(false);
  };

  const clearClickHandler = () => {
    const paramsToDelete = ["breed", "from", "to"];
    const urlSearchParams = new URLSearchParams(window.location.search);

    paramsToDelete.forEach((param) => {
      if (urlSearchParams.has(param)) {
        urlSearchParams.delete(param);
      }
    });

    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.replaceState({}, document.title, newUrl);

    setBreed(BreedType.ALL);
    setMinValue(min);
    setMaxValue(max);
  };

  const makeRequest = useDebounce((query: string) => {
    console.log(query);
  }, 500);

  makeRequest(query);

  return (
    <div className={style.header}>
      <div className={style.header__wrapper}>
        <Select
          isOpen={isCategoryOpen}
          setIsOpen={setIsCategoryOpen}
          styleName={cn(style.header__select, {
            [style.header__hide]: isSortOpen,
            [style.header__selectGreen]: category !== "all",
            [style.header__selectActive]: isCategoryOpen,
          })}
          currentItemId={Number(params.category) || "all"}
          onClick={selectCategoryHandler}
          content={categories}
          type="noBorder"
          action="category"
          isMobile={isMobile}
        />
        {/* Передавати сюди продукти які потрібно відображати в дропдауні */}
        <Input
          styleName={style.header__input}
          query={query}
          setQuery={setQuery}
          placeholder="Пошук"
          products={products}
        />
        <FiltersGroup styleName={style.header__group}>
          <RadioGroup
            setBreed={setBreed}
            breed={breed}
            place="catalog"
            styleName={style.header__radio}
          />
          <Range
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            minValue={minValue}
            maxValue={maxValue}
            step={1}
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
          })}
          currentItemId={sortBy}
          onClick={selectSortHandler}
          type="border"
          action="sort"
          isMobile={isMobile}
        />
      </div>

      {/* Передавати сюди продукти які потрібно відображати в дропдауні */}
      <Input
        styleName={style.header__input__mobile}
        query={query}
        setQuery={setQuery}
        placeholder="Пошук"
        products={products}
      />

      {isModalOpen && (
        <Modal title="Фільтри" onClose={closeClickHandler}>
          <RadioGroup
            setBreed={setBreed}
            breed={breed}
            place="catalog"
            styleName={style.header__radio}
          />
          <Range
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            minValue={minValue}
            maxValue={maxValue}
            step={1}
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
        </Modal>
      )}
    </div>
  );
}
