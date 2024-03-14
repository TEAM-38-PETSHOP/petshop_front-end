import Goal from "@/components/Goal/Goal";
import GroomingForm from "@/components/GroomingForm/GroomingForm";
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
      <GroomingForm pet={pet} />
      <Goal />
    </>
  );
}