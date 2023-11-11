import React, {useEffect, useState} from "react";
import {Layout} from "../../components/layout/layout";
import {useParams} from "react-router-dom";

export const Post = () => {
  const {id} = useParams(); // Получаем значение динамического параметра из URL
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Ошибка получения данных из API:', error);
      }
    };

    fetchPostData();
  }, [id]); // Зависимость от id, чтобы обновить данные при изменении id

  if (!postData) {
    return (
      <Layout>

      </Layout>
    );
  }

  return (
    <Layout>

      <h2>{postData.title}</h2>
      <p>{postData.content}</p>


    </Layout>
  );
};
