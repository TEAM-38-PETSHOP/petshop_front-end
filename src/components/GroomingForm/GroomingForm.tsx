'use client';

import { useEffect, useMemo, useState } from 'react';
import style from './groomingForm.module.scss';
import CaresList from '../CaresList/CaresList';
import BreedsList from '../BreedsList/BreedsList';
import GroomDescription from '../GroomDescription/GroomDescription';
import Link from 'next/link';
import CareSelect from '../CareSelect/CareSelect';
import { getAllTypeOfPetServices } from '@/helpers/fetchData';
import { TypeOfService } from '@/types/TypeOfService';

interface Props {
  pet: string;
}

type Breed = {
  id: number;
  name: string;
  price: string;
  additional: string;
}
interface DogCare {
  id: number;
  name: string;
  price: string;
  description: string;
  other: string[];
  dogBreeds: Breed[];
}

interface CatCare {
  id: number;
  name: string;
  price: string;
  description: string;
  other: string[];
  catBreeds: Breed[];
}

const caresForDogs = [
  { 
    id: 1, 
    name: '01 Комплексний догляд', 
    price: '1200',
    description: 'Комплексний догляд включає в себе індивідуальний підхід до породи, професійне купання під тип шерсті, дбайливе висушування та вичісування. Експрес-линька, стрижка з урахуванням особливостей породи, гігієнічна стрижка інтимних зон, а також видалення непотрібної шерсті з вушного проходу. Повна гама турботи, включаючи чистку вушок, підстригання та шліфовку кігтів, зволоження подушечок кремом. І для нотки розкоші, парфюм на Ваш вибір.',
    other: [
      'Інші собаки від 25кг та більше - 1250 грн',
      'Інші собаки від 5 до 25кг - 950 грн',
      'Інші собаки до 5кг – 700 грн',
    ],
    dogBreeds: [
      { id: 1, name: 'Акіта-іну', price: '1650', additional: '' },
      { id: 2, name: 'Алабай', price: 'від 1650 до 2500', additional: '' },
      { id: 3, name: 'Аляскинський маламут', price: '1700', additional: '' },
      { id: 4, name: 'Американський буллі', price: '1100', additional: '' },
      { id: 5, name: 'Американський бульдог', price: '1200', additional: '' },
      { id: 6, name: 'Американський кокер-спанієль', price: '1000', additional: '' },
      { id: 7, name: 'Англійський бульдог', price: '1050', additional: '' },
      { id: 8, name: 'Англійський кокер-спанієль', price: '950', additional: '' },
      { id: 9, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
      { id: 10, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
      { id: 11, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
      { id: 12, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
      { id: 13, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
      { id: 14, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
    ]
  },
  { 
    id: 2, 
    name: '02 Комплексний догляд (Тримінг)', 
    price: '1200',
    description: 'Купання доглядовими засобами для жорсткої шерсті, висушування, ролінг, ручне вищипування шерсті, стрижка по породі, гігієнічна стрижка інтимних зон, видалення шерсті з вушного проходу,чистка вушок, підстригання та шліфовка кігтів, зволоження кремом подушечок, парфюм',
    other: [
      'Інші собаки від 25кг та більше - 1250 грн',
      'Інші собаки від 5 до 25кг - 950 грн',
      'Інші собаки до 5кг – 700 грн',
    ],
    dogBreeds: [
      { id: 1, name: 'Акіта-іну', price: '1650', additional: '' },
      { id: 2, name: 'Алабай', price: 'від 1650 до 2500', additional: '' },
      { id: 3, name: 'Аляскинський маламут', price: '1700', additional: '' },
      { id: 4, name: 'Американський буллі', price: '1100', additional: '' },
      { id: 5, name: 'Американський бульдог', price: '1200', additional: '' },
      { id: 6, name: 'Американський кокер-спанієль', price: '1000', additional: '' },
      { id: 7, name: 'Англійський бульдог', price: '1050', additional: '' },
      { id: 8, name: 'Англійський кокер-спанієль', price: '950', additional: '' },
      { id: 9, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
    ]
  },
  { 
    id: 3, 
    name: '03 Гігієнічний догляд', 
    price: '1200',
    description: 'Включає в себе індивідуальний підхід до породи, професійне купання під тип шерсті, дбайливе висушування та вичісування, стрижка "інтимні зони", "відкриті очі", а також окантовка лапок та вушок, надаючи вашому улюбленцю чистий і елегантний вигляд. Ми дбаємо про його комфорт, проводячи видалення шерсті з вушного проходу та чистку вушок. Повна гама турботи, підстригання та шліфовка кігтів, зволоження подушечок кремом. І для нотки розкоші, парфюм на Ваш вибір.',
    other: [
      'Інші собаки від 25 кг. та більше - 1100 грн',
      'Інші собаки від 5 до 25кг - 900 грн',
      'Інші собаки до 5кг - 650 грн'
    ],
    dogBreeds: [
      { id: 1, name: 'Акіта-іну', price: '1650', additional: '' },
      { id: 2, name: 'Алабай', price: 'від 1650 до 2500', additional: '' },
      { id: 3, name: 'Аляскинський маламут', price: '1700', additional: '' },
      { id: 4, name: 'Американський буллі', price: '1100', additional: '' },
      { id: 5, name: 'Американський бульдог', price: '1200', additional: '' },
      { id: 6, name: 'Американський кокер-спанієль', price: '1000', additional: '' },
      { id: 7, name: 'Англійський бульдог', price: '1050', additional: '' },
      { id: 8, name: 'Англійський кокер-спанієль', price: '950', additional: '' },
      { id: 9, name: 'Англійський спрінгер-спанієль', price: '150', additional: '' },
    ]
  },
  { 
    id: 4, 
    name: '04 SPA - меню', 
    price: '1200',
    description: 'Профілактика і лікування шерсті,  як доповнення до комплексного догляду чи гігієнічного. \n Спеціальна ванна від торгової марки blovi, яка насичує воду киснем. Підходить тваринкам, які мають дерматологічні проблеми, або просто для більш якісної очистки шкіри та сяючої шерсті, має антибактеральну дію',
    other: [],
    dogBreeds: [
      { 
        id: 1, 
        name: 'Лікувальна ванна озонуванням', 
        price: '450',
        additional: '(використовується, як розслаблююча та заспокійлива процедура, допомагає нормалізувати кровообіг, для відновлення після травм та операцій, для лікування шкірних захворювань, усуває та знищує грибки, віруси та бактерії)'
      },
      { 
        id: 2, 
        name: 'Ванна з мінералами', 
        price: '500',
        additional: '(використовується як розслаблююча та заспокійлива процедура, підвищує енергію в організмі, сприяє оптимальному кровообігу, знімає подразнення, свербіж та забезпечує шовковисту шерсть)'
      },
    ]
  },
  { 
    id: 5, 
    name: '05 Додаткові послуги', 
    price: '1200',
    description: '',
    other: [],
    dogBreeds: [
      { 
        id: 1, 
        name: 'Манікюр', 
        price: '200',
        additional: '(обрізання кігтів, шліфування, зволожуючий бальзам)'
      },
      { 
        id: 2, 
        name: 'Обробка вушок ', 
        price: '150',
        additional: '(вищипування шерсті, чистка спеціальним розчином)'
      },
      { 
        id: 3, 
        name: 'Шампунь від паразитів або лікувальний шампунь', 
        price: '+300',
        additional: '(+до основного комплексу)'
      },
      { 
        id: 4, 
        name: 'Стрижка окремих частин', 
        price: 'від 150',
        additional: '(очі, лапи, вуха тощо)'
      },
      { 
        id: 5, 
        name: 'Розчісування ковтунів (1 год)', 
        price: '350',
        additional: ''
      },
      { 
        id: 6, 
        name: 'Чищення зубів (щітка, зубна паста)', 
        price: '200',
        additional: ''
      },
      { 
        id: 7, 
        name: 'Миття лапок (миття та сушка)', 
        price: '100',
        additional: ''
      },
    ]
  },
];

const caresForCats = [
  { 
    id: 1, 
    name: '01 Комплексний догляд', 
    price: '1200',
    description: 'Купання професійною косметикою, висушування, вичісування, стрижка, чистка вушок, підстригання кігтів.',
    other: [],
    catBreeds: [
      { id: 1, name: 'Короткошерсті', price: '700', additional: '' },
      { id: 2, name: 'Довгошерсті', price: '800', additional: '' },
      { id: 3, name: 'Мейн-кун', price: 'від 950', additional: '' },
    ]
  },
  { 
    id: 2, 
    name: '02 Гігієнічний догляд', 
    price: '1200',
    description: 'Купання професійною косметикою, висушування, вичісування, чистка вушок, підстригання кігтів, гігієнічна стрижка інтимних зон (за бажанням).',
    other: [],
    catBreeds: [
      { id: 1, name: 'Короткошерсті', price: '650', additional: '' },
      { id: 2, name: 'Довгошерсті', price: '750', additional: '' },
      { id: 3, name: 'Мейн-кун', price: 'від 850', additional: '' },
      { id: 4, name: 'Сфінкс', price: '450', additional: '' },
    ]
  },
  { 
    id: 3, 
    name: '03 Догляд без купання', 
    price: '1200',
    description: 'Вичісування без купання, чистка вушок, підстригання кігтів.',
    other: [],
    catBreeds: [
      { id: 1, name: 'Короткошерсті', price: '600', additional: '' },
      { id: 2, name: 'Довгошерсті', price: '700', additional: '' },
      { id: 3, name: 'Мейн-кун', price: 'від 800', additional: '' },
    ]
  },
  { 
    id: 4, 
    name: '04 Вичісування', 
    price: '1200',
    description: 'Вичісування з допоміжними засобами для кращого відходу шерсті.',
    other: [],
    catBreeds: [
      { id: 1, name: 'Короткошерсті', price: '650', additional: '' },
      { id: 2, name: 'Довгошерсті', price: '750', additional: '' },
      { id: 3, name: 'Мейн-кун', price: 'від 850', additional: '' },
    ]
  },
  { 
    id: 5, 
    name: '05 Додаткові послуги', 
    price: '1200',
    description: '',
    other: [],
    catBreeds: [
      { 
        id: 1, 
        name: 'Часткове вистригання(зона паха, штанці)', 
        price: '150', 
        additional: '' 
      },
      { 
        id: 2, 
        name: 'Манікюр: обрізання кігтів, шліфування, зволожуючий бальзам', 
        price: '200', 
        additional: '' 
      },
      { 
        id: 3, 
        name: 'Обробка вушок: вищипування шерсті, чистка спеціальним розчином', 
        price: '100', 
        additional: '' 
      },
      { 
        id: 4, 
        name: 'Шампунь від паразитів або лікувальний шампунь ', 
        price: '300', 
        additional: '' 
      },
      { 
        id: 5, 
        name: 'Розчісування ковтунів (15 хвилин)', 
        price: '150', 
        additional: '' 
      },
      { 
        id: 6, 
        name: 'Чищення зубів (щітка, зубна паста)', 
        price: '200', 
        additional: '' 
      },
      { 
        id: 7, 
        name: 'Миття лапок (миття та сушка)', 
        price: '100', 
        additional: '' 
      },
    ]
  },
];

export default function GroomingForm({ pet }: Props) {
  const [query, setQuery] = useState('');
  const [activeDogCare, setActiveDogCare] = useState('01 Комплексний догляд');
  const [activeCatCare, setActiveCatCare] = useState('01 Комплексний догляд');

  // useEffect(() => {
  //   getAllTypeOfPetServices()
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       throw new Error(`${err}`);
  //     });
  // }, []);
  
  const visibleCares = pet === 'dogs' ? caresForDogs : caresForCats;

  const currentCare = useMemo(() => {
    let result: CatCare | DogCare;
    
    if (pet === 'dogs') {
      result = visibleCares.find((care: CatCare | DogCare) => care.name === activeDogCare) as DogCare;
    } else {
      result = visibleCares.find((care: CatCare | DogCare) => care.name === activeCatCare) as CatCare;
    }

    return result || (visibleCares[0] as CatCare | DogCare);
  }, [activeDogCare, activeCatCare, pet, visibleCares]);

  /// const breeds = pet === 'dogs' ? currentCare.dogBreeds : currentCare.catBreeds;
  const breeds = pet === 'dogs' ? (currentCare as DogCare).dogBreeds : (currentCare as CatCare).catBreeds;
  const filteredBreeds = breeds.filter((breed) => breed.name.toLowerCase().includes(query.toLowerCase()));
  const activeCare= pet === 'dogs' ? activeDogCare : activeCatCare;
  const setActiveCare= pet === 'dogs' ? setActiveDogCare : setActiveCatCare;
  const to = pet === 'dogs' ? 'cats' : 'dogs';

  // Краща назва буде price замість breeds (дивитись макет)
  
  return (
    <section className={style.groomingForm}>
      <CaresList 
        visibleCares={visibleCares}
        activeCare={activeCare}
        setActiveCare={setActiveCare}
      />

      <CareSelect
        currentCare={currentCare}
        visibleCares={visibleCares}
        activeCare={activeCare}
        setActiveCare={setActiveCare}
      />

      <div className={style.groomingForm__line}></div>
      
      <div className={style.groomingForm__breeds}>
        <div className={style.groomingForm__breedsContainer}>
          {breeds.length > 9 && (
            <input 
              className={style.groomingForm__breedsInput} 
              type="text" 
              placeholder="Пошук"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          
          <BreedsList breeds={filteredBreeds} />
        </div>

        <GroomDescription careInfo={currentCare}/>
      </div>
      <Link className={style.groomingForm__move} href={`/grooming/${to}`}>
        Грумінг для {pet === 'dogs' ? 'котиків' : 'песиків'}
      </Link>
    </section>
  );
}