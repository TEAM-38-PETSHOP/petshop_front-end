import { render, screen } from '@testing-library/react';
import ChoicePet from './ChoicePet';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({}),
}));

describe('ChoicePet component', () => {
  test('renders correctly when choice prop is "dogs" and contains alt value "dog"', () => {
    render(<ChoicePet choice="dogs" />);
    
    const dogImageAltText = 'dog'; // Alt value to check for
    
    expect(screen.getByText('Песика')).toBeInTheDocument();
    
    // Check if the alt value "dog" is present in the Image component
    const dogImage = screen.getByAltText(dogImageAltText);
    expect(dogImage).toBeInTheDocument();
  });

  test('renders correctly when choice prop is "cats" and contains alt value "cat"', () => {
    render(<ChoicePet choice="cats" />);
    
    const catImageAltText = 'cat'; // Alt value to check for
    
    expect(screen.getByText('Котика')).toBeInTheDocument();
    
    // Check if the alt value "cat" is present in the Image component
    const catImage = screen.getByAltText(catImageAltText);
    expect(catImage).toBeInTheDocument();
  });
});