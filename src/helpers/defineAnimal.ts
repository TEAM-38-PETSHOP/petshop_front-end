export function defineAnimal(animal: string | undefined) {
  switch (animal) {
    case 'dogs': return "sobakam";
    case 'cats': return "kotam";
    default: return "";
  }
}