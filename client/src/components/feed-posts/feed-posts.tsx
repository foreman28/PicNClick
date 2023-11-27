import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {List, Flex, Pagination} from 'antd';

import SkeletonPost from "../skeleton-post/skeleton-post";
import PostItem from "./post-item/post-item";

import {useGetAllPostsQuery} from "../../api/posts";

import styles from './feed-posts.module.scss';

export const FeedPosts = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  const searchS = new URLSearchParams(search).get('q') || '';
  
  const { data: posts, isLoading } = useGetAllPostsQuery({
    page: currentPage,
    pageSize: pageSize,
    q: searchS,
  });
  
  // console.log(posts)
  const { data: allPosts, isLoading:allIsLoading } = useGetAllPostsQuery({
    q: searchS,
  });
  const totalPosts = allPosts?.length || 0;
  
  const [searchParams]:any = useSearchParams();
  const pageParam:any = parseInt(searchParams.get('page')) || 1;
  
  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);
  
  const handlePageChange = (page: number) => {
    const totalPages = Math.ceil(totalPosts / pageSize);
    const validPage = Math.min(Math.max(1, page), totalPages);
    searchParams.set('page', validPage.toString());
    searchParams.set('q', searchS);
    navigate(`?${searchParams.toString()}`);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, handlePageChange]);
  
  return (
    <>
      {isLoading || allIsLoading ? (
        <Flex vertical gap="12px">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={[1, 2, 3]}
            renderItem={() => <SkeletonPost />}
            locale={{ emptyText: 'Пусто' }}
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
      
      {totalPosts > pageSize && (
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


