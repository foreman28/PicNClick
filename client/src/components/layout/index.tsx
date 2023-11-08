import {Layout as AntLayout} from "antd";
import {ReactNode} from "react";

import {Header} from "../header";
import {Footer} from "../footer";

import styles from "./index.module.css";

type Props = {
  children: ReactNode;
}

export const Layout = ({children}: Props) => {
  return (
    <>
      <Header/>
      <AntLayout.Content className={styles.main} style={{height: '100%'}}>
        {children}
      </AntLayout.Content>
      <Footer/>
    </>
  );
};
