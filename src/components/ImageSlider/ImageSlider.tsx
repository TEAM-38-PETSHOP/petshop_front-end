'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './imageSlider.module.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
};

export default function ImageSlider({ images }: Props) {
  const maxImages = images.slice(0, 4);
  const [currImg, setCurrImg] = useState(maxImages[0]);
  const selectImg = (img: string) => {
    setCurrImg(img);
  };
  const toggleImg = (direction: 'next' | 'prev') => {
    setCurrImg((prevImg) => {
      const index = maxImages.findIndex((image) => image === prevImg);
      const directionIndex = direction === 'next' ? index + 1 : index - 1;
      const checkIndex =
        directionIndex < 0
          ? maxImages.length - 1
          : directionIndex > maxImages.length - 1
          ? 0
          : directionIndex;

      return maxImages[checkIndex];
    });
  };

  return (
    <div className={styles.imageSlider}>
      <div className={styles.imageSlider__mainBlock}>
        <button
          data-testid="button-prev"
          type="button"
          onClick={() => toggleImg('prev')}
        ></button>
        <Image
          className={styles.imageSlider__currentImg}
          src={currImg}
          width={483}
          height={483}
          alt="large"
        />
        <button
          data-testid="button-next"
          type="button"
          onClick={() => toggleImg('next')}
        ></button>
      </div>

      <ul className={styles.imageSlider__list}>
        {maxImages.map((img) => (
          <li key={img}>
            <button
              type="button"
              onClick={() => selectImg(img)}
            >
              <Image
                className={classNames([styles.imageSlider__item], {
                  [styles.imageSlider__active]: img === currImg,
                })}
                src={img}
                width={100}
                height={100}
                alt="thumb"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
