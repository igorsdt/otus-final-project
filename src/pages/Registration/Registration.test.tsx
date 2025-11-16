import { useMutation } from '@apollo/client';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAuth } from '@/stores/useAuth';
import { Registration } from './Registration';

// Мокаем зависимости
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

jest.mock('@/stores/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Registration', () => {
  const mockLogin = jest.fn();
  const mockSignup = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    (useMutation as jest.Mock).mockReturnValue([mockSignup, { loading: false, error: null }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders registration form correctly', () => {
    render(<Registration />);

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Повторите пароль')).toBeInTheDocument();
    expect(screen.getByText('Авторизоваться')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
  });

  it('validates email field', async () => {
    render(<Registration />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' },
    });

    fireEvent.submit(screen.getByTestId('register-form'));

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument();
  });

  it('shows length error for short passwords', async () => {
    render(<Registration />);

    fireEvent.input(screen.getByLabelText('Пароль'), {
      target: { value: 'short' }, // Меньше 8 символов
    });

    fireEvent.blur(screen.getByLabelText('Пароль'));

    expect(await screen.findByText('Минимум 8 символов')).toBeInTheDocument();
  });

  it('validates password confirmation', async () => {
    render(<Registration />);

    fireEvent.input(screen.getByLabelText('Пароль'), {
      target: { value: 'Password1' },
    });

    fireEvent.input(screen.getByLabelText('Повторите пароль'), {
      target: { value: 'Password2' },
    });

    fireEvent.submit(screen.getByTestId('register-form'));

    expect(await screen.findByText('Пароли не совпадают')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const mockResponse = {
      data: {
        profile: {
          signup: {
            token: 'test-token',
          },
        },
      },
    };

    mockSignup.mockResolvedValue(mockResponse);

    render(<Registration />);

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.input(screen.getByLabelText('Пароль'), {
      target: { value: 'Password1' },
    });

    fireEvent.input(screen.getByLabelText('Повторите пароль'), {
      target: { value: 'Password1' },
    });

    fireEvent.submit(screen.getByTestId('register-form'));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        variables: {
          email: 'test@example.com',
          password: 'Password1',
          commandId: 'igorsdt-command-id-1',
        },
      });
    });
  });

  it('shows loading state', () => {
    (useMutation as jest.Mock).mockReturnValue([mockSignup, { loading: true, error: null }]);

    render(<Registration />);

    expect(screen.getByRole('button', { name: 'Загрузка...' })).toBeDisabled();
  });

  it('displays error message', async () => {
    const error = new Error('Registration failed');
    (useMutation as jest.Mock).mockReturnValue([mockSignup, { loading: false, error }]);

    render(<Registration />);

    expect(await screen.findByText('Registration failed')).toBeInTheDocument();
  });
});
