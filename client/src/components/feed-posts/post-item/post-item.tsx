import {List, Space, Avatar, Flex, Typography} from 'antd';
import {
  MessageOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {ru} from 'date-fns/locale';
import {format, formatDistanceToNow} from "date-fns";
import {CustomTag} from "../../custom-tag/custom-tag";
import {LikeButton} from "../../custom-button/like-button/like-button";

import styles from './post-item.module.scss';
import {Paths} from "../../../paths";
import {CommentButton} from "../../custom-button/comment-button/comment-button";
import {CustomAvatar} from "../../avatar/avatar";
import {useEffect} from "react";

const {Paragraph} = Typography;

const PostItem = ({post}: any) => {
  const createdDate: any = new Date(post.timestamp);
  const newDate: any = new Date();
  
  const formattedTimestamp =
    newDate - createdDate < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdDate, {locale: ru, addSuffix: true})
      : format(createdDate, 'MMMM d, yyyy HH:mm', {locale: ru});
  
  return (
    <List.Item
      className={styles.item}
      key={post.id}
      actions={[
        <Space>
          <CommentButton post={post}/>
        </Space>,
        <Space>
          <LikeButton post={post}/>
        </Space>,
        <Space>
          <ClockCircleOutlined/>
          <span> {formattedTimestamp}</span>
        </Space>,
      ]}
    >
      <List.Item.Meta
        description={
          <Flex gap={8} vertical>
            <Space>
              <Flex gap={12} align={"center"}>
                <CustomAvatar user={post.author}/>
                <Flex vertical>
                  <Link to={`${Paths.profile}/` + post.author.username} className={styles.username}>{post.author.username}</Link>
                </Flex>
              </Flex>
            </Space>
            
            <Link style={{display: "contents"}} to={`${Paths.forum}/${post.url}`}>
              {`${process.env.REACT_APP_URL}${post.image}` ?
                <img
                  className={styles.img}
                  srcSet={`${process.env.REACT_APP_URL}${post.image}`}
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
                <CustomTag post={post}/>
              </Flex>
            </Flex>
          </Flex>
        }
      />
    </List.Item>
  );
};

export default PostItem;
