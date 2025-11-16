import { FC } from 'react';
import styles from './NoElements.module.css';


const NoElements:FC = () => {
  return (
    <div className={styles.block}>
      <p className={styles.text}>Элементов не найдено, добавьте хотя бы один</p>
    </div>
  );
};

export { NoElements };
