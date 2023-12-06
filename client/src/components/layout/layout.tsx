import {Flex, Layout as AntLayout} from "antd";

import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {NavigationBar} from "../navigationBar/navigationBar";
import {Sidebar} from "../sidebar/sidebar";

import styles from "./layout.module.css";

export const Layout = ({children}: any) => {
  return (
    <>
      <Header/>
      <Flex justify={"space-between"} style={{height: '100%'}}>
        <NavigationBar/>

        <AntLayout.Content className={styles.main}>
          {children}
        </AntLayout.Content>

        <Sidebar/>
      </Flex>
      <Footer/>
    </>
  );
};
