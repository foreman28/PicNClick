import React, {useEffect, useState} from 'react';
import {Flex, List, Pagination, Skeleton, Space} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useGetAllPostsQuery} from '../../api/posts';
import PostItem from '../../components/post-item/post-item';

import styles from './Forum.module.scss';
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import SkeletonPost from "../../components/skeleton-post/skeleton-post";
import {useLocation, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";

export const Forum = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  
  const { data: allPosts } = useGetAllPostsQuery({});
  const totalPosts = allPosts?.length || 0;
  
  useEffect(() => {
    const pageParam = new URLSearchParams(search).get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(page);
  }, [search]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    navigate(`${Paths.forum}?page=${page}`);
  };
  
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
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
        <Flex justify="center" style={{marginTop: '16px'}}>
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
