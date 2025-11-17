import { useMutation } from '@apollo/client';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAuth } from '@/stores/useAuth';
import { ToastProvider } from '@/serviсes/ToastContext';
import { Login } from './Login';

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

describe('Login', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: false, error: null }]);
  });

  it('correctly associates labels with inputs', () => {
    render(<ToastProvider><Login /></ToastProvider>);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Пароль');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('submits form with valid data', async () => {
    const mockMutate = jest.fn().mockResolvedValue({
      data: { profile: { signin: { token: 'test-token' } } },
    });
    (useMutation as jest.Mock).mockReturnValue([mockMutate, { loading: false }]);

    render(<ToastProvider><Login /></ToastProvider>);

    // Используем getByLabelText для надежного поиска
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'validPass123!' },
    });

    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        variables: {
          email: 'test@example.com',
          password: 'validPass123!',
        },
      });
    });
  });
});
