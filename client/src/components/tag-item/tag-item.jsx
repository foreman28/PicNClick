import {List, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {Paths} from "../../paths";

import styles from './tag-item.module.scss';

const {Paragraph} = Typography;

const TagItem = ({tag}) => {

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }} className={styles.item} key={tag.id}>
        <Link to={`${Paths.search}?q=@${tag.url}`} className={styles.title}>
          #{tag.name}
        </Link>
      <Paragraph className={styles.description} ellipsis={{rows: 3, expandable: true, symbol: 'Раскрыть'}}>
        {tag.description}
      </Paragraph>
      <div className={styles.posts}>
        {tag.posts.length} {tag.posts.length > 1 ? 'Темы' : 'Тема'}
      </div>
    </div>
  );
};

export default TagItem;
