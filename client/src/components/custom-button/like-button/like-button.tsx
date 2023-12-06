import {LikeFilled, LikeOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import {useToggleLikeMutation} from '../../../api/likes';
import {useGetPostQuery} from "../../../api/posts";
import CountUp from 'react-countup';

import styles from './like-button.module.scss';
import {useEffect} from "react";
import {useAppSelector} from "../../../hooks/hooks";


type Props = {
  post: any
}

export const LikeButton = ({post}: Props) => {
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
    <Space
      key="like"
      onClick={() => handleAddLike()}
      style={{cursor: 'pointer'}}
      className={styles['btn'] + " " + (userHasLiked ? styles['btn-active'] : '')}
    >
      {isLoading ? '' : <>
        {userHasLiked ? <LikeFilled/> : <LikeOutlined/>}
        <span>{updatedPost.likes ? updatedPost.likes.length : 0}</span>
        {/*<CountUp end={updatedPost.likes ? updatedPost.likes.length : 0} separator="," />*/}
      </>}
    </Space>
  );
};
