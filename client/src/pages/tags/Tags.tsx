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
  
  const { data: tags, error, isLoading }:any = useGetAllTagsQuery();
  
  const memoizedList = useMemo(() => {
    if (isLoading) {
      return <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />;
    }
    if (error) {
      return <Alert message="Ошибка загрузки тегов" type="error" />;
    }
    
    return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
      {tags && tags.map(({ id, ...tag }:any) => (
        <TagItem key={id} tag={tag} />
      ))}
    </div>
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
