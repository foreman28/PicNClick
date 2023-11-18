import React from 'react';
import {List, Space, Tag, Avatar, Flex} from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import styles from './forum-post.module.scss';

import {ru} from 'date-fns/locale';
import {format, formatDistanceToNow} from "date-fns";


const ForumPost = ({post}) => {

  const createdDate = new Date(post.timestamp);

  // Display different formats based on the age of the post
  const formattedTimestamp =
    new Date() - createdDate < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdDate, {locale: ru, addSuffix: true})
      : format(createdDate, 'MMMM d, yyyy HH:mm', {locale: ru});

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
          <span> {formattedTimestamp}</span>
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
          <Flex gap={8} vertical>
            <Space>
              <Flex gap={16} align={"center"}>
                <Link to={"/user/" + post.author.id}><Avatar
                  src={post.author.avatarURL !== null ? post.author.avatarURL : "/img/avatar.jpg"}/></Link>
                <Flex vertical>
                  <Link to={"/user/" + post.author.id} className={styles.username}>{post.author.username}</Link>
                </Flex>
              </Flex>
            </Space>

            <Link style={{display: "contents"}} to={`/forum/${post.id}`}>
              <img className={styles.img} srcSet={post.imageURL !== null ? post.imageURL : "/img/image-1.png"} width={1132} height={420} alt=""/>
            </Link>

            <Flex gap={0} vertical>
              <Link className={styles.title} to={`/forum/${post.id}`}>
                {post.title}
              </Link>
              <div className={styles.text}>{post.content}</div>

              <Space>
                {post.tags.map((tag, index) => (
                  <Tag key={index} className={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </Space>
            </Flex>
          </Flex>
        }
      />
    </List.Item>
  );
};

export default ForumPost;
