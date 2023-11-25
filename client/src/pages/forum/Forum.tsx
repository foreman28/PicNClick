import React, {useEffect, useState} from 'react';
import {Flex, List, Pagination, Skeleton, Space} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useGetAllPostsQuery} from '../../api/posts';
import PostItem from '../../components/post-item/post-item';

import styles from './Forum.module.scss';
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import SkeletonPost from "../../components/skeleton-post/skeleton-post";
import {useParams, useNavigate} from "react-router-dom";

export const Forum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
  const { page }:any = useParams();
  const currentPage = parseInt(page) || 1;
  const pageSize = 10;
  
  const navigate = useNavigate(); // Get access to the history object
  
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  
  const { data: allPosts } = useGetAllPostsQuery({});
  const totalPosts = allPosts?.length || 0;
  
  useEffect(() => {
    if (isError) {
      console.error('Error fetching posts:', isError);
    }
  }, [isError]);
  
  const handlePageChange = (page:any) => {
    window.scrollTo(0, 0);
    // Use the history object from react-router-dom to navigate
    navigate(`/forum/${page}`);
  };
  
  
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb />
        {isLoading ? (
          <Flex vertical gap="12px">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={[1, 2, 3]}
              renderItem={() => <SkeletonPost />}
            />
          </Flex>
        ) : (
          <Flex vertical gap="12px">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={posts}
              renderItem={(item) => <PostItem post={item} />}
              locale={{ emptyText: 'Пусто' }}
            />
          </Flex>
        )}
        <Flex justify="center" style={{ marginTop: '16px' }}>
          <Pagination
            total={totalPosts}
            pageSize={pageSize}
            current={currentPage}
            onChange={handlePageChange}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

