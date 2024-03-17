import Goal from "@/components/Goal/Goal";
import GroomingForm from "@/components/GroomingForm/GroomingForm";
import GroomingHead from "@/components/GroomingHead/GroomingHead";
import { Suspense } from "react";

type Props = {
  params: {
    pet: string
  }
}

export default function GroomingPet({ params: { pet } }: Props) {
  return (
    <>
      <Suspense>
        <GroomingHead pet={pet} />
      </Suspense>

      <Suspense>
        <GroomingForm pet={pet} />
      </Suspense>
      
      <Goal />
    </>
  );
}