import HeaderForPages from '@/components/HeaderForPages/HeaderForPages';
import { getProductById } from '@/helpers/fetchProducts';

import styles from './productPage.module.scss';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import ProductIntro from '@/components/ForProductPage/ProductIntro/ProductIntro';
import ToggleList from '@/components/ForProductPage/ToggleList/ToggleList';

type Props = {
  params: {
    id: string;
  };
  searchParams: { activeTab: string };
};

export default async function productPage({
  params: { id },
  searchParams,
}: Props) {
  const product = await getProductById(id);

  return (
    <>
      <HeaderForPages centralBlock={{ text: 'Смаколики' }} />

      <section className={styles.productPage}>
        <div className={styles.productPage__intro}>
          <ImageSlider images={product.imageUrls} />
          <ProductIntro product={product} />
        </div>

        <ToggleList
          searchParams={searchParams}
          product={product}
        />
      </section>
    </>
  );
}
