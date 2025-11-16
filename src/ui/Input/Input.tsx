import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import type { InputProps, InputType } from './Input.types';
import styles from './Input.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className = '', error, id, label, onChange, placeholder, type = 'text', value, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        {value}
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${error ? styles.error : ''}`}
            defaultValue={value}
            id={id}
            placeholder={placeholder}
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            {...props}
          />

          {isPassword && (
            <button
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              className={styles.toggleButton}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          )}
        </div>

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, type InputProps, type InputType };
