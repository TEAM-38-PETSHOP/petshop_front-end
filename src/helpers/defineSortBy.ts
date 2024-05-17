export function defineSortBy(sortBy: string) {
  switch (sortBy) {
    case 'cheapest':
      return { sortBy: 'price', desc: false };
    case 'expensive':
      return { sortBy: 'price', desc: true };
    case 'newest':
      return { sortBy: 'entryDate', desc: true };
    default:
      return { sortBy: '', desc: false };
  }
}