import React, {useEffect} from "react";
import {Flex, List} from "antd";

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
        {/*<Title level={1}>Теги</Title>*/}
        <List
          itemLayout="vertical"
          size="large"
          dataSource={tags}
          renderItem={(tag) => <TagItem key={tag.id} tag={tag} />}
        />
      </Flex>
    </Layout>
  );
};
