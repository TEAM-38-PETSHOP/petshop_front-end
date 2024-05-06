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
    productId: 69,
    name: 'Dog Raw Treat freeze-dried Digestion Ласощі для підтримання травлення у собак',
    productNameId:
      'dog-raw-treat-freeze-dried-digestion-lasoshchi-dlya-pidtrymannya-travlennya-u-sobak',
    brand: 'Brit',
    price: 215,
    imageUrls: [
      'https://petshops3.s3.amazonaws.com/Brit_Dog%20Raw%20Treat_8424264.jpg',
      'https://petshops3.s3.amazonaws.com/Brit_Dog%20Raw%20Treat%20freeze-dried%20Digestion%20%D0%9B%D0%B0%D1%81%D0%BE%D1%89%D1%96%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%96%D0%B4%D1%82%D1%80%D0%B8%D0%BC%D0%B0%D0%BD%D0%BD%D1%8F%20%D1%82%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F%20%D1%83%20%D1%81%D0%BE%D0%B1%D0%B0%D0%BA_912634.jpg',
    ],
    countryProduct: 'Чехія',
    groupProduct: 'Ласощі та кістки',
    breedSize: 'Мала і мініатюрна, Велика і гігантська, Середня',
    type: 'Для поліпшення травлення, Для дресирування, Для різноманітності раціону',
    packaging: '40 гр',
    productSize: '',
    description:
      'Сублімовані ласощі у вигляді снеків із куркою, пробіотиками та псиліумом для поліпшення травлення у собак. Смачне частування з натуральними легкозасвоюваними інгредієнтами для улюбленців із чутливим шлунком.',
    composition: `оленина (40%), жовтий горох, курячий жир (консервований токоферолами), нут, гречка, сушене яблуко, риб'ячий жир з лосося (3%), лляне насіння (3%), пивні дріжджі, водорості (0,5%, Ascophyllum nodosum), гідролізовані панцири ракоподібних (джерело глюкозаміна, 260 мг / кг), лохина (230 мг / кг, джерело поліфенолів 70 мг / кг і флавоноїдів 30 мг / кг), хрящовий екстракт (джерело хондроїтину, 160 мг / кг), маннан-олігосахариди (150 мг / кг), трави і фрукти (розмарин, цитрусові, куркума, 150 мг / кг), фрукто-олігосахариди (100 мг / кг), юкка Шидігера (Yucca Schidigera) (100 мг / кг), інулін (90 мг / кг), молочний рис полохо (75 мг / кг), обліпиха крушини (75 мг / кг), ромашка (30 мг / кг), гвоздика (30 мг / кг), шавлія (25 мг / кг).`,
    compositionAnalysis: `сирий білок 28,0%, сирий жир 17,0%, волога 10,0%, сира зола 8,8%, сира клітковина 2,0%, кальцій 1,4%, фосфор 1,0%, Омега -3 жирні кислоти 1,1%, Омега-6 жирні кислоти 2,2%.`,
    compositionEnergyValue: `3 860 ккал / кг.`,
    compositionExpiration: `Термін придатності зазначений на упаковці. Зберігати в сухому, прохолодному місці.`,
    instruction:
      'Давати щодня з урахуванням ваги і фізичної активності улюбленця. Дотримуйтеся норм годування, зазначених в таблиці на пакованні. При переході з одного корму на інший необхідно робити це поступово для того, щоб організм собаки зміг адаптуватися до більш збагаченого поживними речовинами раціону. В середньому процес переходу на новий корм триває 5-7 днів, починаючи з незначного його додавання до звичного сухого корму, закінчуючи повною заміною. Слідкуйте за поведінкою і станом випорожнень Вашого собаки. Слідкуйте, щоб у улюбленця завжди був доступ до чистої свіжої води. Зберігайте корм в закритому пакованні в прохолодному, сухому місці.',
    instructionWhyBuy:
      "Виготовлений на основі дієтичної оленини, що ідеально підходить для собак мініатюрних порід з чутливим травленням. Містить вітаміни А, D3, Е, С, фолієву кислоту, кальцій, селен, залізо, марганець і йод, що комплексно оздоровлюють і захищають організм улюбленця від небажаних захворювань. З додаванням вітамінів групи В, біотину і цинку, що позитивно впливають на стан шкіри і шерсті собаки. Завдяки наявності в кормі насіння льону і риб'ячого жиру з лосося, раціон багатий на корисні жирні кислоти Омега-3 і Омега-6",
    entryDate: '2024-04-14T15:13:45',
    animals: [{ animalId: 1, name: 'СОБАКАМ', animalNameId: 'sobakam' }],
    categories: [
      {
        categoryId: 3,
        name: 'Смаколики',
        categoryNameId: 'smakolyky',
        description: 'Смаколики для домашніх тварин',
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
