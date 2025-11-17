import { render, screen, fireEvent } from '@testing-library/react';
import { Select, Option } from './Select';

const options: Option[] = [
  { id: '1', name: 'Категория 1' },
  { id: '2', name: 'Категория 2' },
  { id: '3', name: 'Категория 3' },
];

const label = 'Выберите категорию';

describe('Select', () => {
  it('renders with label and default option', () => {
    render(
      <Select
        options={options}
        label={label}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('Категория 1')).toBeInTheDocument();
  });

  it('shows options list on click and selects option', () => {
    const handleChange = jest.fn();
    render(
      <Select
        options={options}
        label={label}
        onChange={handleChange}
      />
    );
    const header = screen.getByText('Категория 1');
    fireEvent.click(header);

    expect(screen.getByText('Категория 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Категория 2'));
    expect(handleChange).toHaveBeenCalledWith('2');
    expect(screen.getByText('Категория 2')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <Select
        options={options}
        label={label}
        onChange={() => {}}
      />
    );
    fireEvent.click(screen.getByText('Категория 1'));
    expect(screen.getByText('Категория 2')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Категория 2')).not.toBeInTheDocument();
  });

  it('shows error message when error prop is set', () => {
    render(
      <Select
        options={options}
        label={label}
        onChange={() => {}}
        error="Ошибка выбора"
      />
    );
    expect(screen.getByText('Ошибка выбора')).toBeInTheDocument();
  });

  it('sets defaultValue correctly', () => {
    render(
      <Select
        options={options}
        label={label}
        onChange={() => {}}
        defaultValue="2"
      />
    );
    expect(screen.getByText('Категория 2')).toBeInTheDocument();
  });
});
