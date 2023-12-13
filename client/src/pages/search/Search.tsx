import { Flex } from "antd";
import { Layout } from "../../components/layout/layout";
import styles from "./Search.module.scss";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {FeedPosts} from "../../components/feed-posts/feed-posts";

export const Search = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const queryParams = queryString.parse(window.location.search);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    handleSearch(queryParams.q);
  }, [queryParams.q, navigate]);

  const handleSearch = async (value: any) => {
    const API_URL = process.env.REACT_APP_API_URL;

      // Treat it as a regular text-based search
      const apiUrl = value ? `${API_URL}/posts?q=${value}` : `${API_URL}/posts`;
    // console.log(apiUrl)
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSuggestions(data);
        // console.log(data)
      } catch (error) {
        console.error('Error search:', error);
      }
    
  };
  
  return (
    <Layout>
      <Flex className={styles.main} vertical gap={"12px"}>
        <CustomBreadcrumb />
        
        <FeedPosts />
      </Flex>
    </Layout>
  );
};
