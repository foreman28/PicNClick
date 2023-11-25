import React, {useEffect, useState} from 'react';
import {Flex, List, Pagination, Skeleton, Space} from 'antd';
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
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  
  const { data: allPosts, isLoading: isAllPostsLoading } = useGetAllPostsQuery({});
  const totalPosts = isAllPostsLoading ? 0 : allPosts?.length || 0;
  console.log(totalPosts)
  
  useEffect(() => {
    if (isError) {
      console.error('Error fetching posts:', isError);
    }
  }, [isError]);
  
  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };
  
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
              dataSource={[1, 2, 3]}
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
        <Flex justify="center" style={{ marginTop: '16px' }}>
          <Pagination
            total={totalPosts} // Replace this with the total number of posts from your API
            pageSize={pageSize}
            current={currentPage}
            onChange={handlePageChange}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

