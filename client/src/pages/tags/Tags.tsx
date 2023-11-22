import React, {useEffect} from "react";
import {Flex} from "antd";

import {Layout} from "../../components/layout/layout";

import styles from "./Tags.module.scss";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";


export const Tags = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Flex className={styles.main} gap={12} vertical>
        <CustomBreadcrumb />
        {/*<Title level={1}>Теги</Title>*/}

      </Flex>
    </Layout>
  );
};
