import FavoriteProducts from './FavoriteProducts';
import { renderWithProviders } from '@/utils/testRedux';

describe('FavoriteProducts component', () => {
  test('renders without crashing', () => {
    renderWithProviders(<FavoriteProducts />);
  });

  test('renders empty message if no favorite products', () => {
    const { getByText } = renderWithProviders(<FavoriteProducts />);
    const emptyMessage = getByText('У вас поки немає обраних товарів');
    expect(emptyMessage).toBeInTheDocument();
  });
});
