import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql';
import { useAuth } from '@/stores/useAuth';
import { Button, Input } from '@/ui';
import { type LoginData } from './Login.types';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { useToast } from '@/serviсes/ToastContext';
import styles from './Login.module.css';

const Login = () => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginData>({ mode: 'onChange' });
  const { login } = useAuth();

  const [_login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      login(data.profile.signin.token);
    },
    onError: (error) => {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    },
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await _login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Авторизация</h2>
      <form className={styles.form} data-testid="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.email?.message}
          id="email"
          label="Email"
          type="email"
          {...register('email', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email-адрес, пожалуйста, введите по примеру "ivanov@yandex.ru"',
            },
          })}
        />

        <Input
          error={errors.password?.message}
          id="password"
          label="Пароль"
          type="password"
          {...register('password', {
            required: 'Пароль обязателен',
          })}
        />

        <div className={styles.footer}>
          <Button
            theme="Ghost"
            text="Регистрация"
            type="button"
            href="/registration"
          />

          <Button
            theme="Primary"
            text={loading ? 'Вход...' : 'Войти'}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export { Login, type LoginData };
