import {Flex, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout, selectUser} from "../../features/auth/authSlice";

import Search from "antd/es/input/Search";
import {CompassOutlined, SearchOutlined, TagOutlined, UnorderedListOutlined} from '@ant-design/icons';

import style from "./sidebar.module.scss";

export const Sidebar = () => {

  const currentPath = window.location.pathname;

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Sider className={style.sidebar} width={310}>
      <Flex className={style.sidebar_container} gap={"large"} vertical>
        {/*<Search className={style.sidebar_search}/>*/}

        <Flex gap={"small"} vertical>
          <span className={style.sidebar_title}>меню</span>
          <Link to={'/search'} className={style.sidebar_link + ' ' + (currentPath == '/search' ? style.active : '')}>
            <SearchOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Поиск</span>
          </Link>

          <Link to={'/forum'} className={style.sidebar_link + ' ' + (currentPath == '/forum' ? style.active : '')}>
            <UnorderedListOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Форумы</span>
          </Link>

          <Link to={'/tags'} className={style.sidebar_link + ' ' + (currentPath == '/tags' ? style.active : '')}>
            <TagOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={style.sidebar_item}>Теги</span>
          </Link>

        </Flex>

        <Flex gap={"small"} vertical>
          <span className={style.sidebar_title}>меню</span>

          {
            user ?
              <Link to={'/'} className={style.sidebar_link + ' ' + (currentPath == '/tags' ? style.active : '')}
                    onClick={onLogoutClick}>
                <TagOutlined style={{fontSize: '18px'}} rev="true"/>
                <span className={style.sidebar_item}>Выход</span>
              </Link>
              :
              ''
          }

        </Flex>


      </Flex>
    </Layout.Sider>
  );
};
