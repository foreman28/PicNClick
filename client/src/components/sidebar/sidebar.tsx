import {Flex, Layout} from "antd";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectUser} from "../../features/auth/authSlice";

import {EditOutlined, SearchOutlined, TagOutlined, UnorderedListOutlined, UserOutlined} from '@ant-design/icons';

import style from "./sidebar.module.scss";
import React from "react";
import {Paths} from "../../paths";

export const Sidebar = () => {

  const currentPath = window.location.pathname;

  const user = useSelector(selectUser);

  return (
    <Layout.Sider className={style.sidebar} width={310}>
      <Flex style={{position: 'sticky', top:'70px'}} className={style.sidebar_container} gap={"large"} vertical>

        <Flex gap={"small"} vertical>
          <span className={style.sidebar_title}>меню</span>
          <Link to={Paths.search} className={style.sidebar_link + ' ' + (currentPath == Paths.search ? style.active : '')}>
            <SearchOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Поиск</span>
          </Link>

          <Link to={Paths.forum} className={style.sidebar_link + ' ' + (currentPath == Paths.forum ? style.active : '')}>
            <UnorderedListOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Форумы</span>
          </Link>

          <Link to={Paths.tags} className={style.sidebar_link + ' ' + (currentPath == Paths.tags ? style.active : '')}>
            <TagOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Теги</span>
          </Link>

          <Link to={Paths.users} className={style.sidebar_link + ' ' + (currentPath == Paths.users ? style.active : '')}>
            <UserOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Пользователи</span>
          </Link>

        </Flex>

        <Flex gap={"small"} vertical>
          <span className={style.sidebar_title}>ПЕРСОНАЛЬНЫЙ НАВИГАТОР</span>

          {
            user ?
              <>
                <Link to={'/'} className={style.sidebar_link + ' ' + (currentPath == '/add_post' ? style.active : '')}>
                  <EditOutlined style={{fontSize: '18px'}} rev="true"/>
                  <span className={style.sidebar_item}>Добавить</span>
                </Link>

              </>
              :
              ''
          }
        </Flex>


      </Flex>
    </Layout.Sider>
  );
};
