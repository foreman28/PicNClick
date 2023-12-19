import {useEffect} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";
import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {CustomTitle} from "../../components/custom-title/custom-title";

import {useGetAllPostsQuery} from "../../api/posts";

import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import PostItem from "../../components/post-item/post-item";

import styles from "./UserPosts.module.scss";
import {FeedPosts} from "../../components/feed-posts/feed-posts";

// const {Title, Text} = Typography;

export const UserPosts = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const user = useSelector(selectUser)
  
  
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
        <CustomTitle title={"Ваши посты"} level={1}/>
        
        {
          user ? (
            <FeedPosts authorId={user.id}/>
          ) : undefined
        }
      
      </Flex>
    </Layout>
  );
};
