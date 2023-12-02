import {Flex} from 'antd';
import {Layout} from '../../components/layout/layout';
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {FeedPosts} from "../../components/feed-posts/feed-posts";

import {useEffect} from "react";

// import styles from './Forum.module.scss';

export const Forum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const { data: allPosts, isLoading:allIsLoading, isError:allIsError } = useGetAllPostsQuery({});
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
        <FeedPosts />
      </Flex>
    </Layout>
  );
};
