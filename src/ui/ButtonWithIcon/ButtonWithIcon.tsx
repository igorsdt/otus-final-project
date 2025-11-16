import { FC } from 'react';
import styles from './ButtonWithIcon.module.css';
import { ButtonWithIconProps } from './ButtonWithIcon.types';
import { FaPencilAlt } from "react-icons/fa";

const ButtonWithIcon: FC<ButtonWithIconProps> = ({ onClick }: ButtonWithIconProps) => {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      <FaPencilAlt color={'white'} />
    </button>
  );
};

export { ButtonWithIcon };
