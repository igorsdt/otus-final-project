import { FC, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BackButton.module.css';

const BackButton: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles.button} type="button" onClick={handleGoBack}>
      <FiArrowLeft className="text-lg" />
      <span>Вернуться</span>
    </button>
  );
};

export { BackButton };
