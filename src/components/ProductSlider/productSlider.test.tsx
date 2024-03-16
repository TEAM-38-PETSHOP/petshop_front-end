import { render, screen } from '@testing-library/react';
import ProductSlider from './ProductSlider';

describe('ProductSlider component', () => {
  test('renders product slider component', () => {
    render(<ProductSlider />);
    const sliderElement = screen.getByTestId('product-slider');
    expect(sliderElement).toBeInTheDocument();
  });

  test('renders product slider title', () => {
    render(<ProductSlider />);
    const sliderTitleElement1 = screen.getByText(/Ваші улюбленці/);
    const sliderTitleElement2 = screen.getByText(/вподобають/);
    const sliderTitleImg = screen.getByAltText('cat and dog');

    expect(sliderTitleElement1).toBeInTheDocument();
    expect(sliderTitleElement2).toBeInTheDocument();
    expect(sliderTitleImg).toBeInTheDocument();
  });

  test('renders correct number of product cards', () => {
    render(<ProductSlider />);
    const productCardElements = screen.getAllByTestId('product-card');
    expect(productCardElements.length).toBe(10);
  });

  test('renders arrow buttons for slider navigation', () => {
    render(<ProductSlider />);
    const Arrow = screen.getAllByTestId('arrow');
    expect(Arrow.length).toBe(2);
  });
});
