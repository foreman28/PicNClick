// LikeButton.jsx

import React, { useState, useEffect } from 'react';
import { LikeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import {
  useAddLikeMutation,
  useRemoveLikeMutation,
  useGetLikesByUserQuery,
} from '../../../api/likes';

import styles from './like-button.module.scss';

type Props = {
  postId: number,
  userId: number
}

export const LikeButton = ({ postId, userId }: Props) => {
  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();
  const { data: userLikes, refetch } = useGetLikesByUserQuery<any>(userId);
  
  const isPostLiked = userLikes && userLikes.some((like: any) => like.postId === postId);
  const [isLiking, setIsLiking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Перезапрашиваем данные после изменения лайков
    refetch();
  }, [isLiking]);
  
  const handleToggleLike = async () => {
    try {
      setIsLiking(true);
      
      if (isPostLiked) {
        const likeId = userLikes.find((like: any) => like.postId === postId).id;
        await removeLike(likeId);
      } else {
        await addLike({ postId, userId });
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
      
      // Удаление класса через некоторое время для возможности повторного запуска анимации
      if (!isPostLiked) {
        setTimeout(() => {
          setIsVisible(false);
        }, 600); // Измените продолжительность, если необходимо
      }
    }
  };

  
  return (
    <Space
      key="like"
      onClick={handleToggleLike}
      style={{ cursor: 'pointer' }}
      rev={isPostLiked ? 'true' : 'false'}
      className={styles.btn}
    >
      <LikeOutlined className={` ${isVisible ? styles.like_animate : ''}`} />
      <span>{userLikes ? userLikes.length : 0}</span>
    </Space>
  );
};
