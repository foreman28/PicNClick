import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {List, Flex, Pagination} from 'antd';

import SkeletonPost from "../skeleton-post/skeleton-post";
import PostItem from "./post-item/post-item";

import {useGetAllPostsQuery} from "../../api/posts";

import styles from './feed-posts.module.scss';

type Props = {
  data?: any;
};

export const FeedPosts = ({ data }: Props) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  const searchS = new URLSearchParams(search).get('search') || '';
  
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({
    page: currentPage,
    pageSize: pageSize,
    search: searchS,
  });
  
  const { data: allPosts } = useGetAllPostsQuery({});
  const totalPosts = data?.length || allPosts?.length || 0;
  
  useEffect(() => {
    const pageParam = new URLSearchParams(search).get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(page);
  }, [search]);
  
  const handlePageChange = (page: number) => {
    const totalPages = Math.ceil(totalPosts / pageSize);
    const validPage = Math.min(Math.max(1, page), totalPages);
    navigate(`?page=${validPage}&search=${searchS}`);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, handlePageChange]);
  
  return (
    <>
      {isLoading || isError ? (
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
      {console.log(totalPosts)}
      {totalPosts > pageSize && posts?.length !=0 && (
        <Flex justify="center" style={{ marginTop: '16px' }}>
          <Pagination
            total={totalPosts}
            pageSize={pageSize}
            current={currentPage}
            onChange={handlePageChange}
          />
        </Flex>
      )}
    </>
  );
};


