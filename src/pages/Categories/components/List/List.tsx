import { Link } from 'react-router-dom';
import { Item } from '../Item/Item';
import { ListProps } from './List.types';
import styles from '@/styles/ListStyles.module.css';
import { FC } from 'react';

const List: FC<ListProps> = ({ defaultItems }: ListProps) => {
  return (
    <article className={styles.list}>
      <div className={styles.wrapper}>
        {!!defaultItems && defaultItems.map((item: any) => (
          <Link to={`/categories/${item.id}`} className={styles.item} key={item.id}>
            <Item {...item} />
          </Link>
        ))}
        {(!defaultItems || defaultItems.length === 0) && (
          <p className={styles.nothing}>
            Ничего не найдено
          </p>
        )}
      </div>
    </article>
  );
};

export { List };
