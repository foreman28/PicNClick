import {Button, ConfigProvider, Flex, Layout} from "antd";

import styles from "./footer.module.css";
export const Footer = () => {


  return (
    <Layout.Footer className={styles.footer} style={{height: 'auto'}}>
      <Layout className={styles.footer_container}>
        <Flex vertical>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
        </Flex>
      </Layout>

    </Layout.Footer>
  );
};
