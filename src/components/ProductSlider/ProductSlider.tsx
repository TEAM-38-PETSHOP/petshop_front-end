'use client';

import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './productSlider.module.scss';
import Image from 'next/image';
import catDog from '@@/images/drawn/catAndDog.png';
import ProductCard from '../ProductCard/ProductCard';
import Arrow from '../Arrow/Arrow';
import classNames from 'classnames';

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const product = {
  id: 1,
  name: 'Іграшка',
  description:
    'Сухий корм для собак мініатюрних порід з чутливим травленням Brit Care Mini GF Sensitive (оленина)',
  carPrice: 1200,
  price: 1000,
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-9_UxIYQW9PjA64fKI20glb0H2MxFFV3hQ&usqp=CAU',
};
export default function ProductSlider() {
  const [windowWidth, setWindowWidth] = useState<null | number>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sliderSettings = {
    infinite: false,
    speed: 300,
    swipe: (windowWidth || 0) < 768,
    slidesToShow: Math.min(Math.floor((windowWidth || 275) / 265), 5),
    slidesToScroll: 1,
    dots: true,
    nextArrow: (
      <Arrow
        styleName={styles.arrow}
        direction="right"
        isCarousel
      />
    ),
    prevArrow: (
      <Arrow
        styleName={classNames(styles.arrow, styles.arrow__prev)}
        direction="left"
        isCarousel
      />
    ),
  };

  return (
    <section className={styles.productSlider}>
      <h2 className={styles.productSlider__title}>
        Ваші улюбленці
        <Image
          className={styles.productSlider__image}
          src={catDog}
          alt="cat and dog"
        />
        вподобають
      </h2>
      <Slider
        {...sliderSettings}
        className={styles.productSlider__slider}
      >
        {products.map((prod) => (
          <ProductCard
            key={prod}
            product={product}
          />
        ))}
      </Slider>
    </section>
  );
}
