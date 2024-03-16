import { render, fireEvent } from '@testing-library/react';
import Arrow from './Arrow';

describe('Arrow component', () => {
  it('renders the component without crashing', () => {
    render(<Arrow />);
  });

  it('renders the arrow button with default direction "up"', () => {
    const { container } = render(<Arrow />);
    const arrowButton = container.firstChild;
    expect(arrowButton).toHaveClass('up');
  });

  it('renders the arrow button with specified direction', () => {
    const { container } = render(<Arrow direction="left" />);
    const arrowButton = container.firstChild;
    expect(arrowButton).toHaveClass('left');
  });

  it('applies additional class names passed via props', () => {
    const { container } = render(<Arrow styleName="customStyle" />);
    const arrowButton = container.firstChild;
    expect(arrowButton).toHaveClass('customStyle');
  });

  it('applies "arrow__white" class when isWhite prop is true', () => {
    const { container } = render(<Arrow isWhite />);
    const arrowButton = container.firstChild;
    expect(arrowButton).toHaveClass('arrow__white');
  });

  it('applies "arrow__disabled" class when isCarousel is true and onClick is not provided', () => {
    const { container } = render(<Arrow isCarousel />);
    const arrowButton = container.firstChild;
    expect(arrowButton).toHaveClass('arrow__disabled');
  });

  it('calls onClick function when button is clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<Arrow onClick={onClick} />);
    const arrowButton = container.querySelector('button');
    if (arrowButton) {
      fireEvent.click(arrowButton);
      expect(onClick).toHaveBeenCalled();
    } else {
      throw new Error('Arrow button not found');
    }
  });
});
