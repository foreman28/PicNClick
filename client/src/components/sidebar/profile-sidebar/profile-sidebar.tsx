import {Flex, Layout} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

import {Paths} from "../../../paths";

import {selectUser} from "../../../features/auth/authSlice";
import {useGetUserQuery} from "../../../api/auth";

import styles from "./profile-sidebar.module.scss";
import {CustomAvatar} from "../../avatar/avatar";
import {useAppSelector} from "../../../hooks/hooks";

export const ProfileSidebar = () => {

  const location = useLocation()
  
  const userS = useAppSelector(selectUser);
  
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const username = pathSnippets[1] || userS?.username;
  
  const { data:user, isLoading } = useGetUserQuery(username);

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
          {user && (
            <>
              <CustomAvatar user={user} width={258} height={258} />
              <span>{user.username}</span>
              <span>{user.fullName}</span>
              <span>{user.email}</span>
            </>
          )}
        </Flex>
      </Flex>
    </Layout.Sider>
  );
};
