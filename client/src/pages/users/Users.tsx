import React, {useEffect} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";

import styles from "./Users.module.scss";
import ForumPost from "../../components/forum-post/forum-post";
// import {useDispatch, useSelector} from "react-redux";
import {useGetAllPostsQuery} from "../../api/posts";

export const Users = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {data: posts, isLoading, isError} = useGetAllPostsQuery();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.error('Error fetching posts:', isError);
    }

  }, [isError]);

  return (
    <Layout>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Flex className={styles.main} vertical gap={"12px"}>
            <List
              className={styles.list}
              itemLayout="vertical"
              size="large"
              dataSource={posts}
              renderItem={(item) =>
                <ForumPost post={item}/>
              }
              locale={{emptyText: 'Пусто'}}
            />
          </Flex>
        </>
      )}

    </Layout>
  );
};
