import { render, screen } from '@testing-library/react';
import Services from './Services';

describe('Services component', () => {
  test('renders without crashing', () => {
    render(<Services />);
    const servicesElement = screen.getByTestId('services-section');
    expect(servicesElement).toBeInTheDocument();
  });

  test('renders services title', () => {
    render(<Services />);
    const titleElement = screen.getByText('Кого потрібно причепурити?');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders correct number of service blocks', () => {
    render(<Services />);
    const serviceBlocks = screen.getAllByTestId('service-block');
    expect(serviceBlocks.length).toBe(5);
  });

  test('renders button text correctly', () => {
    render(<Services />);
    const button1 = screen.getByText('Доглянути котика');
    const button2 = screen.getByText('Доглянути песика');
    const button3 = screen.getByText('До магазину');
    expect(button1);
    expect(button2);
    expect(button3);
  });
});
