"use client";
import { Product } from "@/types/Product";
import style from "./input.module.scss";
import cn from "classnames";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { truncateText } from "@/helpers/truncateText";
import { useDebounce } from "@/hooks/useDebounce";
import useClickOutside from "@/hooks/useClickOutside";
import Loader from "@/components/Loader/Loader";

const wordLength = 33;

interface Props {
  query: string;
  setQuery: (value: string) => void;
  setQueryToRequest: (value: string) => void;
  placeholder?: string;
  styleName?: string;
  products?: Product[];
  isLoading: boolean;
}

export default React.memo(function Input({
  query,
  setQuery,
  setQueryToRequest,
  placeholder = "Пошук",
  styleName,
  products = [],
  isLoading = false,
}: Props) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

  const applyQueryString = useDebounce((query: string) => {
    setQueryToRequest(query);
  }, 500);

  const clearQuery = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setQuery("");
    setShowDropdown(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setShowDropdown(event.target.value.length > 0);

    applyQueryString(event.target.value);
  };

  useClickOutside(
    resultsRef,
    () => {
      setShowDropdown(false);
      setQuery("");
    },
    inputRef
  );

  return (
    <div className={cn([styleName], style.input)}>
      <input
        className={cn(style.input__field, {
          [style.input__fieldActive]: query.length > 0 || showDropdown,
        })}
        type="text"
        name="query"
        placeholder={placeholder}
        ref={inputRef}
        value={query}
        onChange={handleChange}
      />

      {query && (
        <>
          <button
            type="button"
            className={style.input__btn}
            data-testid="clear-button"
            onMouseDown={clearQuery}
          ></button>
          <div className={style.input__separator}></div>
        </>
      )}

      {showDropdown && query.length > 0 && products.length > 0 && (
        <ul ref={resultsRef} className={style.input__results}>
          {products.map((product) => (
            <li key={product.productId}>
              <Link
                href={`/catalog/product/${product.productId}`}
                className={style.input__result}
              >
                <Image
                  src={product.imageUrls[0]}
                  alt="Product Image"
                  width={40}
                  height={40}
                />
                <div className={style.input__resultInfo}>
                  <p className={style.input__resultName} data-testid={`product-${product.productId}`}>
                    {truncateText(product.name, wordLength)}
                  </p>
                  <p className={style.input__resultPrice} data-testid={`product-${product.productId}-price`}>
                    {product.price} грн
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isLoading && query && products.length === 0 && (
        <ul ref={resultsRef} className={style.input__results}>
          <li data-testid="loader" className={style.input__loader}>
            <Loader />
          </li>
        </ul>
      )}

      {showDropdown && !isLoading && products.length === 0 && (
        <ul ref={resultsRef} className={style.input__results}>
          <li className={style.input__noResults}>Нічого не знайдено</li>
        </ul>
      )}
    </div>
  );
});
