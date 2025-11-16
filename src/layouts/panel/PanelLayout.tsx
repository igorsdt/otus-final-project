import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { UserDropdown } from '@/components';
import styles from './PanelLayout.module.css';
import { useLayoutContext } from '@/serviсes/LayoutContext';
import clsx from 'clsx';

type PanelLayoutProps = {
  children: ReactNode;
};

const PanelLayout: FC<PanelLayoutProps> = ({ children }: PanelLayoutProps) => {
  const { pageTitle, activeMenuTitle } = useLayoutContext();
  const menuItems = [
    { title: 'Операции', link: '/operations' },
    { title: 'Категории', link: '/categories' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              className={
                clsx(styles.item, {
                  [styles.active]: item.title === activeMenuTitle
                })
              }
              to={item.link}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <h1 className={styles.title}>{ pageTitle }</h1>
        <UserDropdown />
      </div>
      {children}
    </div>
  );
};

export { PanelLayout };
