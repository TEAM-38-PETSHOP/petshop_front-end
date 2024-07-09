import { render } from '@testing-library/react';
import About from './About';

describe('About component', () => {
  it('renders the component without crashing', () => {
    render(<About />);
  });

  it('displays the correct title', () => {
    const { getByText } = render(<About />);
    expect(getByText('Про нас')).toBeInTheDocument();
  });

  it('displays the correct slogan', () => {
    const { getByText } = render(<About />);
    expect(
      getByText('Турбуються, люблять, балують в одному місці — в')
    ).toBeInTheDocument();
    expect(getByText('OneGroom')).toBeInTheDocument();
  });

  it('displays the correct description', () => {
    const { getByText } = render(<About />);
    expect(
      getByText(
        'Наша команда забезпечує комфорт та догляд за вашим улюбленцем, представляючи великий вибір якісних продуктів та послуг. Пухнастик - це частина вашого сімейного кола, і ми завжди тут, щоб подарувати йому та вам тільки найкраще.'
      )
    ).toBeInTheDocument();
  });

  it('displays the correct button texts and links', () => {
    const { getByText } = render(<About />);
    expect(getByText('СПА для пухнастиків')).toHaveAttribute(
      'href',
      '/grooming'
    );
    expect(getByText('Шоппінг для улюбленців')).toHaveAttribute(
      'href',
      '/catalog'
    );
  });
});
