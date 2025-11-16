import { FC } from 'react';
import styles from './Submenu.module.css';
import { BackButton } from '@/ui';
import { AddButton, ButtonWithIcon } from '@/ui';
import { type SubmenuProps } from './Submenu.types';

const Submenu: FC<SubmenuProps> = ({ onButtonClick = () => {}, buttonType = 'add' }: SubmenuProps) => {
  let buttonContent;

  switch (buttonType) {
    case 'add':
      buttonContent = <AddButton onClick={onButtonClick} />;
      break;
    case 'edit':
      buttonContent = <ButtonWithIcon onClick={onButtonClick} />;
      break;
    case 'none':
      buttonContent = '';
      break;
  }

  return (
    <div className={styles.submenu}>
      <BackButton />
      {buttonContent}
    </div>
  );
};


export { Submenu, type SubmenuProps };
