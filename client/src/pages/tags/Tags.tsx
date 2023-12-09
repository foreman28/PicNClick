import {useEffect} from "react";
import {Flex} from "antd";

import {Layout} from "../../components/layout/layout";

import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {useGetAllTagsQuery} from "../../api/tags";
import TagItem from "../../components/tag-item/tag-item";

import styles from "./Tags.module.scss";

export const Tags = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const {data: tags}: any = useGetAllTagsQuery();
  
  const memoizedList = (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px'}}>
      {tags && tags.map(({id, ...tag}: any) => (
        <TagItem key={id} tag={tag}/>
      ))}
    </div>
  )
  
  return (
    <Layout>
      <Flex className={styles.main} gap={12} vertical>
        <CustomBreadcrumb/>
        {memoizedList}
      </Flex>
    </Layout>
  );
};
