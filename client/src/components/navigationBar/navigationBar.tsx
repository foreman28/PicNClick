import {Flex, Layout} from "antd";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectUser} from "../../features/auth/authSlice";

import {
  EditOutlined,
  ProfileOutlined,
  SearchOutlined,
  TagOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';

import {Paths} from "../../paths";

import styles from "./navigationBar.module.scss";
import React from "react";

export const NavigationBar = () => {

  const currentPath = window.location.pathname;

  const user = useSelector(selectUser);

  return ( // width={"max(310px, calc(100vw - (var(--white-container) + var(--white-navigationBar))))"}
    <Layout.Sider className={styles.sidebar} width={"var(--white-navigationBar)"}>
      <Flex style={{position: 'sticky', top:'70px'}} className={styles.sidebar_container} gap={"large"} vertical>

        <Flex gap={"small"} vertical>
          <span className={styles.sidebar_title}>меню</span>
          <Link to={Paths.search} className={styles.sidebar_link + ' ' + (currentPath === Paths.search ? styles.active : '')}>
            <SearchOutlined style={{fontSize: '18px'}} />
            <span className={styles.sidebar_item}>Поиск</span>
          </Link>

          <Link to={`${Paths.forum}`} className={styles.sidebar_link + ' ' + (currentPath === Paths.forum ? styles.active : '')}>
            <UnorderedListOutlined style={{fontSize: '18px'}} />
            <span className={styles.sidebar_item}>Форум</span>
          </Link>

          <Link to={Paths.tags} className={styles.sidebar_link + ' ' + (currentPath === Paths.tags ? styles.active : '')}>
            <TagOutlined style={{fontSize: '18px'}} />
            <span className={styles.sidebar_item}>Теги</span>
          </Link>

          <Link to={Paths.users} className={styles.sidebar_link + ' ' + (currentPath === Paths.users ? styles.active : '')}>
            <UserOutlined style={{fontSize: '18px'}} />
            <span className={styles.sidebar_item}>Пользователи</span>
          </Link>

        </Flex>

        <Flex gap={"small"} vertical>
          <span className={styles.sidebar_title}>ПЕРСОНАЛЬНЫЙ НАВИГАТОР</span>

          {
            user ?
              <>
                <Link to={Paths.profile} className={styles.sidebar_link + ' ' + (currentPath === Paths.profile ? styles.active : '')}>
                  <ProfileOutlined style={{fontSize: '18px'}} />
                  <span className={styles.sidebar_item}>Профиль</span>
                </Link>

                <Link to={Paths.addPost} className={styles.sidebar_link + ' ' + (currentPath === Paths.addPost ? styles.active : '')}>
                  <EditOutlined style={{fontSize: '18px'}} />
                  <span className={styles.sidebar_item}>Добавить</span>
                </Link>
              </>
              :
              ''
          }
        </Flex>
      </Flex>
    </Layout.Sider>
  );
}
