import React, {useEffect} from 'react';
import {Flex, List, Skeleton, Space} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useGetAllPostsQuery} from '../../api/posts';
import PostItem from '../../components/post-item/post-item';

import styles from './Forum.module.scss';
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import SkeletonPost from "../../components/skeleton-post/skeleton-post";

export const Forum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {data: posts, isLoading, isError} = useGetAllPostsQuery();

  useEffect(() => {
    if (isError) {
      console.error('Error fetching posts:', isError);
    }
  }, [isError]);


  return (
    <Layout>
      <Flex gap={12} vertical>

        <CustomBreadcrumb/>
        {/*<Title level={1}>Форум</Title>*/}

        {isLoading ? (
          <Flex vertical gap="12px">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={[1, 2, 3, 4]}
              renderItem={() => <SkeletonPost/>}
            />
          </Flex>
        ) : (
          <Flex vertical gap="12px">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={posts}
              renderItem={(item) => <PostItem post={item}/>}
              locale={{emptyText: 'Пусто'}}
            />
          </Flex>
        )}
      </Flex>
    </Layout>
  );
};

