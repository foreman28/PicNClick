import {Flex, Layout} from "antd";
import {useLocation, useNavigate,} from "react-router-dom";

import {Paths} from "../../../paths";

import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../../features/auth/authSlice";
import {useGetUserQuery} from "../../../api/auth";

import styles from "./profile-sidebar.module.scss";

export const ProfileSidebar = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const pathSnippets1 = location.pathname.split('/').filter((i) => i);
  let username: string = '';
  if (pathSnippets1[0] == Paths.profile) {
    username = pathSnippets1[1];
  }

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (username === '' && user) {
    username = user.username
  } else {
    navigate(Paths.login)
  }

  const {data: getUser, isLoading} = useGetUserQuery({username: username});

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
          <img className={styles.avatar} srcSet={`${process.env.REACT_APP_URL}${getUser?.avatarURL}`} alt={`${getUser?.username}`}/>
          <span>{getUser?.username}</span>
          <span>{getUser?.fullName}</span>
          <span>{getUser?.email}</span>
        </Flex>
      </Flex>
    </Layout.Sider>
  );
};
