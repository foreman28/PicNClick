import {Button, Flex, Layout, List, Space} from "antd";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../features/auth/authSlice";

import styles from "./sidebar2.module.scss";
import Search from "antd/es/input/Search";

import {CompassOutlined, LinkOutlined, StarOutlined, TagOutlined, UnorderedListOutlined} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
export const Sidebar2 = () => {

  const currentPath  = window.location.pathname;

  // const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <Layout.Sider className={styles.sidebar} width={270}>
      <Flex className={styles.sidebar_container} gap={"middle"} vertical>

        <Flex gap={"small"} vertical>
          <Flex gap={"small"} align={"center"}>
            <StarOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={styles.sidebar_title}>Стоит прочитать</span>
          </Flex>
          <List
            size="small"
            dataSource={data}
            className={styles.sidebar_list}
            renderItem={(item) => <List.Item><Link to={'/'} className={styles.sidebar_link}>{item}</Link></List.Item>}
          />
        </Flex>

        <Flex gap={"small"} vertical>
          <Flex gap={"small"} align={"center"}>
            <LinkOutlined style={{fontSize: '18px'}} rev="true"/>
            <span className={styles.sidebar_title}>Рекомендуемые ссылки</span>
          </Flex>
          <List
            size="small"
            dataSource={data}
            className={styles.sidebar_list}
            renderItem={(item) => <List.Item><Link to={'/'} className={styles.sidebar_link}>{item}</Link></List.Item>}
          />
        </Flex>

      </Flex>
    </Layout.Sider>
  );
};
