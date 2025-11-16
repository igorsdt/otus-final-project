import { useState, useRef, useEffect } from 'react';
import type { SelectProps, Option } from './Select.types';
import styles from './Select.module.css';

const Select = ({ options, label, register, defaultValue = '', onChange, error }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === selectedValue) || options[0];
  const handleSelect = (option: Option) => {
    setSelectedValue(option.id);
    setIsOpen(false);
    onChange(option.id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={`${styles.customSelect}`} ref={selectRef}>
      <label className={styles.label}>{label}</label>

      <div
        className={`${styles.selectHeader} ${isOpen ? styles.open : ''} ${error ? styles.error : '' }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.name || 'Выберите...'}</span>
        <svg className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`} viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.selectOptions}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.option} ${selectedValue === option.id ? styles.selected : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      {register && (
        <input
          type="hidden"
          name={register.name}
          value={selectedValue}
          ref={register.ref}
          onBlur={register.onBlur}
          onChange={register.onChange}
        />
      )}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export { Select, type SelectProps, Option };
