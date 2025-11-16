import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/graphql';
import { useAuth } from '@/stores/useAuth';
import { Button, Input } from '@/ui';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { useToast } from '@/serviсes/ToastContext';
import type { RegistrationData } from './Registration.types';
import styles from './Registration.module.css';

const Registration = () => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<RegistrationData>({ mode: 'onChange' });
  const { login } = useAuth();

  const [signup, { loading }] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      login(data.profile.signup.token);
    },
    onError: (error) => {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
    try {
      await signup({
        variables: {
          email: data.email,
          password: data.password,
          commandId: 'igorsdt-command-id-1',
        },
      });
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} data-testid="register-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.email?.message}
          id="email"
          label="Email"
          type="email"
          {...register('email', {
            required: 'Обязательное поле',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
        />

        <Input
          error={errors.password?.message}
          id="password"
          label="Пароль"
          type="password"
          {...register('password', {
            required: 'Обязательное поле',
            minLength: {
              value: 8,
              message: 'Пароль должен содержать не менее 8 символов',
            },
            validate: (value) => /^(?=.*[A-Z])(?=.*\d).+$/.test(value) || 'Пароль должен содержать заглавную букву и цифру',
          })}
        />

        <Input
          error={errors.confirmPassword?.message}
          id="repeatPassword"
          label="Повторите пароль"
          type="password"
          {...register('confirmPassword', {
            required: 'Обязательное поле',
            validate: (value) => value === password || 'Пароли должны совпадать',
          })}
        />

        <div className={styles.footer}>
          <Button
            theme="Ghost"
            text="Войти"
            type="button"
            href="/login"
          />

          <Button
            theme="Primary"
            text={loading ? 'Загрузка...' : 'Зарегистрироваться'}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export { Registration, type RegistrationData };
