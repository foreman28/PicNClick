import {List, Space, Flex, Typography, Dropdown, MenuProps} from 'antd';
import {
  ClockCircleOutlined, MoreOutlined,
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
import {CustomButton} from "../../custom-button/custom-button";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/auth/authSlice";
import {useRemovePostMutation} from "../../../api/posts";
import copy from 'clipboard-copy';

const {Paragraph} = Typography;

type Props = {
  post: any,
  refetch: any
}

const PostItem = ({post, refetch}: Props) => {
  const createdDate: any = new Date(post.timestamp);
  const newDate: any = new Date();
  

  const formattedTimestamp =
    newDate - createdDate < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdDate, {locale: ru, addSuffix: true})
      : format(createdDate, 'MMMM d, yyyy HH:mm', {locale: ru});

  const user = useSelector(selectUser)
  const [removePost] = useRemovePostMutation()
  
  const items: MenuProps['items'] =
    (user?.id === post.authorId || user?.role === "ADMIN") ? [
      {
        key: '1',
        label: "Поделиться",
        onClick: () => {
          console.log("Поделиться")
          copy(`${process.env.REACT_APP_CLIENT_URL}${Paths.forum}/${post.url}`)
          
        } // TODO
      },
      {
        key: '2',
        label: 'Изменить',
        onClick: () => console.log("Изменить") // TODO
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
          
        } // TODO
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
          <span>{formattedTimestamp}</span>
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
