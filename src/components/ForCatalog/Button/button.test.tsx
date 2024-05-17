import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  const defaultProps = {
    title: 'Button Text',
    onClick: jest.fn(),
  };

  it('renders the component without crashing', () => {
    render(<Button {...defaultProps} />);
  });

  it('renders the button with correct text', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('calls onClick function when button is clicked', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    fireEvent.click(getByText(defaultProps.title));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('renders the link with correct text and href', () => {
    const href = '/button-link';
    const { getByText } = render(<Button {...defaultProps} action="link" href={href} />);
    expect(getByText(defaultProps.title)).toHaveAttribute('href', href);
  });

  it('applies additional class name to the button when provided', () => {
    const className = 'customClass';
    const { container } = render(<Button {...defaultProps} styleName={className} />);
    expect(container.firstChild).toHaveClass(className);
  });
});