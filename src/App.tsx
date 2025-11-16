import { type ReactNode, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Operation, Categories, Operations, Login, Profile, Registration } from '@/pages';
import { Category } from '@/pages/Category/Category';
import { useAuth } from '@/stores/useAuth';
import { LayoutSelector } from './layouts';
import { ToastProvider } from '@/serviсes/ToastContext';

type LayoutSelectorRouteProps = {
  children: ReactNode;
  isAuth: boolean;
  layoutType: 'panel' | 'login';
};

const LayoutSelectorRoute = ({ children, isAuth, layoutType }: LayoutSelectorRouteProps) => {
  const location = useLocation();

  if (layoutType === "panel" && !isAuth) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  if (layoutType === "login" && isAuth) {
    return <Navigate replace to="/operations" />;
  }

  return <LayoutSelector layoutType={layoutType}>
    {children}
  </LayoutSelector>;
};

const App = () => {
  const { isAuth } = useAuth();

  return (
    <ToastProvider>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              element={
                <LayoutSelectorRoute isAuth={isAuth} layoutType='login'>
                  <Login />
                </LayoutSelectorRoute>
              }
              path="/login"
            />
            <Route
              element={
                <LayoutSelectorRoute isAuth={isAuth} layoutType='login'>
                  <Registration />
                </LayoutSelectorRoute>
              }
              path="/registration"
            />
            <Route
              element={
                <LayoutSelectorRoute isAuth={isAuth} layoutType='panel'>
                  <Operations />
                </LayoutSelectorRoute>
              }
              path="/operations"
            />
            <Route
              element={
                <LayoutSelectorRoute isAuth={isAuth} layoutType='panel'>
                  <Categories />
                </LayoutSelectorRoute>
              }
              path="/categories"
            />
            <Route
              element={
                <LayoutSelectorRoute isAuth={isAuth} layoutType='panel'>
                  <Operation />
                </LayoutSelectorRoute>
              }
              path="/operations/:id"
            />
            <Route
              element={
                <LayoutSelectorRoute isAuth={isAuth} layoutType='panel'>
                  <Category />
                </LayoutSelectorRoute>
              }
              path="/categories/:id"
            />
            <Route
              element={
                <LayoutSelectorRoute isAuth={isAuth} layoutType='panel'>
                  <Profile />
                </LayoutSelectorRoute>
              }
              path="/profile"
            />
            <Route
              element={<Navigate replace to={isAuth ? '/operations' : '/login'} />}
              path="*"
            />
          </Routes>
        </Suspense>
      </HashRouter>
    </ToastProvider>
  );
};

export { App };
