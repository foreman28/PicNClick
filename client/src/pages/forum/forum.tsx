import React, {useEffect, useState} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";

import styles from "./forum.module.css";
import ForumPost from "../../components/forum-post/forum-post";

export const Forum = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <List
          className={styles.list}
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) =>
            <ForumPost post={item}/>
          }
          locale={{emptyText: 'Пусто'}}
        />
      </Flex>
    </Layout>
  );
};
