'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './productSlider.module.scss';
import catDog from '@@/images/drawn/catAndDog.png';
import ProductCard from '../ProductCard/ProductCard';
import Arrow from '../Arrow/Arrow';

import { Product } from '@/types/Product';
import ButtonWithArrow from '../ButtonWithArrow/ButtonWithArrow';

type Props = {
  products: Product[];
};
export default function ProductSlider({ products }: Props) {
  const [windowWidth, setWindowWidth] = useState<number>(320);

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

  const widthCards = windowWidth > 425 ? 265 : 195;
  const sliderSettings = {
    infinite: false,
    speed: 300,
    swipe: windowWidth < 768,
    slidesToShow: Math.floor((windowWidth || 265) / widthCards),
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
    <section
      className={styles.productSlider}
      data-testid="product-slider"
    >
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
        <ProductCard product={products[0]} />
        <div className={styles.productSlider__cardToShop}>
          <h3 className={styles.productSlider__cardToShop_title}>Pet Store</h3>
          <p className={styles.productSlider__cardToShop_description}>
            Наш асортимент включає преміальну їжу, якісні іграшки, трендові
            аксесуари і доглядові засоби
          </p>
          <ButtonWithArrow
            text="Магазин"
            href="/catalog"
            classNameBtn={styles.productSlider__cardToShop_button}
          />
        </div>
        {products.slice(1).map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
          />
        ))}
      </Slider>
    </section>
  );
}
