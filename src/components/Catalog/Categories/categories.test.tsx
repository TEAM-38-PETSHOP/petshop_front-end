import { filterCategories } from './Categories';
import { BreedType } from '@/types/enums/BreedType';

describe('filterCategories', () => {
  const array = [
    { type: BreedType.CATS },
    { type: BreedType.DOGS },
    { type: 'other' },
  ];

  it('should return an array with only cats when BreedType is "cats"', () => {
    const result = filterCategories(array, BreedType.CATS);
    expect(result).toEqual([
      { type: BreedType.CATS },
    ]);
  });

  it('should return an array with only dogs when BreedType is "dogs"', () => {
    const result = filterCategories(array, BreedType.DOGS);
    expect(result).toEqual([
      { type: BreedType.DOGS },
    ]);
  });
});