import {LikeOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import {useGetLikesByUserQuery, useToggleLikeMutation} from '../../../api/likes';
import {useGetPostQuery} from "../../../api/posts";

import styles from './like-button.module.scss';


type Props = {
  post: any
}

export const LikeButton = ({post}: Props) => {
  const [addLikeMutation] = useToggleLikeMutation();
  const {data: updatedPost, isLoading, refetch}: any = useGetPostQuery(post.url);
  
  const userHasLiked = updatedPost && updatedPost.likes ? updatedPost.likes.some((like: any) => like.userId === 2) : false;
  
  const handleAddLike = async () => {
    try {
      console.log(userHasLiked)
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
        <LikeOutlined/>
        <span>{updatedPost.likes ? updatedPost.likes.length : 0}</span>
      </>}
    </Space>
  );
};
