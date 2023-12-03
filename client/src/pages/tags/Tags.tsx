import React, {useEffect} from "react";
import {Col, Flex, Grid, List, Row} from "antd";

import {Layout} from "../../components/layout/layout";

import styles from "./Tags.module.scss";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {Link} from "react-router-dom";
import {useGetAllTagsQuery} from "../../api/tags";
import TagItem from "../../components/tag-item/tag-item";


export const Tags = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { data: tags, error, isLoading } = useGetAllTagsQuery();

  return (
    <Layout>
      <Flex className={styles.main} gap={12} vertical>
        <CustomBreadcrumb/>
          <List
            grid={{ gutter: 12, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
            dataSource={tags}
            renderItem={(tag) => (
              <TagItem key={tag.id} tag={tag}/>
            )}
            locale={{emptyText: 'Пусто'}}
          />
      </Flex>
    </Layout>
  );
};
