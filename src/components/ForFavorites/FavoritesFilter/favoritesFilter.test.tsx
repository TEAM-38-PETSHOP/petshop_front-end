import { render } from '@testing-library/react';
import FavoritesFilter from './FavoritesFilter';
import styles from './favoritesFilter.module.scss';

const mockCategories = [
  { categoryId: 1, name: 'Category 1', description: 'Description 1' },
  { categoryId: 2, name: 'Category 2', description: 'Description 2' },
];

describe('FavoritesFilter component', () => {
  test('renders without crashing', () => {
    render(<FavoritesFilter categories={[]} />);
  });

  describe('Rendering categories', () => {
    test('renders all categories', () => {
      const { getByText } = render(
        <FavoritesFilter categories={mockCategories} />
      );
      mockCategories.forEach((category) => {
        expect(getByText(category.name)).toBeInTheDocument();
      });
    });

    test('renders default filter as active', () => {
      const { getByText } = render(
        <FavoritesFilter categories={mockCategories} />
      );
      const defaultFilter = getByText('Всі');
      expect(defaultFilter).toHaveClass(styles.favoritesFilter__active);
    });
  });
});
