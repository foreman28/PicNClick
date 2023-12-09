import {Flex, Layout} from "antd";
import {useLocation, useNavigate,} from "react-router-dom";

import {Paths} from "../../../paths";

import {selectUser} from "../../../features/auth/authSlice";
import {useGetUserQuery} from "../../../api/auth";

import styles from "./profile-sidebar.module.scss";
import {CustomAvatar} from "../../avatar/avatar";

export const ProfileSidebar = () => {

  const location = useLocation()
  const navigate = useNavigate()
  
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const username = pathSnippets[1] || undefined;
  
  // const { data, isLoading } = useGetUserQuery({ username });
  const { data, isLoading } = useGetUserQuery(username);

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
          {data && (
            <>
              <img
                className={styles.avatar} srcSet={`${process.env.REACT_APP_URL}${data.avatarURL}`} alt={data.username} />
              
              {/*<CustomAvatar post={post} />*/}
              <span>{data.username}</span>
              <span>{data.fullName}</span>
              <span>{data.email}</span>
            </>
          )}
        </Flex>
      </Flex>
    </Layout.Sider>
  );
};
