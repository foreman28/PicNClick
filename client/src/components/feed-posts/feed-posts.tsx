import {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {List, Flex} from 'antd';

import SkeletonPost from "../skeleton-post/skeleton-post";
import PostItem from "../post-item/post-item";
import {PaginationComponent} from "../custom-pagination/custom-pagination";

import {useGetAllPostsQuery} from "../../api/posts";

import styles from './feed-posts.module.scss';

type Props = {
  authorId?: number
}

export const FeedPosts = ({authorId}: Props) => {
  const {search} = useLocation();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  const searchS = new URLSearchParams(search).get('q') || '';
  
  const {data: posts, isLoading, refetch: refetchAllPosts} = useGetAllPostsQuery({
    page: currentPage,
    pageSize: pageSize,
    q: searchS,
    filters: {
      where: {
        authorId: authorId || 0,
      },
    }
  });
  const totalPosts = posts?.count || 0;
  
  const [searchParams]: any = useSearchParams();
  
  useEffect(() => {
    setCurrentPage(() => parseInt(searchParams.get('page')) || 1);
  }, [searchParams]);
  
  
  const handlePageChange =
    (page: any) => {
      const totalPages = Math.ceil(totalPosts / pageSize);
      const validPage = Math.min(Math.max(1, page), totalPages);
      searchParams.set('page', validPage.toString());
      searchParams.set('q', searchS);
      navigate(`?${searchParams.toString()}`);
    }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const skeletonList = useMemo(
    () => (
      <Flex vertical gap="12px">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={[1, 2]}
          renderItem={() => <SkeletonPost/>}
          locale={{emptyText: 'Пусто'}}
        />
      </Flex>
    ),
    []
  );
  
  const postList = useMemo(
    () => (
      <Flex vertical gap="12px">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts && posts.posts}
          renderItem={(item) => <PostItem key={item.id} post={item} refetch={refetchAllPosts}/>}
          locale={{emptyText: 'Пусто'}}
        />
      </Flex>
    ),
    [posts]
  );
  
  return (
    <>
      {isLoading ?
        skeletonList
        :
        postList
      }
      <PaginationComponent
        total={totalPosts}
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};



