import React, {useEffect} from 'react';
import {Flex} from "antd";

import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {useLocation} from "react-router-dom";
import {useGetUserQuery} from "../../api/auth";
import {Paths} from "../../paths";
import {ProfileLayout} from "../../components/layout/profile-layout/profile-layout";

import styles from "./Profile.module.scss";
import {useAppSelector} from "../../hooks/hooks";
import {selectUser} from "../../features/auth/authSlice";
import {CustomTitle} from "../../components/custom-title/custom-title";
import TagItem from "../../components/tag-item/tag-item";
import CardItem from "../../components/card-item/card-item";
import {CommentOutlined, FileTextFilled, FileTextOutlined, LikeFilled, MessageFilled} from "@ant-design/icons";

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
  
  return (
    <ProfileLayout>
      <Flex gap={12} vertical style={{height: "100%"}}>
        <CustomBreadcrumb/>

        <CustomTitle title={"Профиль"} level={1}/>
        
        <Flex className={styles.profile} gap={12}>
          
          {!user || isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <CardItem color={"var(--color-accent-200)"}  count={user.likes?.length} icon={<LikeFilled/>}/>
              <CardItem color={"var(--color-primary-200)"} count={user.comments?.length} icon={<MessageFilled />}/>
              <CardItem color={"var(--color-success-200)"} count={user.posts?.length} icon={<FileTextFilled />}/>
            </>
          )}
        </Flex>
      </Flex>
    </ProfileLayout>
  );
};
