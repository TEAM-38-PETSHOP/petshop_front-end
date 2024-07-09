"use client";

import { useEffect, useRef } from "react";
import style from "./range.module.scss";

interface Props {
  minValue: number;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  maxValue: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  min: number;
  max: number;
}

export default function Range({
  step,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  min,
  max,
}: Props) {
  const rangeInputMinRef = useRef<HTMLInputElement>(null);
  const rangeInputMaxRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const defaultText = "Ціна, грн";

  useEffect(() => {
    if (rangeRef.current) {
      rangeRef.current.style.left = `${(minValue / max) * 100}%`;
      rangeRef.current.style.right = `${100 - (maxValue / max) * 100}%`;
    }
  }, [minValue, maxValue, max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = parseInt(e.target.value);

    if (
      inputName === "minPrice" &&
      maxValue - inputValue >= 20 &&
      inputValue >= 0 &&
      rangeInputMinRef.current
    ) {
      setMinValue(inputValue);
      rangeInputMinRef.current.value = inputValue.toString();
    } else if (
      inputName === "maxPrice" &&
      inputValue - minValue >= 20 &&
      inputValue <= max &&
      rangeInputMaxRef.current
    ) {
      setMaxValue(inputValue);
      rangeInputMaxRef.current.value = inputValue.toString();
    }
  };

  return (
    <div className={style.range}>
      <h3 className={style.range__title}>{defaultText}</h3>

      <div className={style.range__slider}>
        <div data-testid="range-progress" className={style.range__progress} ref={rangeRef}></div>
      </div>

      <div className={style.range__input}>
        <input
          type="range"
          className={style.range__min}
          min={min}
          max={max}
          name="minPrice"
          value={minValue}
          step={step}
          ref={rangeInputMinRef}
          onChange={handleInputChange}
          data-testid="minPrice"
        />
        <input
          type="range"
          className={style.range__max}
          min={min}
          max={max}
          name="maxPrice"
          value={maxValue}
          step={step}
          ref={rangeInputMaxRef}
          onChange={handleInputChange}
          data-testid="maxPrice"
        />
      </div>

      <div className={style.range__price}>
        <div className={style.range__field}>
          <span>Від</span>
          <input
            type="number"
            name="minPrice"
            className={style.range__numberMin}
            value={minValue}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.range__separator}>-</div>
        <div className={style.range__field}>
          <span>До</span>
          <input
            type="number"
            name="maxPrice"
            className={style.range__numberMax}
            value={maxValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
