import { render } from '@testing-library/react';
import OurLocation from './OurLocation';

describe('OurLocation component', () => {
  it('renders without crashing', () => {
    render(<OurLocation />);
  });

  it('renders location information correctly', () => {
    const { getByText } = render(<OurLocation />);
    expect(getByText(/One Groom/i)).toBeInTheDocument();
    expect(getByText(/Київський шлях 127б\/6, Boryspil/i)).toBeInTheDocument();
    expect(getByText(/10:00 - 20:00 \| Без вихідних/i)).toBeInTheDocument();
  });

  it('renders map with correct source', () => {
    const { getByTestId } = render(<OurLocation />);
    const iframe = getByTestId('map-iframe');
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.2855250028133!2d30.963967977707714!3d50.342579671571656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ef4c5e146fb3%3A0xa4f62f85a5e3c8a!2z0LLRg9C70LjRhtGPINCa0LjRl9Cy0YHRjNC60LjQuSDRiNC70Y_RhSwgMTI30JEsINCR0L7RgNC40YHQv9GW0LvRjCwg0JrQuNGX0LLRgdGM0LrQsCDQvtCx0LsuLCAwODMwMA!5e0!3m2!1suk!2sua!4v1709496856591!5m2!1suk!2sua'
    );
  });

  it('renders buttons with correct links', () => {
    const { getAllByText } = render(<OurLocation />);
    const buttons = getAllByText(/Прокласти маршрут/i);
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveAttribute(
      'href',
      'https://www.google.com/maps/dir//вулиця+Київський+шлях,+127Б,+Бориспіль,+Київська+обл.,+08300/@50.3425386,30.963968,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40d4ef4c5e146fb3:0xa4f62f85a5e3c8a!2m2!1d30.9665429!2d50.3425797?hl=uk-UK&entry=ttu'
    );
    expect(buttons[1]).toHaveAttribute(
      'href',
      'https://www.google.com/maps/dir//вулиця+Київський+шлях,+127Б,+Бориспіль,+Київська+обл.,+08300/@50.3425386,30.963968,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40d4ef4c5e146fb3:0xa4f62f85a5e3c8a!2m2!1d30.9665429!2d50.3425797?hl=uk-UK&entry=ttu'
    );
  });
});
