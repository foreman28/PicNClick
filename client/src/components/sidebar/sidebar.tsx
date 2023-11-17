import {Flex, Layout} from "antd";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectUser} from "../../features/auth/authSlice";

import {EditOutlined, SearchOutlined, TagOutlined, UnorderedListOutlined} from '@ant-design/icons';

import style from "./sidebar.module.scss";
import React from "react";

export const Sidebar = () => {

  const currentPath = window.location.pathname;

  const user = useSelector(selectUser);



  return (
    <Layout.Sider className={style.sidebar} width={310}>
      <Flex className={style.sidebar_container} gap={"large"} vertical>

        <Flex gap={"small"} vertical>
          <span className={style.sidebar_title}>меню</span>
          <Link to={'/Search'} className={style.sidebar_link + ' ' + (currentPath == '/Search' ? style.active : '')}>
            <SearchOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Поиск</span>
          </Link>

          <Link to={'/Forum'} className={style.sidebar_link + ' ' + (currentPath == '/Forum' ? style.active : '')}>
            <UnorderedListOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Форумы</span>
          </Link>

          <Link to={'/Tags'} className={style.sidebar_link + ' ' + (currentPath == '/Tags' ? style.active : '')}>
            <TagOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Теги</span>
          </Link>

        </Flex>

        <Flex gap={"small"} vertical>
          <span className={style.sidebar_title}>меню</span>

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
