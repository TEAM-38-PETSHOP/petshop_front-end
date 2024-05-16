export function checkVariant(id: number) {
  switch (id) {
    case 1:
    case 5:
      return "green";
    case 2:
    case 6:
      return "orange";
    case 3:
    case 4:
      return "white";
    default:
      return "white";
  }
}