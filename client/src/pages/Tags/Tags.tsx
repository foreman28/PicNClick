import {useEffect} from "react";
import {Flex} from "antd";

import {Layout} from "../../components/layout/layout";

import {useGetAllTagsQuery} from "../../api/tags";

import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import TagItem from "../../components/tag-item/tag-item";
import {CustomTitle} from "../../components/custom-title/custom-title";

import styles from "./Tags.module.scss";

// const {Title, Text} = Typography;

export const Tags = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const {data: tags, isLoading} = useGetAllTagsQuery();
  
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
        <CustomTitle title={"Теги"} level={1}/>
        
        {isLoading ?
          <></>
          :
          <div className={styles.grid}>
            {tags && tags.map(({id, ...tag}: any) => (
              <TagItem key={id} tag={tag}/>
            ))}
          </div>
        }
      
      </Flex>
    </Layout>
  );
};
