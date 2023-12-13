import {MessageFilled, MessageOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import {useGetPostQuery} from "../../../api/posts";
import CountUp from 'react-countup';

import styles from './comment-button.module.scss';
import {useAppSelector} from "../../../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../../paths";
import React from "react";


type Props = {
  post: any
}

export const CommentButton =  React.memo(({post}: Props) => {
  const {data: updatedPost, isLoading}: any = useGetPostQuery(post.url);

  const currentUserId = useAppSelector((state) => state.auth.user && state.auth.user.id);

  const userHasLiked = updatedPost && updatedPost.comments ? updatedPost.comments.some((like: any) => like.userId === currentUserId) : false;


  const navigate = useNavigate()
  const handleAddLike = async () => {
    try {
      navigate(`${Paths.forum}/${post.url}`)
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  return (
    <a href={"#comments"} className={styles.link}>
      <Space
        onClick={() => handleAddLike()}
        style={{cursor: 'pointer'}}
        className={styles['btn'] + " " + (userHasLiked ? styles['btn-active'] : '')}
      >
        {isLoading ? '' : <>
          {userHasLiked ? <MessageFilled/> : <MessageOutlined/>}
          <span>{updatedPost?.comments ? updatedPost?.comments?.length : 0}</span>
          {/*<CountUp end={updatedPost.likes ? updatedPost.likes.length : 0} separator="," />*/}
        </>}
      </Space>
    </a>
  );
})