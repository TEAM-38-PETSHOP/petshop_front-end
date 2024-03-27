import React from 'react';
import { render } from '@testing-library/react';
import BreedsList from './BreedsList';

describe('BreedsList component', () => {
  const mockBreeds = [
    { id: 1, petServiceId: 101, numberList: 1, name: 'Breed 1', price: '10' },
    { id: 2, petServiceId: 102, numberList: 2, name: 'Breed 2', price: '20' },
    { id: 3, petServiceId: 103, numberList: 3, name: 'Breed 3', price: '30' },
  ];

  it('renders breed names correctly', () => {
    const { getAllByTestId } = render(<BreedsList breeds={mockBreeds} />);
    const nameElements = getAllByTestId('breed-name');
    
    nameElements.forEach((nameElement, index) => {
      expect(nameElement.textContent).toBe(mockBreeds[index].name);
    });
  });

  it('renders breeds list correctly', () => {
    const { getByText } = render(<BreedsList breeds={mockBreeds} />);
    
    mockBreeds.forEach(breed => {
      const nameElement = getByText(breed.name);
      const priceElement = getByText(breed.price);
      
      expect(nameElement).toBeInTheDocument();
      expect(priceElement).toBeInTheDocument();
    });
  });

  it('renders correct number of breed items', () => {
    const { getAllByRole } = render(<BreedsList breeds={mockBreeds} />);
    const breedItems = getAllByRole('listitem');
    
    expect(breedItems.length).toBe(mockBreeds.length);
  });
});
