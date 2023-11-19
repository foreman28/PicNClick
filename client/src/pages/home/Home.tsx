import React, {useEffect} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";

import styles from "./Home.module.scss";
import FeedPost from "../../components/feed-post/feed-post";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../paths";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Paths.forum);
  }, []);

  return (
    <>
    </>
  );
};
