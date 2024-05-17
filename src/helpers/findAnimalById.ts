export default function findAnimalById(animal: string | string[]) {
  let currentId = 1;

  if (animal === 'dogs') {
    currentId = 1;
  } else if (animal === 'cats') {
    currentId = 2;
  }
  
  return currentId;
}