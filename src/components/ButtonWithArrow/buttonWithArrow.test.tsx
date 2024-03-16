import { render } from '@testing-library/react';
import ButtonWithArrow from './ButtonWithArrow';

describe('ButtonWithArrow component', () => {
  const defaultProps = {
    text: 'Button Text',
    href: '/button-link',
  };

  it('renders the component without crashing', () => {
    render(<ButtonWithArrow {...defaultProps} />);
  });

  it('renders the button with correct text and link', () => {
    const { getByText } = render(<ButtonWithArrow {...defaultProps} />);
    expect(getByText(defaultProps.text)).toHaveAttribute(
      'href',
      defaultProps.href
    );
  });

  it('applies additional class name to the button when provided', () => {
    const classNameBtn = 'customClass';
    const { container } = render(
      <ButtonWithArrow
        {...defaultProps}
        classNameBtn={classNameBtn}
      />
    );
    expect(container.firstChild).toHaveClass(classNameBtn);
  });

  it('applies "buttonWithArrowGreen" class when variant is "green"', () => {
    const { container } = render(
      <ButtonWithArrow
        {...defaultProps}
        variant="green"
      />
    );
    expect(container.firstChild).toHaveClass('buttonWithArrowGreen');
  });

  it('applies "buttonWithArrowOrange" class when variant is "orange"', () => {
    const { container } = render(
      <ButtonWithArrow
        {...defaultProps}
        variant="orange"
      />
    );
    expect(container.firstChild).toHaveClass('buttonWithArrowOrange');
  });
});
