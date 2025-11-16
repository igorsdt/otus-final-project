import { FC } from 'react';
import styles from './AddButton.module.css';
import { AddButtonProps } from '@/ui/AddButton/AddButton.types';

const AddButton: FC<AddButtonProps> = ({ onClick }: AddButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} />
  );
};

export { AddButton };
