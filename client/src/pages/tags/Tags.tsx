import React, {useEffect, useMemo} from "react";
import {Alert, Col, Flex, Grid, List, Row, Spin} from "antd";

import {Layout} from "../../components/layout/layout";

import styles from "./Tags.module.scss";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {Link} from "react-router-dom";
import {useGetAllTagsQuery} from "../../api/tags";
import TagItem from "../../components/tag-item/tag-item";
import {LoadingOutlined} from "@ant-design/icons";


export const Tags = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { data: tags, error, isLoading } = useGetAllTagsQuery();
  
  const memoizedList = useMemo(() => {
    if (isLoading) {
      return <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />;
    }
    if (error) {
      return <Alert message="Error loading tags" type="error" />;
    }
    
    return (
      <List
        grid={{ gutter: 12, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
        dataSource={tags}
        renderItem={({ id, ...tag }) => <TagItem key={id} tag={tag} />}
        locale={{ emptyText: "Пусто" }}
      />
    );
  }, [tags, isLoading, error]);
  
  return (
    <Layout>
      <Flex className={styles.main} gap={12} vertical>
        <CustomBreadcrumb />
        {memoizedList}
      </Flex>
    </Layout>
  );

};
