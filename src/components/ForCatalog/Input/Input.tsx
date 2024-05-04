"use client";
import { Product } from "@/types/Product";
import style from "./input.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import hardcodedProduct from "@@/images/prod.jpg";
import { truncateText } from "@/helpers/truncateText";

const wordLength = 33;

interface Props {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
  styleName?: string;
  products?: Product[];
}

export default function Input({
  query,
  setQuery,
  placeholder = "Пошук",
  styleName,
  products = [],
}: Props) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const clearQuery = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setQuery("");
    setShowDropdown(false);
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setShowDropdown(event.target.value.length > 0);
  };

  const handleOnBLur = () => {
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div className={cn([styleName], style.input)}>
      <input
        className={cn(style.input__field, {
          [style.input__fieldActive]: query.length > 0 || showDropdown,
        })}
        type="text"
        name="query"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onBlur={handleOnBLur}
      />

      {query && (
        <>
          <button
            type="button"
            className={style.input__btn}
            onClick={clearQuery}
          ></button>
          <div className={style.input__separator}></div>
        </>
      )}

      {showDropdown && query.length > 0 && products.length > 0 && (
        <ul className={style.input__results}>
          {products.map((product) => (
            <Link
              href={`/catalog/${product.productId}`}
              key={product.productId}
            >
              <li className={style.input__result}>
                <Image
                  src={hardcodedProduct}
                  alt="Product Image"
                  width={40}
                  height={40}
                />
                <div className={style.input__resultInfo}>
                  <p className={style.input__resultName}>
                    {truncateText(product.name, wordLength)}
                  </p>
                  <p className={style.input__resultPrice}>{product.price}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}

      {showDropdown && products.length === 0 && (
        <ul className={style.input__results}>
          <li className={style.input__noResults}>Нічого не знайдено</li>
        </ul>
      )}
    </div>
  );
}
