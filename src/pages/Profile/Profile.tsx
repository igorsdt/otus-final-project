import { FC, useEffect } from 'react';
import { Submenu } from '@/components';
import { Loader } from '@/ui';
import { useLayoutContext } from '@/serviсes/LayoutContext';
import { useProfile } from '@/hooks';
import moment from 'moment';
import styles from './Profile.module.css';

const Profile: FC = () => {
  const { setTitle, setActiveMenuTitle } = useLayoutContext();
  const { error, loading, profile } = useProfile();

  useEffect(() => {
    setTitle('Личный кабинет');
    setActiveMenuTitle('Личный кабинет');
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>При запросе данных произошла ошибка: {error.message}</p>;

  return (
    <div>
      <Submenu buttonType={'none'} />
      <div className={styles.table}>
        {profile?.id &&
          <div className={styles.row}>
            <p className={styles.label}>Идентификатор:</p>
            <div className={styles.value}>{profile.id}</div>
          </div>
        }
        {profile?.email &&
          <div className={styles.row}>
            <p className={styles.label}>Email:</p>
            <div className={styles.value}>{profile.email}</div>
          </div>
        }
        {profile?.commandId &&
          <div className={styles.row}>
            <p className={styles.label}>Идентификатор команды:</p>
            <div className={styles.value}>{profile.commandId}</div>
          </div>
        }
        {profile?.signUpDate &&
          <div className={styles.row}>
            <p className={styles.label}>Дата регистрации:</p>
            <div className={styles.value}>{moment(profile.signUpDate).format('DD.MM.YYYY HH:mm:ss')}</div>
          </div>
        }
        {profile?.name &&
          <div className={styles.row}>
            <p className={styles.label}>Имя пользователя:</p>
            <div className={styles.value}>{profile.name}</div>
          </div>
        }
      </div>
    </div>
  );
};

export { Profile };
