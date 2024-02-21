'use client'; // can be server side rendered

import Goal from "@/components/Goal/Goal";
import GroomingHead from "@/components/GroomingHead/GroomingHead";

type Props = {
  params: {
    pet: string
  }
}

export default function GroomingPet({ params: { pet } }: Props) {
  return (
    <>
      <GroomingHead pet={pet} />
      <Goal />
    </>
  );
}