import { Flex, List } from "antd";
import { Layout } from "../../components/layout/layout";
import styles from "./Search.module.scss";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import FeedPost from "../../components/feed-post/feed-post";

import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

export const Search = () => {
  // const [searchTerm, setSearchTerm] = useState<string>('');
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
    // setSearchTerm(value);

    const API_URL = process.env.REACT_APP_API_URL;
    const apiUrl = value
      ? `${API_URL}/posts?search=${value}`
      : `${API_URL}/posts`;

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
        <CustomBreadcrumb />
        {/*<Title level={1}>Поиск{searchTerm ? ': ' + searchTerm : ''}</Title>*/}

        <List
          className={styles.list}
          itemLayout="vertical"
          size="large"
          dataSource={suggestions}
          renderItem={(item) => <FeedPost post={item} />}
          locale={{ emptyText: 'Пусто' }}
        />
      </Flex>
    </Layout>
  );
};

