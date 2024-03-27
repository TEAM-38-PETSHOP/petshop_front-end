import { render, screen } from '@testing-library/react';
import Goal from './Goal';

describe('Goal', () => {
  test('renders without throwing any errors', () => {
    render(<Goal />);
  });
  
  test('renders the correct number of img elements', () => {
    render(<Goal />);
    const sectionElements = screen.getAllByRole('img');
    expect(sectionElements.length).toBe(3);
  });

  it('renders component with correct content', () => {
    render(<Goal />);

    // Ensure that the first description is rendered
    expect(screen.getByText(/Ми гарантуємо безпеку та комфорт вашим улюбленцям/i)).toBeInTheDocument();

    expect(screen.getByText(/Наша мета/i)).toBeInTheDocument();

    // Ensure that the second description is rendered
    expect(screen.getByText(/забезпечити ваших улюбленців гарним виглядом та почуттям захищеності/i)).toBeInTheDocument();

    // Ensure that all images are rendered with appropriate alt attributes
    expect(screen.getByAltText('heart border')).toBeInTheDocument();
    expect(screen.getByAltText('heart')).toBeInTheDocument();
    expect(screen.getByAltText('heart text')).toBeInTheDocument();
  });
  
  test('renders the correct number of p elements with data-testid "first-description"', () => {
    render(<Goal />);
    const pElements = screen.getAllByTestId('first-description');
    expect(pElements.length).toBe(1);
  });
  
  test('renders the correct number of p elements with data-testid "second-description"', () => {
    render(<Goal />);
    const pElements = screen.getAllByTestId('second-description');
    expect(pElements.length).toBe(1);
  });
});
