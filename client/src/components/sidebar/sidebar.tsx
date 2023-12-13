import {Flex, Layout, List} from "antd";
import {Link,} from "react-router-dom";

import {LinkOutlined, StarOutlined} from '@ant-design/icons';

import {useGetAllPostsQuery} from "../../api/posts";
import {LikeButton} from "../custom-button/like-button/like-button";
import {Paths} from "../../paths";
import {CommentButton} from "../custom-button/comment-button/comment-button";

import styles from "./sidebar.module.scss";
import Paragraph from "antd/es/typography/Paragraph";

export const Sidebar = () => {
  // const onLogoutClick = () => {
  //   dispatch(logout());
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  const {data: likesPosts, isLoading: isLoadingLikes} = useGetAllPostsQuery({
    pageSize: 3,
    filters: {
      sort: 'likes',
      order: 'desc'
    }
  });
  const {data: commentsPosts, isLoading: isLoadingPosts} = useGetAllPostsQuery({
    pageSize: 3,
    filters: {
      sort: 'comments',
      order: 'desc'
    }
  });

  return (
    <Layout.Sider className={styles.sidebar} width={"var(--white-sidebar)"}>
      <Flex style={{
        position: 'sticky',
        top: '82px'
      }} className={styles.sidebar_container} gap={"middle"} vertical>

        <Flex gap={"small"} vertical>
          <Flex gap={"small"} align={"center"}>
            <StarOutlined style={{fontSize: '18px'}}/>
            <span className={styles.sidebar_title}>В фокусе</span>
          </Flex>
          {isLoadingLikes ? "" :
            <List
              size="small"
              dataSource={likesPosts}
              className={styles.sidebar_list}
              renderItem={(item) =>
                <List.Item className={styles.sidebar_item} key={item.id}>
                  <Flex justify={"space-between"} style={{width: '100%'}} gap={12} align={"center"}>
                    <Paragraph ellipsis={{rows: 1}} style={{margin: 0}}>
                      <Link to={`${Paths.forum}/${item.url}`} className={styles.sidebar_link}>
                        {item.title}
                      </Link>
                    </Paragraph>
                    <Flex gap={16}>
                      <LikeButton post={item}/>
                      {/*<CommentButton post={item}/>*/}
                    </Flex>
                  </Flex>
                </List.Item>
              }
              locale={{emptyText: 'Пусто'}}
            />
          }
        </Flex>

        <Flex gap={"small"} vertical>
          <Flex gap={"small"} align={"center"}>
            <LinkOutlined style={{fontSize: '18px'}}/>
            <span className={styles.sidebar_title}>Стоит прочитать</span>
          </Flex>
          {isLoadingPosts ? "" :
            <List
              size="small"
              dataSource={commentsPosts}
              className={styles.sidebar_list}
              renderItem={(item) =>
                <List.Item className={styles.sidebar_item} key={item.id}>
                  <Flex justify={"space-between"} style={{width: '100%'}} gap={12} align={"center"}>
                    <Paragraph ellipsis={{rows: 1}} style={{margin: 0}}>
                      <Link to={`${Paths.forum}/${item.url}`} className={styles.sidebar_link}>
                        {item.title}
                      </Link>
                    </Paragraph>
                    <Flex gap={16}>
                      {/*<LikeButton post={item}/>*/}
                      <CommentButton post={item}/>
                    </Flex>
                  </Flex>
                </List.Item>
              }
              locale={{emptyText: 'Пусто'}}
            />
          }
        </Flex>

      </Flex>
    </Layout.Sider>
  );
};
