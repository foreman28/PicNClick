import {Flex, List} from "antd";
import styles from "./search-main.module.scss";
import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import {useNavigate} from "react-router-dom";
import {postApi} from "../../app/serivices/posts";
import ForumPost from "../forum-post/forum-post";

export const SearchMain = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const queryParams = queryString.parse(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch(queryParams.search);
  }, [queryParams.search, navigate]);

  async function handleSearch(value: any) {
    setSearchTerm(value);

    if (value) {
      // Replace the URL with your actual API endpoint
      const apiUrl = `${process.env.REACT_APP_API_URL}/posts?search=${value}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setSuggestions(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }


  return (
  <List
    className={styles.list}
    itemLayout="vertical"
    size="large"
    dataSource={suggestions}
    renderItem={(item) =>
      <ForumPost post={item}/>
    }
    locale={{emptyText: 'Пусто'}}
  />
  );
};
