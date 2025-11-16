import { useNavigate } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from '@/stores/useAuth';
import { UserDropdown } from './UserDrpdown';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@/stores/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-icons/fa6', () => ({
  FaCircleUser: () => <span data-testid="user-icon">UserIcon</span>,
}));

describe('UserDropdown', () => {
  const mockNavigate = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user icon Button', () => {
    render(<UserDropdown />);
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<UserDropdown />);
    fireEvent.click(screen.getByTestId('user-icon'));
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
    expect(screen.getByText('Выход')).toBeInTheDocument();
  });

  it('closes dropdown when clicked outside', () => {
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        <UserDropdown />
      </div>,
    );

    // Открываем dropdown
    fireEvent.click(screen.getByTestId('user-icon'));
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();

    // Кликаем снаружи
    fireEvent.mouseDown(screen.getByTestId('outside-element'));
    expect(screen.queryByText('Личный кабинет')).not.toBeInTheDocument();
  });

  it('navigates to profile when "Личный кабинет" clicked', () => {
    render(<UserDropdown />);

    // Открываем и кликаем
    fireEvent.click(screen.getByTestId('user-icon'));
    fireEvent.click(screen.getByText('Личный кабинет'));

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
    expect(screen.queryByText('Личный кабинет')).not.toBeInTheDocument();
  });

  it('calls logout when "Выход" clicked', () => {
    render(<UserDropdown />);

    // Открываем и кликаем
    fireEvent.click(screen.getByTestId('user-icon'));
    fireEvent.click(screen.getByText('Выход'));

    expect(mockLogout).toHaveBeenCalled();
    expect(screen.queryByText('Выход')).not.toBeInTheDocument();
  });

  it('matches snapshot when closed', () => {
    const { asFragment } = render(<UserDropdown />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when opened', () => {
    const { asFragment } = render(<UserDropdown />);
    fireEvent.click(screen.getByTestId('user-icon'));
    expect(asFragment()).toMatchSnapshot();
  });
});
