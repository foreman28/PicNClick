import {List, Space, Flex, Typography, Dropdown, MenuProps} from 'antd';
import {
  ClockCircleOutlined, MoreOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {CustomTag} from "../custom-tag/custom-tag";
import {LikeButton} from "../custom-button/like-button/like-button";
import {Paths} from "../../paths";
import {CommentButton} from "../custom-button/comment-button/comment-button";
import {CustomAvatar} from "../avatar/avatar";
import {selectUser} from "../../features/auth/authSlice";
import {useRemovePostMutation} from "../../api/posts";
import copy from 'clipboard-copy';
import TimeDisplay from "../time-display/time-display";
import {useAppSelector} from "../../hooks/hooks";

import styles from './post-item.module.scss';
import {ForumPost} from "@prisma/client";

const {Paragraph, Title} = Typography;

type Props = {
  post: ForumPost | any,
  refetch: any
}

const PostItem = ({post, refetch}: Props) => {
  const user = useAppSelector(selectUser)
  const [removePost] = useRemovePostMutation()
  
  const items: MenuProps['items'] =
    (user?.id === post.authorId || user?.role === "ADMIN") ? [
      {
        key: '1',
        label: "Поделиться",
        onClick: () => {
          console.log("Поделиться")
          copy(`${process.env.REACT_APP_CLIENT_URL}${Paths.forum}/${post.url}`)
        }
      },
      {
        key: '2',
        label: 'Изменить',
        onClick: () => {
          console.log("Изменить")
          
        }
      },
      {
        key: '3',
        label: 'Удалить',
        onClick: () => {
          removePost(post.id)
          refetch()
        },
        danger: true
      }
    ] : [
      {
        key: '1',
        label: "Поделиться",
        onClick: () => {
          console.log("Поделиться")
          copy(`${process.env.REACT_APP_CLIENT_URL}${Paths.forum}/${post.url}`)
        }
      }
    ];
  
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
          <TimeDisplay createdAt={post.timestamp}/>
        </Space>,
      ]}
    >
      <List.Item.Meta
        description={
          <Flex gap={8} vertical>
            <Flex justify={"space-between"}>
              <Flex gap={12} align={"center"}>
                <CustomAvatar user={post.author}/>
                <Flex vertical>
                  <Link
                    to={`${Paths.profile}/` + post.author.username}
                    className={styles.username}
                  >
                    {post.author.username}
                  </Link>
                </Flex>
              </Flex>
              
              <Dropdown menu={{items}} trigger={['click']} placement="bottomRight">
                <MoreOutlined className={styles.icon}/>
              </Dropdown>
            </Flex>
            
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
              <Title ellipsis={true}>
                <Link className={styles.title} to={`/forum/${post.url}`}>
                  {post.title}
                </Link>
              </Title>
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
