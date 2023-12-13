import {useEffect} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";
import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {CustomTitle} from "../../components/custom-title/custom-title";

import {useGetAllPostsQuery} from "../../api/posts";

import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import PostItem from "../../components/feed-posts/post-item/post-item";

import styles from "./YourPosts.module.scss";

// const {Title, Text} = Typography;

export const YourPosts = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const user = useSelector(selectUser)

  const {data: posts, isLoading} = useGetAllPostsQuery({
    filters: {
      where: {
        authorId: user?.id || 0,
      },
    }
  });

  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>

        <CustomTitle title={"Ваши посты"} level={1}/>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/*{posts && posts.map(({id, ...post}: any) => (*/}
            {/*  <PostItem key={id} post={post}/>*/}
            {/*))}*/}
            <List
              itemLayout="vertical"
              size="large"
              dataSource={posts}
              renderItem={(item) => <PostItem key={item.id} post={item}/>}
              locale={{emptyText: 'Пусто'}}
            />
          </>
        )}
      </Flex>
    </Layout>
  );
};
