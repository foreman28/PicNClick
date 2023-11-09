import {Flex, Layout as AntLayout} from "antd";
import {ReactNode} from "react";

import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {Sidebar} from "../sidebar/sidebar";
import {Sidebar2} from "../sidebar2/sidebar2";

import styles from "./layout.module.css";

type Props = {
  children: ReactNode;
}

export const Layout = ({children}: Props) => {
  return (
    <>
      <Header/>
      <Flex style={{height: '100%'}}>
        <Sidebar/>
        <Flex gap={24} justify={"space-between"} style={{width:'100%', padding:'24px'}}>
          <AntLayout.Content className={styles.main}>
            {children}
          </AntLayout.Content>
          <Sidebar2/>
        </Flex>
      </Flex>
      <Footer/>
    </>
  );
};
