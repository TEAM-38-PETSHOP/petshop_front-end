import { render, fireEvent } from '@testing-library/react';
import Buttons from './Buttons';

describe('Buttons component', () => {
  const firstBtn = {
    btnText: 'First Button',
    btnLink: '/first',
    className: 'customClass',
  };

  const secondBtn = {
    btnText: 'Second Button',
    btnLink: '/second',
  };

  it('renders the component without crashing', () => {
    render(<Buttons firstBtn={firstBtn} />);
  });

  it('renders the first button with correct text and link', () => {
    const { getByText } = render(<Buttons firstBtn={firstBtn} />);
    expect(getByText(firstBtn.btnText)).toHaveAttribute(
      'href',
      firstBtn.btnLink
    );
  });

  it('applies additional class name to the first button when provided', () => {
    const { getByText } = render(<Buttons firstBtn={firstBtn} />);
    expect(getByText(firstBtn.btnText)).toHaveClass(firstBtn.className);
  });

  it('renders the second button with correct text and link when provided', () => {
    const { getByText } = render(
      <Buttons
        firstBtn={firstBtn}
        secondBtn={secondBtn}
      />
    );
    expect(getByText(secondBtn.btnText)).toHaveAttribute(
      'href',
      secondBtn.btnLink
    );
  });

  it('renders the second button with default class name if not provided', () => {
    const { getByText } = render(
      <Buttons
        firstBtn={firstBtn}
        secondBtn={secondBtn}
      />
    );
    expect(getByText(secondBtn.btnText)).toHaveClass('btns__btnSecond');
  });

  it('disables the first button when isDisabled prop is true', () => {
    const { getByText } = render(
      <Buttons firstBtn={{ ...firstBtn, isDisabled: true }} />
    );
    expect(getByText(firstBtn.btnText)).toHaveClass('btns__btnDisabled');
  });

  it('calls onClick function when first button is clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Buttons firstBtn={{ ...firstBtn, onClick }} />
    );
    fireEvent.click(getByText(firstBtn.btnText));
    expect(onClick).toHaveBeenCalled();
  });
});
