import React, {useEffect, useState} from "react";
import {Flex} from "antd";

import {Layout} from "../../components/layout/layout";

import styles from "./tags.module.scss";

export const Tags = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/posts`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error('Ошибка получения данных из API:', error));
  }, []);

  return (
    <Layout>
      <Flex className={styles.main} vertical gap={"12px"}>
        <h1>Tags</h1>

      </Flex>
    </Layout>
  );
};
