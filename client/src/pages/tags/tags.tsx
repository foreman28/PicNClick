import {Flex, Space} from "antd";

import {Layout} from "../../components/layout/layout";

import styles from "./tags.module.scss";
import {CustomButton} from "../../components/custom-button/button";
import {button, button2} from "../../themes/buttons";
import TagsFeed from "../../components/tags-feed/tags-feed";

export const Tags = () => {

  return (
    <Layout>
      <Flex className={styles.main} vertical gap={"12px"}>

        <TagsFeed/>
      </Flex>
    </Layout>
  );
};
