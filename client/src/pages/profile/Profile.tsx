import React, {useEffect} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";

import styles from "./Profile.module.scss";
// import FeedPosts from "../../components/post-item/post-item";
// import {useDispatch, useSelector} from "react-redux";
// import {useGetAllPostsQuery} from "../../api/posts";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

export const Profile = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        {/*<Title level={1}>Пользователи</Title>*/}

        {/*{isLoading ? (*/}
        {/*  <p>Loading...</p>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    1*/}
        {/*  </>*/}
        {/*)}*/}
      </Flex>
    </Layout>
  );
};
