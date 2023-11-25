import {Flex} from 'antd';
import {Layout} from '../../components/layout/layout';
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {FeedPosts} from "../../components/feed-posts/feed-posts";

import styles from './Forum.module.scss';
import React, {useEffect} from "react";

export const Forum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
        <FeedPosts />
      </Flex>
    </Layout>
  );
};
