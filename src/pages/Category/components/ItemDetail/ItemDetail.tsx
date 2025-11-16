import moment from 'moment';
import { DetailProps } from '@/types/Detail';
import styles from '@/styles/ItemDetail.module.css';
import { FC } from 'react';
import { Submenu } from '@/components';

const ItemDetail: FC<DetailProps> = ({
  id,
  category,
  createdAt,
  updatedAt,
  desc,
  name,
  amount,
  photo,
  onClick
}: DetailProps) => {

  return (
    <article className={styles.detail} id={id}>
      <Submenu onButtonClick={onClick} buttonType='edit' />
      <div className={styles.table}>
        {photo && (
          <img src={photo} width={250} height={400} />
        )}
        {category?.name && (
          <div className={styles.row}>
            <p className={styles.label}>Категория</p>
            <div className={styles.value}>{category.name}</div>
          </div>
        )}
        {createdAt && (
          <div className={styles.row}>
            <p className={styles.label}>Дата создания</p>
            <div className={styles.value}>{moment(createdAt).format('DD.MM.YYYY HH:mm:ss')}</div>
          </div>
        )}
        {updatedAt && (
          <div className={styles.row}>
            <p className={styles.label}>Дата обновления:</p>
            <div className={styles.value}>{moment(updatedAt).format('DD.MM.YYYY HH:mm:ss')}</div>
          </div>
        )}
        <div className={styles.row}>
          <p className={styles.label}>Название:</p>
          <div className={styles.value}>{name}</div>
        </div>
        {desc && (
          <div className={styles.row}>
            <p className={styles.label}>Описание:</p>
            <div className={styles.value}>{desc}</div>
          </div>
        )}
        {!!amount && (
          <div className={styles.row}>
            <p className={styles.label}>Стоимость:</p>
            <div className={styles.value}>{`${amount}\u00A0₽`}</div>
          </div>
        )}
      </div>
    </article>
  );
};

export { ItemDetail, type DetailProps };
