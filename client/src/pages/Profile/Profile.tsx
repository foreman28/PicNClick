import React, {useEffect, useState} from 'react';
import {Flex} from "antd";

import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {useLocation} from "react-router-dom";
import {useGetUserQuery} from "../../api/auth";
import {ProfileLayout} from "../../components/layout/profile-layout/profile-layout";

import {useAppSelector} from "../../hooks/hooks";
import {selectUser} from "../../features/auth/authSlice";
import {CustomTitle} from "../../components/custom-title/custom-title";
import CardItem from "../../components/card-item/card-item";
import {FileTextFilled, FileTextOutlined, LikeFilled, MessageFilled, MessageOutlined} from "@ant-design/icons";

import styles from "./Profile.module.scss";
import {useGetAllPostsQuery, useGetPostQuery} from "../../api/posts";
import {ForumPostWithAuthorAndComments, UserAll} from "../../types";

// const {Title, Text} = Typography

export const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation()

  const userS = useAppSelector(selectUser);

  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const username = pathSnippets[1] || userS?.username;

  const {data: user, isLoading} = useGetUserQuery(username);
  const {data: dataPosts, isLoading:isLoadingPosts}= useGetAllPostsQuery({
    filters: {
      where: {
        authorId: 1
      }
    }
  });

  const [sumLikes, setSumLikes] = useState(0)
  const [sumComments, setSumComments] = useState(0)
  useEffect(() => {
    dataPosts && dataPosts.posts && dataPosts.posts.map((post:any)=>{
      setSumLikes(prev => prev + +post?.likes?.length)
      setSumComments(prev => prev + +post?.comments?.length)
    })
  }, [dataPosts]);

  return (
    <ProfileLayout>
      <Flex
        gap={12}
        vertical
        // style={{height: "100%"}}
      >
        <CustomBreadcrumb/>

        <CustomTitle title={`Профиль: ${user && user.username}`} level={1}/>

        <Flex className={styles.profile} gap={12} wrap={"wrap"}>

          {!user || isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <CardItem
                title={"Количество поставленных лайков"}
                count={user.likes?.length}
                color={"var(--color-accent-200)"}
                icon={<LikeFilled/>}
              />
              <CardItem
                title={"Количество написанных сообщений"}
                count={user.comments?.length}
                color={"var(--color-primary-200)"}
                icon={<MessageFilled/>}
              />
              <CardItem
                title={"Количество созданных тем"}
                count={user.posts?.length}
                color={"var(--color-success-200)"}
                icon={<FileTextFilled/>}
              />
              <CardItem
                title={"Количество лайков в ваших постах"}
                count={sumLikes}
                color={"var(--color-secondary-200)"}
                icon={<FileTextOutlined/>}
              />
              <CardItem
                title={"Количество сообщений в ваших постах"}
                count={sumComments}
                color={"var(--color-error-200)"}
                icon={<MessageOutlined/>}
              />
            </>
          )}
        </Flex>
      </Flex>
    </ProfileLayout>
  );
};
