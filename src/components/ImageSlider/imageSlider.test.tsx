import { render, fireEvent, getByTestId } from '@testing-library/react';
import ImageSlider from './ImageSlider';

const images = [
  'https://image1.jpg',
  'https://image2.jpg',
  'https://image3.jpg',
  'https://image4.jpg',
  'https://image5.jpg',
];

describe('ImageSlider component', () => {
  test('renders without crashing', () => {
    render(<ImageSlider images={images} />);
  });

  test('clicking previous button changes current image to previous one', () => {
    const { getByTestId, getByAltText } = render(
      <ImageSlider images={images} />
    );
    const prevButton = getByTestId('button-prev');
    fireEvent.click(prevButton);
    const currentImage = getByAltText('large');
    expect(currentImage.getAttribute('src')).toContain('image4.jpg');
  });

  test('clicking next button changes current image to next one', () => {
    const { getByTestId, getByAltText } = render(
      <ImageSlider images={images} />
    );
    const nextButton = getByTestId('button-next');
    fireEvent.click(nextButton);
    const currentImage = getByAltText('large');
    expect(currentImage.getAttribute('src')).toContain('image2.jpg');
  });
});
