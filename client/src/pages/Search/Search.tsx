import { Flex } from "antd";
import { Layout } from "../../components/layout/layout";
import { useEffect } from "react";
import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {FeedPosts} from "../../components/feed-posts/feed-posts";

import styles from "./Search.module.scss";

export const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout>
      <Flex className={styles.main} vertical gap={"12px"}>
        <CustomBreadcrumb />
        
        <FeedPosts />
      </Flex>
    </Layout>
  );
};
