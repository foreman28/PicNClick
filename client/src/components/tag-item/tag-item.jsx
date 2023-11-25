import {Flex, List, Space, Tag} from 'antd';
import {Link} from 'react-router-dom';
import {Paths} from "../../paths";

import styles from './tag-item.module.scss';

const TagItem = ({tag}) => {

  return (
    <List.Item id={`${tag.name}`} className={styles.item} key={tag.id}>
      <List.Item.Meta
        title={
          <Link to={`${Paths.search}?search=@${tag.name}`} className={styles.title}>#{tag.name}</Link>
        }
        description={
          <Space>
            <span>{tag.posts.length} Posts</span>
          </Space>
        }
      />
      <Flex gap={8} wrap={"wrap"} justify={"flex-start"} className={styles.tags}>
        {tag.posts.map((post, index) => (
          <Tag key={index} className={styles.tag}>
            <Link to={`/forum/${post.url}`}>{post.title}</Link>
          </Tag>
        ))}
      </Flex>
    </List.Item>
  );
};

export default TagItem;
