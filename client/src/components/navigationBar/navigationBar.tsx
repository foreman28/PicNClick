import {Layout, Menu, MenuProps, theme} from "antd";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../features/auth/authSlice";

import {
  EditOutlined,
  ProfileOutlined,
  SearchOutlined,
  TagOutlined, TeamOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';

import {Paths} from "../../paths";

import styles from "./navigationBar.module.scss";
import React, {useEffect, useState} from "react";

export const NavigationBar = () => {
  
  const currentPath = window.location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  
  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }
  
  const checkWindowWidth = () => {
    const screenWidth = window.innerWidth;
    const shouldCollapse = screenWidth <= 1440;
    
    if (shouldCollapse !== collapsed) {
      setCollapsed(shouldCollapse);
    }
  };
  
  useEffect(() => {
    checkWindowWidth();
    window.addEventListener('resize', checkWindowWidth);
    
    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    };
  }, [collapsed]);
  
  const user = useSelector(selectUser);
  
  const navigate = useNavigate()
  
  type MenuItem = Required<MenuProps>['items'][number];
  
  function getItem(
    label: React.ReactNode,
    to: string,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      className: styles.sidebar_link + " " + (currentPath === to ? styles.active : '')
    } as MenuItem;
  }
  
  const items: MenuItem[] = [
    getItem('Поиск', Paths.search, Paths.search, <SearchOutlined/>),
    getItem('Форум', Paths.forum, Paths.forum, <UnorderedListOutlined/>),
    getItem('Теги', Paths.tags, Paths.tags, <TagOutlined/>),
    getItem('Пользователи', Paths.users, Paths.users, <TeamOutlined />),
  ];
  
  if (user) {
    items.push(
      getItem('Профиль', 'personal', 'personal', <UserOutlined/>, [
        getItem('Профиль', Paths.profile, Paths.profile, <ProfileOutlined/>),
        getItem('Ваши рубрики', Paths.userPosts, Paths.userPosts, <UnorderedListOutlined/>),
        getItem('Добавить рубрику', Paths.addPost, Paths.addPost, <EditOutlined/>),
      ]),
    );
  }
  
  const onClick = (e: MenuItem) => {
    if (e) navigate(`${e.key}`)
  }
  
  
  return ( // width={"max(310px, calc(100vw - (var(--white-container) + var(--white-navigationBar))))"}
    <Layout.Sider
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
      width={"var(--white-navigationBar)"}
      
      // collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        // style={{position: 'sticky', top:'70px'}}
        onClick={onClick}
        mode="inline"
        className={styles.sidebar_container}
        items={items}
      />
      {/* TODO */}
      {/*<div className={styles.toggleButton} onClick={toggleCollapsed}>*/}
      {/*  {collapsed ? ">" : "<"}*/}
      {/*</div>*/}
    
    </Layout.Sider>
  );
}
