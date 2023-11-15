import React, {useEffect, useState} from 'react';
import {Flex, Space, List} from "antd";
import {Layout} from "../../components/layout/layout";

import styles from "./forum.module.css";
import {CustomButton} from "../../components/custom-button/button";
import {button, button2} from "../../themes/buttons";
import ForumPost from "../../components/forum-post/forum-post";

export const Forum = () => {
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
        <Space>
          <CustomButton theme={button} type="primary">
            Добавить
          </CustomButton>
          <CustomButton theme={button} type="primary">
            asd
          </CustomButton>
        </Space>

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
