import { create } from 'zustand';

type AuthState = {
  isAuth: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: null | string;
};

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuth: !!localStorage.getItem('token'),
  login: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuth: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuth: false });
  },
}));

const useAuth = () => {
  const { isAuth, login, logout } = useAuthStore();
  return { isAuth, login, logout };
};

export { useAuth };
