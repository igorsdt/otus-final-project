import type { FC, ReactNode } from 'react';
import styles from './LoginLayout.module.css';

type LoginRouteProps = {
  children: ReactNode;
};

const LoginLayout: FC<LoginRouteProps> = ({ children }: LoginRouteProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Приложение учёта доходов/расходов</h1>
      </div>
      {children}
    </div>
  );
};

export { LoginLayout };
