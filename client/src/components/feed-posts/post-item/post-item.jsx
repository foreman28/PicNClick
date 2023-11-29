import React from 'react';
import {List, Space, Tag, Avatar, Flex, Typography} from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import styles from './post-item.module.scss';

import {ru} from 'date-fns/locale';
import {format, formatDistanceToNow} from "date-fns";
import {Paths} from "../../../paths";
import TagItem from "../../tag-item/tag-item";
import {CustomTag} from "../../custom-tag/custom-tag";

const {Paragraph} = Typography;

const PostItem = ({post}) => {
  const createdDate = new Date(post.timestamp);

  const formattedTimestamp =
    new Date() - createdDate < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdDate, {locale: ru, addSuffix: true})
      : format(createdDate, 'MMMM d, yyyy HH:mm', {locale: ru});

  return (
    <List.Item
      className={styles.item}
      key={post.id}
      actions={[
        <Space>
          <MessageOutlined key="comments" rev="true"/>
          <span>{post.commentsCount}</span>
        </Space>,
        <Space>
          <LikeOutlined key="like" rev="true"/>
          <span>{post.likesCount}</span>
        </Space>,
        <Space>
          <ClockCircleOutlined key="clock" rev="true"/>
          <span> {formattedTimestamp}</span>
        </Space>,
      ]}

    >
      <List.Item.Meta
        description={
          <Flex gap={8} vertical>
            <Space>
              <Flex gap={16} align={"center"}>
                <Link to={"/user/" + post.author.id}>
                  <Avatar
                    src={post.author.avatarURL !== null ? post.author.avatarURL : `${process.env.PUBLIC_URL}/img/avatar.jpg`}/>
                </Link>
                <Flex vertical>
                  <Link to={"/user/" + post.author.id} className={styles.username}>{post.author.username}</Link>
                </Flex>
              </Flex>
            </Space>

            <Link style={{display: "contents"}} to={`/forum/${post.url}`}>
              {post.image64 ?
                <img
                  className={styles.img}
                  srcSet={post.image64}
                  width={932}
                  height={420}
                  alt={post.title}
                  loading="lazy"
                />
                :
                ""
              }
            </Link>

            <Flex gap={0} vertical>
              <Link className={styles.title} to={`/forum/${post.url}`}>
                {post.title}
              </Link>
              <Paragraph className={styles.text} ellipsis={{rows: 2}}>
                {post.description}
              </Paragraph>
              <Flex>
                <CustomTag post={post} />

                {/*<List*/}
                {/*  itemLayout="vertical"*/}
                {/*  size="large"*/}
                {/*  dataSource={post.tags}*/}
                {/*  renderItem={(tag) => <Comments key={tag.id} tag={tag} />}*/}
                {/*/>*/}
              </Flex>
            </Flex>
          </Flex>
        }
      />
    </List.Item>
  );
};

export default PostItem;
