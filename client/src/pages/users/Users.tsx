import React, {useEffect} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";

import styles from "./Users.module.scss";
import PostItem from "../../components/post-item/post-item";
// import {useDispatch, useSelector} from "react-redux";
import {useGetAllPostsQuery} from "../../api/posts";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

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
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        {/*<Title level={1}>Пользователи</Title>*/}

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
                  <PostItem post={item}/>
                }
                locale={{emptyText: 'Пусто'}}
              />
            </Flex>
          </>
        )}
      </Flex>
    </Layout>
  );
};
