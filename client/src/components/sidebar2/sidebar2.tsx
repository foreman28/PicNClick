import {Flex, Layout, List} from "antd";
import {Link} from "react-router-dom";

import {LinkOutlined, StarOutlined} from '@ant-design/icons';

import styles from "./sidebar2.module.scss";
import {useGetAllPostsQuery} from "../../api/posts";
import {LikeButton} from "../custom-button/like-button/like-button";
import {Paths} from "../../paths";
import {CommentButton} from "../custom-button/comment-button/comment-button";

export const Sidebar2 = () => {
  
  // const currentPath  = window.location.pathname;
  
  // const user = useSelector(selectUser);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const onLogoutClick = () => {
  //   dispatch(logout());
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };
  
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const {data: likesPosts} = useGetAllPostsQuery({
    filters: {
      sort: 'likes',
      order: 'desc'
    }
  });

  const {data: commentsPosts} = useGetAllPostsQuery({
    filters: {
      sort: 'comments',
      order: 'desc'
    }
  });
  
  return (
    <Layout.Sider className={styles.sidebar} width={"var(--white-sidebar)"}>
      <Flex style={{
        position: 'sticky',
        top: '82px'
      }} className={styles.sidebar_container} gap={"middle"} vertical>
        
        <Flex gap={"small"} vertical>
          <Flex gap={"small"} align={"center"}>
            <StarOutlined style={{fontSize: '18px'}}/>
            <span className={styles.sidebar_title}>Стоит прочитать</span>
          </Flex>
          <List
            size="small"
            dataSource={likesPosts?.slice(0, 6)}
            className={styles.sidebar_list}
            renderItem={(item) =>
              <List.Item className={styles.sidebar_item}>
                <Flex justify={"space-between"} style={{width: '100%'}}>
                  <Link to={`${Paths.forum}/${item.url}`} className={styles.sidebar_link}>
                    <span>{item.title}</span>
                  </Link>
                  <Flex gap={16}>
                    <LikeButton post={item}/>
                    <CommentButton post={item}/>
                  </Flex>
                </Flex>
              </List.Item>
            }
            locale={{emptyText: 'Пусто'}}
          />
        </Flex>
        
        <Flex gap={"small"} vertical>
          <Flex gap={"small"} align={"center"}>
            <LinkOutlined style={{fontSize: '18px'}}/>
            <span className={styles.sidebar_title}>Рекомендуемые ссылки</span>
          </Flex>
          <List
            size="small"
            dataSource={commentsPosts?.slice(0, 6)}
            className={styles.sidebar_list}
            renderItem={(item) =>
              <List.Item className={styles.sidebar_item}>
                <Flex justify={"space-between"} style={{width: '100%'}}>
                  <Link to={`${Paths.forum}/${item.url}`} className={styles.sidebar_link}>
                    <span>{item.title}</span>
                  </Link>
                  <Flex gap={16}>
                    <LikeButton post={item}/>
                    <CommentButton post={item}/>
                  </Flex>
                </Flex>
              </List.Item>
            }
            locale={{emptyText: 'Пусто'}}
          />
        </Flex>
      
      </Flex>
    </Layout.Sider>
  );
};
