import React from 'react';
import {List, Space, Tag, Typography, Avatar, Flex} from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import styles from './forum-post.module.scss';

const {Text} = Typography;

const ForumPost = ({post}) => {
  return (
    <List.Item
      className={styles.item}
      key={post.title}
      actions={[
        <Space>
          <MessageOutlined key="comments" rev="true"/>
          <span>{post.commentsCount}</span>
        </Space>,
        <Space>
          <LikeOutlined key="like" rev="true"/>
          <span>45</span>
        </Space>,
        <Space>
          <ClockCircleOutlined key="clock" rev="true"/>
          <span> {post.timestamp}</span>
        </Space>,
      ]}
      // extra={
      //   <Space>
      //     <Avatar src="/img/avatar.jpg"/>
      //     <Text strong>{post.author}</Text>
      //   </Space>
      // }
    >
      <List.Item.Meta
        description={
          <div>
            {console.log(post.author)}
            <Flex gap={16}>
              <Avatar src="/img/avatar.jpg"/>
              <Text strong>{post.author}</Text>
            </Flex>

            <Link className={styles.item_title} to={`/forum/${post.id}`}>
              {post.title}
            </Link>
            <div className={styles.item_text}>{post.content}</div>

            <Space>
              {post.tags.map((tag, index) => (
                <Tag key={index} className={styles.item_tag}>
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        }
      />
    </List.Item>
  );
};

export default ForumPost;
