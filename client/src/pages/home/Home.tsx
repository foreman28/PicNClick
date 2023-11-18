import React, {useEffect} from 'react';
import {Flex, List} from "antd";
import {Layout} from "../../components/layout/layout";

import styles from "./Home.module.scss";
import ForumPost from "../../components/forum-post/forum-post";
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
