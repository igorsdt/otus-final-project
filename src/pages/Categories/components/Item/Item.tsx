import type { ItemProps } from './Item.types';
import styles from './Item.module.css';
import moment from 'moment';
import { FC } from 'react';

const Item: FC<ItemProps> = ({
  id,
  category,
  desc,
  name,
  photo,
  updatedAt,
}: ItemProps) => {
  const ruDate = moment(updatedAt).format('DD.MM.YYYY HH:mm');

  return (
    <article className={styles.item} id={id}>
      {photo && (
        <div className={styles.photo}>
          <img width={40} height={40} src={photo} loading="lazy" />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.top}>
          {category?.name && <div className={styles.category}>{category.name}</div>}
          {updatedAt && <div className={styles.date}>{ruDate}</div>}
        </div>
        <div className={styles.text}>
          <div className={styles.name}>{name}</div>
          {desc && <div className={styles.desc}>{desc}</div>}
        </div>
      </div>
    </article>
  );
};

export { Item, type ItemProps };
