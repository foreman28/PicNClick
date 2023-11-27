import {Flex, List, Space, Tag, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {Paths} from "../../paths";

import styles from './tag-item.module.scss';

const {Paragraph} = Typography;

const TagItem = ({tag}) => {

  return (
    <List.Item style={{padding: '12px'}} className={styles.item} key={tag.id}>
      <List.Item.Meta
        title={
          <Link to={`${Paths.search}?q=@${tag.url}`} className={styles.title}>#{tag.name}</Link>
        }
      />
      <Paragraph className={styles.description} ellipsis={{rows: 3, expandable: true, symbol: 'Раскрыть'}}>
        {tag.description}
      </Paragraph>
      <div className={styles.posts}>{tag.posts.length} {tag.posts.length > 1 ? 'Темы' : 'Тема'}</div>
      {/*<Flex gap={8} wrap={"wrap"} justify={"flex-start"} className={styles.tags}>*/}
      {/*  {tag.posts.map((post, index) => (*/}
      {/*    <Tag key={index} className={styles.tag}>*/}
      {/*      <Link to={`/forum/${post.url}`}>{post.title}</Link>*/}
      {/*    </Tag>*/}
      {/*  ))}*/}
      {/*</Flex>*/}
    </List.Item>
  );
};

export default TagItem;
