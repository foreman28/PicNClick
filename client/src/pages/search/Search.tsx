import { Flex, List } from "antd";
import { Layout } from "../../components/layout/layout";
import styles from "./Search.module.scss";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import ForumPost from "../../components/forum-post/forum-post";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const queryParams = queryString.parse(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    handleSearch(queryParams.search);
  }, [queryParams.search, navigate]);

  const handleSearch = async (value: any) => {
    setSearchTerm(value);

    const apiUrl = value
      ? `${process.env.REACT_APP_API_URL}/posts?search=${value}`
      : `${process.env.REACT_APP_API_URL}/posts`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
    }
  };

  return (
    <Layout>
      <Flex className={styles.main} vertical gap={"12px"}>
        <h1>Поиск{searchTerm ? ': ' + searchTerm : ''}</h1>

        <List
          className={styles.list}
          itemLayout="vertical"
          size="large"
          dataSource={suggestions}
          renderItem={(item) => <ForumPost post={item} />}
          locale={{ emptyText: 'Пусто' }}
        />
      </Flex>
    </Layout>
  );
};

