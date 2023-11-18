import {Flex, Layout as AntLayout} from "antd";

import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {Sidebar} from "../sidebar/sidebar";
import {Sidebar2} from "../sidebar2/sidebar2";

import styles from "./layout.module.css";

export const Layout = ({children}: any) => {
  return (
    <>
      <Header/>
      <Flex justify={"space-between"} style={{height: '100%'}}>
        <Sidebar/>

        <AntLayout.Content className={styles.main}>
          {children}
        </AntLayout.Content>

        <Sidebar2/>
      </Flex>
      <Footer/>
    </>
  );
};
