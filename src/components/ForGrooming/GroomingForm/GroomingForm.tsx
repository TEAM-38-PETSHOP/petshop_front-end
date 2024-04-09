'use client';

import { Suspense, useCallback, useMemo, useState } from 'react';
import style from './groomingForm.module.scss';
import CaresList from '../CaresList/CaresList';
import BreedsList from '../BreedsList/BreedsList';
import GroomDescription from '../GroomDescription/GroomDescription';
import Link from 'next/link';
import CareSelect from '../CareSelect/CareSelect';
import { TypeOfService } from '@/types/TypeOfService';
import { useSearchParams } from 'next/navigation';
import { createUrlString } from '@/helpers/createUrlString';
import { Service } from '@/types/Service';

interface Props {
  pet: string;
  services: Service[];
  typeOfServices: TypeOfService[];
}

export default function GroomingForm({ pet, services, typeOfServices }: Props) {
  const [query, setQuery] = useState('');

  const animalId = pet === 'dogs' ? 1 : 2;
  const searchParams = useSearchParams();
  const careId = Number(searchParams.get('careId'));
  const activeCareId: number = useMemo(() => careId, [careId]);
  const visibleTypeOfServices = typeOfServices.filter(
    (typeOfService) => typeOfService.petServiceId === activeCareId
  );
  const visibleServices = services.filter(
    (service) => service.animalId === animalId
  );

  const currentCare = useMemo(() => {
    const result = visibleServices.find(
      (service) => service.id === activeCareId
    );

    return result || visibleServices[0];
  }, [activeCareId, visibleServices]);

  const breeds = visibleTypeOfServices.filter(
    (typeOfService) => typeOfService.petServiceId === activeCareId
  );

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(query.toLowerCase())
  );
  const to = pet === 'dogs' ? 'cats' : 'dogs';
  const firstCareId = pet === 'dogs' ? '5' : '6';

  // Краща назва буде price замість breeds (дивитись макет)
  const createQueryString = useCallback(createUrlString, [searchParams]);

  return (
    <section className={style.groomingForm}>
      <Suspense>
        <CaresList
          visibleCares={visibleServices}
          activeCareId={activeCareId}
          setQuery={setQuery}
        />
      </Suspense>

      <CareSelect
        currentCare={currentCare}
        visibleCares={visibleServices}
        activeCareId={activeCareId}
        setQuery={setQuery}
      />

      <div className={style.groomingForm__line}></div>

      <div className={style.groomingForm__breeds}>
        <div
          data-testid="breeds-list"
          className={style.groomingForm__breedsContainer}
        >
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

        <GroomDescription careInfo={currentCare} />
      </div>
      <Link
        className={style.groomingForm__move}
        href={`/grooming/${to}?${createQueryString(
          'careId',
          firstCareId,
          searchParams
        )}`}
      >
        Грумінг для {pet === 'dogs' ? 'котиків' : 'песиків'}
      </Link>
    </section>
  );
}
