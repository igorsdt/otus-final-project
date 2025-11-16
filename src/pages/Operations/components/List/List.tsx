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
          <Link to={`/operations/${item.id}`} className={styles.item} key={item.id}>
            <Item {...item} />
          </Link>
        ))}
      </div>
    </article>
  );
};

export { List };
