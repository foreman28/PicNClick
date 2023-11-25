import React, {useEffect, useState} from 'react';
import {List, Flex, Pagination} from 'antd';

import {useLocation, useNavigate} from 'react-router-dom';
import styles from './feed-posts.module.scss';

import {Paths} from "../../paths";
import SkeletonPost from "../skeleton-post/skeleton-post";
import PostItem from "../post-item/post-item";
import {useGetAllPostsQuery} from "../../api/posts";


type Props = {
  // pageProps: string;
  data?: any;
};

export const FeedPosts = ({data}: Props) => {
  const {search} = useLocation();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const {data: posts, isLoading, isError} = useGetAllPostsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  
  const {data: allPosts, isLoading: isLoadingPosts} = useGetAllPostsQuery({});
  const totalPosts = data?.length || allPosts?.length || 0;
  
  useEffect(() => {
    const pageParam = new URLSearchParams(search).get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(page);
  }, [search]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
  };
  
  return (
    <>
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
      
      
      {(totalPosts > pageSize) ? (
        <Flex justify="center" style={{marginTop: '16px'}}>
          <Pagination
            total={totalPosts}
            pageSize={pageSize}
            current={currentPage}
            onChange={handlePageChange}
          />
        </Flex>
      ) : undefined}
    </>
  );
};

