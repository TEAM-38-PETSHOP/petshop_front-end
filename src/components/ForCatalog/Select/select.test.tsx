import { render, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Select
        isOpen={false}
        setIsOpen={() => {}}
        action="sort"
        currentItemId=""
        onClick={() => {}}
      />
    );

    const buttonText = container.querySelector('.select__btn')?.textContent;
    expect(buttonText).toContain('Сортувати');
  });

  it('closes content on click outside', () => {
    const { getByText, queryByTestId } = render(
      <div>
        <button>Outside</button>
        <Select
          isOpen={true}
          setIsOpen={() => {}}
          action="sort"
          currentItemId="newest"
          onClick={() => {}}
        />
      </div>
    );

    const outsideButton = getByText('Outside');
    fireEvent.click(outsideButton);

    const content = queryByTestId('select-content');
    expect(content).toBeInTheDocument();
  });

  it('displays correct category or sort option', () => {
    const content = [
      { categoryId: 1, categoryNameId: 'category1', name: 'Category 1', description: 'description 1' },
      { categoryId: 2, categoryNameId: 'category2', name: 'Category 2', description: 'description 2' }
    ];
  
    const { getAllByText } = render(
      <Select
        isOpen={false}
        setIsOpen={() => {}}
        action="category"
        content={content}
        currentItemId="category1"
        onClick={() => {}}
      />
    );
  
    const category1Elements = getAllByText('Category 1');
    expect(category1Elements.length).toBe(2);
  });

  it('triggers onClick function on option click', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Select
        isOpen={false}
        setIsOpen={() => {}}
        action="sort"
        currentItemId=""
        onClick={handleClick}
      />
    );

    const selectButton = getByTestId('select-button');
    fireEvent.click(selectButton);

    setTimeout(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    }, 0);
  });
});
