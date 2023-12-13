import {LikeFilled, LikeOutlined} from '@ant-design/icons';
import {Flex, Space} from 'antd';
import {useToggleLikeMutation} from '../../../api/likes';
import {useGetPostQuery} from "../../../api/posts";
// import CountUp from 'react-countup';

import styles from './like-button.module.scss';
import React from "react";
import {useAppSelector} from "../../../hooks/hooks";


type Props = {
  post: any
}

export const LikeButton = React.memo(({post}: Props) => {
  const [addLikeMutation] = useToggleLikeMutation();
  const {data: updatedPost, isLoading, refetch}: any = useGetPostQuery(post.url);
  const currentUserId = useAppSelector((state) => state.auth.user && state.auth.user.id);
  
  const userHasLiked = updatedPost && updatedPost.likes ? updatedPost.likes.some((like: any) => like.userId === currentUserId) : false;
  
  const handleAddLike = async () => {
    try {
      const postId = post.id;
      await addLikeMutation({postId});
      refetch();
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  return (
    <Flex
      key="like"
      onClick={() => handleAddLike()}
      className={styles['btn'] + " " + (userHasLiked ? styles['btn-active'] : '')}
      justify={"space-between"}
    >
      {isLoading ? '' : <>
        {userHasLiked ? <LikeFilled/> : <LikeOutlined className={styles.icon}/>}
        <span className={styles.number}>{updatedPost?.likes ? updatedPost?.likes?.length : 0}</span>
      </>}
    </Flex>
  );
})
