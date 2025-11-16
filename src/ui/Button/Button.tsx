import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button = ({
    theme = 'Primary', disabled, onClick, href, text, type = 'button'
}: ButtonProps) => {
  const btnClasses = clsx(styles.button, {
    [styles.disabled]: disabled,
  }, styles[theme]);

  if (href) {
    return (
      <Link
        to={href}
        className={btnClasses}
      >{text}</Link>
    );
  }

  return (
    <button
      className={btnClasses}
      disabled={disabled}
      type={type}
      onClick={disabled ? undefined : onClick}
    >{text}</button>
  );
};

export { Button, type ButtonProps };
