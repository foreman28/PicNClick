import React, {useEffect, useState} from "react";
import {Flex, Typography} from "antd";

import {Layout} from "../../components/layout/layout";

import styles from "./Tags.module.scss";

const {Title, Text} = Typography;

export const Tags = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/posts`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error('Ошибка получения данных из API:', error));
  }, []);

  return (
    <Layout>
      <Flex className={styles.main} gap={12} vertical>
        <Title level={1}>Теги</Title>

      </Flex>
    </Layout>
  );
};
