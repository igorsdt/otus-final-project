import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from '@/ui';
import { MemoryRouter } from 'react-router-dom';

// Мокаем useNavigate для проверки вызова навигации:
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/some-path' })
}));

describe('BackButton', () => {
  it('renders button and text', () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Вернуться')).toBeInTheDocument();
  });

  it('calls navigate(-1) on click', () => {
    const navigate = jest.fn();
    // Переопределяем useNavigate специально для этого теста:
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('check icon', () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    // наличие svg:
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });
});
