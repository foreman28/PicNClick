import {useEffect} from 'react';
import {Flex, Typography} from "antd";

import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {selectUser} from "../../features/auth/authSlice";
import {useGetUserQuery} from "../../api/auth";
import {Paths} from "../../paths";
import {ProfileLayout} from "../../components/layout/profile-layout/profile-layout";

import styles from "./Profile.module.scss";

const {Title, Text} = Typography

export const Profile = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const user = useAppSelector(selectUser);
  const location = useLocation()
  const navigate = useNavigate()
  const pathSnippets1 = location.pathname.split('/').filter((i) => i);

  let username: string = '';

  if (pathSnippets1[1] == undefined && user) {
    username = user.username;
  } else {
    username = pathSnippets1[1]
  }

  const {data, isLoading} = useGetUserQuery({username: username});

  return (
    <ProfileLayout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        <Title level={4}>Профиль</Title>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <span>{data && data.username}</span>
          </>
        )}
      </Flex>
    </ProfileLayout>
  );
};
