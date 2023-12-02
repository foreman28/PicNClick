import {LikeOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import {useToggleLikeMutation} from '../../../api/likes';
import {useGetPostQuery} from "../../../api/posts";

import styles from './like-button.module.scss';


type Props = {
  post: any
}

export const LikeButton = ({post}: Props) => {
  const [addLikeMutation] = useToggleLikeMutation();
  const {data: updatedPost, isLoading, refetch}: any = useGetPostQuery(post.url);
  
  const handleAddLike = async () => {
    try {
      console.log(updatedPost)
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
      className={styles.btn}
    >
      <LikeOutlined/>
      {!isLoading ?
        <span>{updatedPost.likes ? updatedPost.likes.length : 0}</span>
        :
        ''
      }
    </Space>
  );
};
