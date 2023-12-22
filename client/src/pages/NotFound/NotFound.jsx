import {useEffect} from 'react';
import {Header} from "../../components/header/header";
import {Layout as AntLayout} from "antd";
import styles from "./NotFound.module.scss";
import {Footer} from "../../components/footer/footer";
import {Layout} from "../../components/layout/layout";

export const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className={styles.main}>
        <h1 className={styles.title}>
          4
          <img
            className={"auth-loading"}
            srcSet={`${process.env.PUBLIC_URL}/logo.svg`}
            width={96}
            height={96}
            alt={'logo'}
          />
          4
        </h1>
        <p className={styles.text}>К сожалению, страница, которую вы ищете, не существует.</p>
      </div>
    </Layout>
  );
};
