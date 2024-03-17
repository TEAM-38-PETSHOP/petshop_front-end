import { render } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'This is a test product',
  carPrice: 100,
  price: 90,
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-9_UxIYQW9PjA64fKI20glb0H2MxFFV3hQ&usqp=CAU',
};

describe('ProductCard component', () => {
  it('renders without crashing', () => {
    render(<ProductCard product={mockProduct} />);
  });

  it('renders product information correctly', () => {
    const { getByText, getByAltText } = render(
      <ProductCard product={mockProduct} />
    );
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('This is a test product')).toBeInTheDocument();
    expect(getByText('100 грн')).toBeInTheDocument();
    expect(getByText('90 грн')).toBeInTheDocument();
    expect(getByAltText('product')).toBeInTheDocument();
  });
});
