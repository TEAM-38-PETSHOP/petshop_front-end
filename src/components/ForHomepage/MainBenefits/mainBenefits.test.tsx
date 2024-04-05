import { render } from '@testing-library/react';
import MainBenefits from './MainBenefits';

describe('MainBenefits component', () => {
  it('renders without crashing', () => {
    render(<MainBenefits />);
  });

  it('renders all messages correctly', () => {
    const { getByText } = render(<MainBenefits />);
    expect(
      getByText(/Пухнастики до 9 місяців мають -20%/i)
    ).toBeInTheDocument();
    expect(
      getByText(/Перша послуга в Грумінг Спа = -10%/i)
    ).toBeInTheDocument();
    expect(
      getByText(/15% знижки на всі товари в день народження/i)
    ).toBeInTheDocument();
  });

  it('renders the image correctly', () => {
    const { getByAltText } = render(<MainBenefits />);
    expect(getByAltText('dog')).toBeInTheDocument();
  });
});
