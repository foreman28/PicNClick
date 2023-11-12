import React, {useEffect, useState} from 'react';
import {List} from 'antd';
import styles from './forum-feed.module.scss';
import ForumPost from "../forum-post/forum-post";

const ForumFeed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/api/posts';

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
    <List
      className={styles.list}
      itemLayout="vertical"
      size="large"
      dataSource={data}
      renderItem={(item) =>
        <ForumPost post={item}/>
      }
    />
  );
};

export default ForumFeed;
