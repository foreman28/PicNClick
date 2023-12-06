import {Flex, Layout} from "antd";
import {useLocation, useNavigate,} from "react-router-dom";

import {Paths} from "../../../paths";

import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {selectUser} from "../../../features/auth/authSlice";
import {useGetUserQuery} from "../../../api/auth";

import styles from "./profile-sidebar.module.scss";

export const ProfileSidebar = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const pathSnippets1 = location.pathname.split('/').filter((i) => i);
  let username: string = '';

  const user = useAppSelector(selectUser);

  if (pathSnippets1[1] == undefined && user) {
    username = user.username;
  } else {
    username = pathSnippets1[1]
  }

  const {data, isLoading} = useGetUserQuery({username: username});

  return (
    <Layout.Sider className={styles.sidebar} width={"var(--white-navigationBar)"}>
      <Flex
        style={{position: 'sticky', top: '82px'}}
        className={styles.sidebar_container}
        gap={"middle"}
        vertical
      >
        <Flex gap={"small"} vertical>
          <Flex gap={"small"} align={"center"}>
            {/*<StarOutlined style={{fontSize: '18px'}}/>*/}
            {/*<span className={styles.sidebar_title}>Информация</span>*/}
          </Flex>
          <img className={styles.avatar} srcSet={`${process.env.REACT_APP_URL}${data?.avatarURL}`} alt={`${data?.username}`}/>
          <span>{data?.username}</span>
          <span>{data?.fullName}</span>
          <span>{data?.email}</span>
        </Flex>
      </Flex>
    </Layout.Sider>
  );
};
