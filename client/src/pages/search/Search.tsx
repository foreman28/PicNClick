import { Flex, List } from "antd";
import { Layout } from "../../components/layout/layout";
import styles from "./Search.module.scss";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import PostItem from "../../components/post-item/post-item";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

export const Search = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const queryParams = queryString.parse(window.location.search);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // console.log(queryParams.search)
    handleSearch(queryParams.search);
  }, [queryParams.search, navigate]);
  
  const handleSearch = async (value: any) => {
    const API_URL = process.env.REACT_APP_API_URL;

      // Treat it as a regular text-based search
      const apiUrl = value ? `${API_URL}/posts?search=${value}` : `${API_URL}/posts`;
      
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
        <List
          className={styles.list}
          itemLayout="vertical"
          size="large"
          dataSource={suggestions}
          renderItem={(item) => <PostItem post={item} />}
          locale={{ emptyText: 'Пусто' }}
        />
      </Flex>
    </Layout>
  );
};
