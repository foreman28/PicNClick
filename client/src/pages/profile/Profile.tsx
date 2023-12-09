import {useEffect} from 'react';
import {Flex, Typography} from "antd";

import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {useLocation} from "react-router-dom";
import {useGetUserQuery} from "../../api/auth";
import {Paths} from "../../paths";
import {ProfileLayout} from "../../components/layout/profile-layout/profile-layout";

import styles from "./Profile.module.scss";
import {useAppSelector} from "../../hooks/hooks";
import {selectUser} from "../../features/auth/authSlice";

const {Title, Text} = Typography

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
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        <Flex className={styles.profile} vertical>
          
          <Title level={4}>Профиль</Title>
          
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <span>{user && user.username}</span>
            </>
          )}
        </Flex>
      </Flex>
    </ProfileLayout>
  );
};
