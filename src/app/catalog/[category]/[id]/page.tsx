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
  // const product = await getProductById(id);

  const product = {
    productId: 68,
    name: 'Caviar Green Balsamo',
    productNameId: 'caviar-green-balsamo',
    brand: 'Iv San Bernard',
    description:
      'Бальзам-кондиціонер із зеленою ікрою та вітамінами для котів і собак усіх порід. Допомагає захистити шерсть улюбленця від шкідливого впливу навколишнього середовища, надає їй сили, блиску та доглянутого вигляду.',
    price: 1750,
    imageUrls: [
      'https://petshops3.s3.amazonaws.com/Iv%20San%20Bernard_Caviar%20Green%20Balsamo_3931704.jpg',
      'https://petshops3.s3.amazonaws.com/Iv%20San%20Bernard_Caviar%20Green%20Balsamo_747777.jpg',
      'https://petshops3.s3.amazonaws.com/Iv%20San%20Bernard_Caviar%20Green%20Balsamo_2544853.jpg',
      'https://petshops3.s3.amazonaws.com/Iv%20San%20Bernard_Caviar%20Green%20Balsamo_4998471.jpg',
    ],
    countryProduct: 'Італія',
    groupProduct: 'Кондиціонери та спреї',
    breedSize: 'Для короткої шерсті, Для довгої шерсті',
    type: 'Для короткої шерсті, Для довгої шерсті, Для безшерстих',
    packaging: '1 л',
    entryDate: '2024-04-14T15:11:54',
    composition: 'dsfsdfsdfsdfsdfffffffffffffffff',
    compositionAnalysis: 'fsdsdddddddddddddddddddddfsfdsfds',
    compositionEnergyValue: 'sdfsddddddddddddddd',
    compositionExpiration: 'sdddddddddddddddfsdfs',
    instruction: 'sdddddddddddddddfsdfsf',
    instructionWhyBuy: 'sdddddddddfdf',
    animals: [{ animalId: 1, animalNameId: 'sobakam', name: 'СОБАКАМ' }],
    categories: [
      {
        categoryId: 2,
        name: 'Домашній догляд',
        categoryNameId: 'ddsffsdf',
        description: 'Домашній догляд для домашніх тварин',
      },
      {
        categoryId: 4,
        name: 'sdfrgsdfs догляд',
        categoryNameId: 'ddsffsdf',
        description: 'Домашній догляд для домашніх тварин',
      },
    ],
  };

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
