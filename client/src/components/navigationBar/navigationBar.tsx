import {Flex, Layout, Menu, MenuProps, theme} from "antd";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
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
import React, {useState} from "react";

export const NavigationBar = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }
  
  const user = useSelector(selectUser);
  
  const navigate = useNavigate()
  
  type MenuItem = Required<MenuProps>['items'][number];
    
    function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  
  const items: MenuItem[] = [
    getItem('Поиск', Paths.search, <SearchOutlined />),
    getItem('Форум', Paths.forum, <UnorderedListOutlined />),
    getItem('Теги', Paths.tags, <TagOutlined />),
    getItem('Пользователи', Paths.users, <UserOutlined />),
  ];
  
  if (user) {
    items.push(
      getItem('Профиль', 'personal', <UserOutlined />, [
        getItem('Профиль', Paths.profile, <ProfileOutlined />),
        getItem('Ваши посты', Paths.userPosts, <UnorderedListOutlined />),
        getItem('Добавить пост', Paths.addPost, <EditOutlined />),
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
