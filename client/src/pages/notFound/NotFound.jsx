import React from 'react';
import {Header} from "../../components/header/header";
import {Layout as AntLayout} from "antd";
import styles from "./NotFound.module.scss";
import {Footer} from "../../components/footer/footer";

const NotFound = () => {
  return (
<>
  <Header/>
    <AntLayout.Content className={styles.main}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Sorry, the page you are looking for does not exist.</p>
    </AntLayout.Content>
  <Footer/>
</>
  );
};

export default NotFound;