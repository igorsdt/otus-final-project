import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Submenu } from './Submenu';
import { ReactNode } from 'react';

// Типизированный render helper
const renderWithRouter = (ui: ReactNode): RenderResult =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/operations' }),
  useNavigate: () => jest.fn()
}));

describe('Submenu', () => {
  it('renders AddButton for buttonType="add"', () => {
    const handleClick = jest.fn();
    renderWithRouter(<Submenu buttonType="add" onButtonClick={handleClick} />);
    const buttons = screen.getAllByRole<HTMLButtonElement>('button');
    fireEvent.click(buttons[1]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders ButtonWithIcon for buttonType="edit"', () => {
    const handleClick = jest.fn();
    renderWithRouter(<Submenu buttonType="edit" onButtonClick={handleClick} />);
    const buttons = screen.getAllByRole<HTMLButtonElement>('button');
    fireEvent.click(buttons[1]);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders nothing for buttonType="none"', () => {
    renderWithRouter(<Submenu buttonType="none" />);
    const buttons = screen.getAllByRole<HTMLButtonElement>('button');
    expect(buttons).toHaveLength(1); // только BackButton
  });

  it('renders BackButton always', () => {
    renderWithRouter(<Submenu />);
    const buttons = screen.getAllByRole<HTMLButtonElement>('button');
    expect(buttons[0]).toBeInTheDocument();
  });
});
