import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
  });

  it('renders the loader with correct number of paws', () => {
    const { getAllByTestId } = render(<Loader />);
    const paws = getAllByTestId('paw-svg');
    expect(paws).toHaveLength(12);
  });
});
