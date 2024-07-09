import Goal from '@/components/ForGrooming/Goal/Goal';
import GroomingForm from '@/components/ForGrooming/GroomingForm/GroomingForm';
import GroomingHead from '@/components/ForGrooming/GroomingHead/GroomingHead';
import {
  getAllServices,
  getAllTypeOfPetServices,
} from '@/helpers/fetchGrooming';
import { Suspense } from 'react';

type Props = {
  params: {
    pet: string;
  };
};

export default async function GroomingPet({ params: { pet } }: Props) {
  const services = await getAllServices();
  const typeOfServices = await getAllTypeOfPetServices();

  return (
    <>
      <Suspense>
        <GroomingHead pet={pet} />
      </Suspense>

      <Suspense>
        <GroomingForm
          services={services}
          typeOfServices={typeOfServices}
          pet={pet}
        />
      </Suspense>

      <Goal />
    </>
  );
}
