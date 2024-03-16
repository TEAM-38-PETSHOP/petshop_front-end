import { render, screen } from '@testing-library/react';
import RoadToUs from './RoadToUs';
import styles from './roadToUs.module.scss';

describe('RoadToUs component', () => {
  test('renders without crashing', () => {
    render(<RoadToUs />);
    const roadToUsSection = screen.getByText(
      /надійний догляд за вашими дорогоцінними лапками тут/i
    );
    expect(roadToUsSection).toBeInTheDocument();
  });

  test('renders with correct styles', () => {
    const { getByTestId } = render(<RoadToUs />);
    const roadToUsSection = getByTestId('roadToUs');
    expect(roadToUsSection).toHaveClass(styles.roadToUs);

    const roadToUsTitle = screen.getByText(
      /надійний догляд за вашими дорогоцінними лапками тут/i
    );
    expect(roadToUsTitle).toHaveClass(styles.roadToUs__title);
  });
});
